"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPConnector = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const model_connect_entities_1 = require("@similie/model-connect-entities");
const _1 = require(".");
/**
 * @class
 * @name HTTPConnector
 * @description this class sets up and talks to the http adapter to
 *  talk the backend api
 * @param {string} apiVersion
 * @param {string} url
 * @param {boolean} global
 * @param {boolean} cors
 */
class HTTPConnector extends model_connect_entities_1.LiveConnection {
    constructor(_url = "", global = true, _cors = true) {
        super(global);
        this._url = _url;
        this._cors = _cors;
        this.CorsHeader = {
            // mode: 'cors',
            headers: {
                //   'Access-Control-Allow-Origin': '*',
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        this._userContent = {};
        this.httpConnection = new _1.HttpConnection(this._cors);
    }
    /**
     * @name getApiRoute
     * @description returns the api route based on the model
     *   config
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {string}
     */
    getApiRoute(modelConfig) {
        if (!modelConfig) {
            throw new Error("Model configuration details are required");
        }
        return `${this._url}${modelConfig.modelname}/`;
    }
    /**
     * @name stringAndEncodeObject
     * @description breaks
     * @param {any} values
     * @returns {string}
     */
    stringAndEncodeObject(values) {
        if (!Object.keys(values).length) {
            return "";
        }
        const stringValue = JSON.stringify(values);
        return encodeURIComponent(stringValue);
    }
    /**
     * @name populateAll
     * @description checks to see if we have a populate
     *   all request
     * @param {populateAll} limiters
     * @returns {boolean}
     */
    populateAll(limiters) {
        return (typeof limiters.populate === "string" &&
            limiters.populate === model_connect_entities_1.ALL_POPULANTS);
    }
    /**
     * @name buildPopulants
     * @description sets a populate query object
     *  into an array of strings
     * @param {IQueryLimiters} limiters
     * @returns {string[]}
     */
    buildPopulants(limiters) {
        if (this.populateAll(limiters)) {
            return ["*"];
        }
        return Object.keys(limiters.populate || []);
    }
    /**
     * @name queryValues
     * @description takes a query object and convert it to a query string
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @returns {string}
     */
    queryValues(query = {}, limiters) {
        const queryString = [];
        if (Object.keys(query).length) {
            queryString.push(`where=${this.stringAndEncodeObject(query)}`);
        }
        if (limiters.limit) {
            queryString.push(`limit=${limiters.limit}`);
        }
        if (limiters.skip) {
            queryString.push(`skip=${limiters.skip}`);
        }
        if (limiters.sort && Object.keys(limiters.sort).length) {
            queryString.push(`sort=${this.stringAndEncodeObject(limiters.sort)}`);
        }
        if (limiters.populate) {
            queryString.push(`populate=${this.stringAndEncodeObject(this.buildPopulants(limiters))}`);
        }
        if (!queryString.length) {
            return "";
        }
        return "?" + queryString.join("&"); // this.encodeQueryURI(queryString.join('&'));
    }
    /**
     * @private
     * @name appendQueryToUrl
     * @description appends the query to the url
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @param {string} url
     * @param {HttpMethod} method
     * @returns {string}
     */
    appendQueryToUrl(query, limiters, url, method) {
        if (method !== _1.HttpMethod.GET) {
            return url;
        }
        const queryString = this.queryValues(query, limiters);
        return url + queryString;
    }
    /**
     * @get
     * @name localHeaders
     * @returns {RequestInit.headers}
     */
    get localHeaders() {
        return Object.assign(this.CorsHeader.headers, this.userContent);
    }
    /**
     * @private
     * @name appendCorsToConfig
     * @description allows us to append the cors header to the
     *   request config
     * @param {RequestInit} config
     * @returns {RequestInit}
     */
    appendCorsToConfig(config = {}) {
        if (!this._cors) {
            return config;
        }
        const configHeaders = config.headers || {};
        return Object.assign(Object.assign({}, config), { mode: this.CorsHeader.mode, headers: Object.assign(configHeaders, this.localHeaders) });
    }
    /**
     * @name setQueryData
     * @description Applies headers and any query details to the request
     * @param {any} query
     * @param {HttpMethod} method
     * @returns {RequestInit}
     */
    setQueryData(query, method) {
        if (method === _1.HttpMethod.GET) {
            return this.appendCorsToConfig({});
        }
        return this.appendCorsToConfig({
            body: JSON.stringify(query),
            method: method,
        });
    }
    /**
     * @name getRequestResults
     * @description wrapper around the httpConnection
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @param {string} url
     * @param {HttpMethod} method
     * @returns {Promise<Response>}
     */
    getRequestResults(query, limiters, url, method) {
        return this.httpConnection.send(this.appendQueryToUrl(query, limiters, url, method), this.setQueryData(query, method));
    }
    /**
     * @name buildStreamQuery
     * @descriptions builds a streaming query
     * @param  {any} query
     * @param {IQueryLimiters} limiters
     * @param {string} url
     * @param {HttpMethod} method
     * @param {function(string):Promise<void>} cb
     * @returns {Promise<{number;string;}>}
     */
    buildStreamQuery(query, limiters, url, method, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.getRequestResults(query, limiters, url, method);
            return this.httpConnection.fetchStreamData(results, cb);
        });
    }
    /**
     * @name buildQuery
     * @description builds an HTTP query and processes the results
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @param {string} url
     * @param {HttpMethod} method
     * @returns {Promise<any>}
     */
    buildQuery(query, limiters, url, method) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.getRequestResults(query, limiters, url, method);
            if (!results.ok) {
                console.error("HTTP Response error", results.status, results.statusText);
                throw new Error(results.statusText);
            }
            if (results.statusText === "No Content") {
                return null;
            }
            try {
                return results.json();
            }
            catch (_a) {
                return results.text();
            }
        });
    }
    ////////////
    // Public //
    ////////////
    // noop
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // do nothing
        });
    }
    // noop
    keys() {
        return [];
    }
    // noop
    tearDown() {
        return __awaiter(this, void 0, void 0, function* () {
            // do nothing
        });
    }
    /**
     * @get
     * @description pulls the details of the active
     * user from session cookies or by setting
     * the content externally
     * @name userContent
     * @returns {Record<string, string>}
     */
    get userContent() {
        if (!Object.keys(this._userContent).length) {
            const authToken = (0, _1.pullCookieValueInBrowser)(_1.AUTHENTICATION_TOKEN_COOKIE);
            authToken &&
                Object.assign(this._userContent, {
                    authentication: `Bearer ${authToken}`,
                });
        }
        return this._userContent || {};
    }
    /**
     * @set
     * @name userContent
     * @param {Record<string, string>} userContent
     */
    set userContent(userContent) {
        this._userContent = userContent;
    }
    /**
     * @public
     * @name raw
     * @description gets the raw namespaced model
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {IRawHttpQuery}
     */
    raw(modelConfig) {
        const url = this.getApiRoute(modelConfig);
        return {
            url,
            http: this.httpConnection,
        };
    }
    /**
     * @name findOne
     * @description finds a single record
     * @param {any} query
     * @param {IQueryLimiters} limiters {IQueryLimiters}
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    findOne(query, limiters, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasId = query.id && !Array.isArray(query.id) && Object.keys(query).length === 1;
            const sendQuery = Object.assign({}, query);
            if (hasId) {
                delete sendQuery.id;
            }
            const url = this.getApiRoute(modelConfig) + (hasId ? query.id : "");
            const results = yield this.buildQuery(sendQuery, limiters, url, _1.HttpMethod.GET);
            return Array.isArray(results) ? results[0] : results;
        });
    }
    /**
     * @public
     * @name find
     * @description sends back an a queried collection
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity[]>}
     */
    find(query, limiters, modelConfig) {
        const url = this.getApiRoute(modelConfig);
        return this.buildQuery(query, limiters, url, _1.HttpMethod.GET);
    }
    /**
     * @public
     * @name save
     * @description saves a single record
     * @param {any} values
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    save(values, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getId(values);
            if (!id) {
                throw new Error(`A saved model must contain and ID form this ${modelConfig === null || modelConfig === void 0 ? void 0 : modelConfig.modelname}`);
            }
            const url = this.getApiRoute(modelConfig) + id;
            return this.buildQuery(values, {}, url, _1.HttpMethod.PUT);
        });
    }
    /**
     * @public
     * @name update
     * @description updates one or more records based on query
     * @param {any} query
     * @param {any} update
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity[]>}
     */
    update(query, update, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig);
            return this.buildQuery({
                query,
                update,
            }, {}, url, _1.HttpMethod.PUT);
        });
    }
    /**
     * @public
     * @name count
     * @description model count for given query
     * @param {any} query
     * @param  {IModelConfigurationDetails} modelConfig
     * @returns {Promise<number>}
     */
    count(query, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig) + "count";
            return this.buildQuery(query, {}, url, _1.HttpMethod.GET);
        });
    }
    /**
     * @public
     * @name destroy
     * @description destroys a single record
     * @param  {number | IEntity} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    destroy(query, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getId(query);
            if (!id) {
                throw new Error(`A saved model must contain and ID form this ${modelConfig.modelname}`);
            }
            const url = this.getApiRoute(modelConfig) + id;
            return this.buildQuery({}, {}, url, _1.HttpMethod.DELETE);
        });
    }
    /**
     * @public
     * @name create
     * @description creates a single record
     * @param {Partial<IEntity>} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    create(query, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig);
            return this.buildQuery(query, {}, url, _1.HttpMethod.POST);
        });
    }
    /**
     * @public
     * @name createMany
     * @description creates a collection of records
     * @param {Partial<IEntity>[]} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity[]>}
     */
    createMany(query, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig);
            return this.buildQuery(query, {}, url, _1.HttpMethod.POST);
        });
    }
    /**
     * @public
     * @name destroyAll
     * @description destroys a collection of records
     * @param {IQueryBaseType} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity[]>}
     */
    destroyAll(query, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig);
            return this.buildQuery(query, {}, url, _1.HttpMethod.DELETE);
        });
    }
    /**
     * @public
     * @name add
     * @description adds a record to a collection
     * @param {any} value
     * @param {IModelConfigurationDetails} collection
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<void>}
     */
    addToCollection(value, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelConfig = {
                modelname: collection.model,
            };
            const url = this.getApiRoute(modelConfig) +
                `${collection.instance}/${collection.name}/${this.getId(value)}`;
            return this.buildQuery({}, {}, url, _1.HttpMethod.PUT);
        });
    }
    /**
     * @public
     * @name remove
     * @description removes a record to a collection
     * @param {any} value
     * @param {LiveConnectConfig} collection
     * @returns {Promise<void>}
     */
    removeFromCollection(value, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelConfig = {
                modelname: collection.model,
            };
            const url = this.getApiRoute(modelConfig) +
                `${collection.instance}/${collection.name}/${this.getId(value)}`;
            return this.buildQuery({}, {}, url, _1.HttpMethod.DELETE);
        });
    }
    /**
     * @public
     * @name attr
     * @description pulls the attributes for the model
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<Record<string, IModelAttributes>>}
     */
    attr(modelConfig) {
        const url = this.getApiRoute(modelConfig) + "schema";
        return this.buildQuery({}, {}, url, _1.HttpMethod.GET);
    }
    /**
     * @public
     * @name sum
     * @description gets the average for numeric attributes
     *    assigned to a model
     * @param {Partial<IEntity>} numericAttrName keyof IEntity
     * @param {IQueryOrPartial<IEntity>} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<ISumType>}
     */
    sum(numericAttrName, query, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig) + `sum/${numericAttrName}`;
            return this.buildQuery(query, {}, url, _1.HttpMethod.GET);
        });
    }
    /**
     * @public
     * @name avg
     * @description gets the average for numeric attributes
     *    assigned to a model
     * @param {Partial<IEntity>} numericAttrName keyof IEntity
     * @param {IQueryOrPartial<IEntity>} query  search query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IAvgType>}
     */
    avg(numericAttrName, query, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig) + `avg/${numericAttrName}`;
            return this.buildQuery(query, {}, url, _1.HttpMethod.GET);
        });
    }
    /**
     * @public
     * @name streamBatch
     * @description streams the data as a batch. It takes the limiters option
     *    along with an eachBatch callback that chuncks the data into a stream
     * @param  {IEntity} query
     * @param {IQueryLimiters} limiters
     * @param {IModelConfigurationDetails} modelConfig
     * @param {function(model: IEntity):void | Promise<void>} cb
     * @returns {Promise<any>}
     */
    streamBatch(query, limiters, modelConfig, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig) + "stream-batch/" + limiters.batchNumber;
            return yield this.buildStreamQuery(query, limiters, url, _1.HttpMethod.GET, (chunk) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const values = JSON.parse(chunk);
                    yield cb(values);
                }
                catch (_a) {
                    //
                }
            }));
        });
    }
    /**
     * @public
     * @name streamEach
     * @description streams the data as a single record.
     *   It takes the limiters option along with an eachRecord
     *   callback that chuncks the data into a stream
     * @param {IEntity} query
     * @param {IQueryLimiters} limiters
     * @param {IModelConfigurationDetails} modelConfig
     * @param {function(model: IEntity):void | Promise<void>} cb
     * @returns {Promise<any>}
     */
    streamEach(query, limiters, modelConfig, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig) + "stream";
            return yield this.buildStreamQuery(query, limiters, url, _1.HttpMethod.GET, (chunk) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const value = JSON.parse(chunk);
                    yield cb(value);
                }
                catch (_a) {
                    //
                }
            }));
        });
    }
    /**
     * @public
     * @name findOrCreate
     * @description searches for a record with a given criteria or creates a record
     *    should the search fail
     * @param {Partial<IEntity>} criteria
     * @param {Partial<IEntity>} initialValues
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    findOrCreate(criteria, initialValues, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getApiRoute(modelConfig) + "seek";
            return this.buildQuery({
                criteria,
                initialValues,
            }, {}, url, _1.HttpMethod.POST);
        });
    }
    /**
     * @public
     * @name query
     * @description does a raw query to waterline. Waterline does not have
     * @param  {string} paramURL
     * @param {IValuesToEscape} valuesToEscape
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {any} - the queried data
     */
    query(paramURL, valuesToEscape, modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = modelConfig
                ? this.getApiRoute(modelConfig) + paramURL
                : paramURL;
            const [payload, method] = valuesToEscape || [];
            const sendPayload = payload || {};
            const sendMethod = method || _1.HttpMethod.GET;
            const query = sendMethod === _1.HttpMethod.GET ? sendPayload : sendPayload;
            return this.buildQuery(sendPayload, query, url, sendMethod);
        });
    }
}
exports.HTTPConnector = HTTPConnector;
