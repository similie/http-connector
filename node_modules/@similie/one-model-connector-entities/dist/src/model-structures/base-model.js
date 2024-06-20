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
exports.Model = void 0;
const _1 = require(".");
const _2 = require(".");
const global_connect_1 = require("../global-connect");
const utils_1 = require("../utils");
/**
 * @class
 * @name Model
 * @description working base class for connector communication
 * @param {LiveConnectionConstruct?} connector
 */
class Model {
    constructor(connector) {
        // we can take a connector from the constructor
        if (connector) {
            this._connector = connector;
        }
        else if (global_connect_1.GlobalConnection.hasConnection()) {
            // for if it is statically defined
            const globalConfig = global_connect_1.GlobalConnection.getInstance();
            this._connector = globalConfig.connector;
        }
        else {
            throw new Error('A valid connection is required to instantiate this model');
        }
        // [AS] we are only defining the modelname currently for the configuration
        // we can also apply other attributes for future functionality
        this._modelConfig = this._connector.modelConfig;
        // [AS] this will build the model with the specific entity
        this._modelInstance = new _2.ModelInstance(this.connector, this.modelConfig);
    }
    // getters
    get modelInstance() {
        return this._modelInstance;
    }
    get connector() {
        return this._connector;
    }
    get modelConfig() {
        return this._modelConfig;
    }
    get modelname() {
        return this.modelConfig.modelname;
    }
    // setters
    set modelname(modelname) {
        this.modelConfig.modelname = modelname;
    }
    set modelConfig(modelConfig) {
        this._modelConfig = modelConfig;
    }
    /**
     * @name raw
     * @description used for raw access to the ORM namedspaced
     *    by the registry
     * @returns {LiveConnectionConstruct} a raw instance of the connector model
     */
    raw() {
        var _a;
        return (_a = this.connector) === null || _a === void 0 ? void 0 : _a.raw(this.modelConfig);
    }
    /**
     * @name getId
     * @description tries to pull an id param from the payload
     * @param {number | IEntity | undefined | null} query
     * @returns {number | null}
     */
    getId(query) {
        return (0, utils_1.getId)(query);
    }
    /**
     * @name initWithId
     * @description starts a query for a model entity
     * @param {number} id
     * @returns {QyeryPopulantDecorators<IEntity>}
     */
    initWithId(id) {
        const decorator = new _1.QueryDecorators(this, { id: id });
        return new _1.QueryPopulantDecorators(decorator);
    }
    /**
     * @name find
     * @description starts a search query with chainable functions
     * @param {IQueryOrPartial<T>} query
     * @returns {QueryDecorators<IEntity>}
     */
    find(query) {
        return new _1.QueryDecorators(this, query);
    }
    /**
     * @name save
     * @description saves a single record
     * @param {IEntity} values
     * @returns {Promise<IEntity>} saved values
     */
    save(values) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.save(values, this.modelConfig));
            return this.modelInstance.applyOne(updated);
        });
    }
    /**
     * @name update
     * @description updates multiple records
     * @param {IQueryOrPartial<T>} query
     * @param {IEntityPartial<T>} update values to saved to entity
     * @returns {Promise<IEntity[]>} saved records
     */
    update(query, update) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const updated = (yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.update(query, update, this.modelConfig)));
            return this.modelInstance.applyMany(updated);
        });
    }
    /**
     * @name count
     * @description counts the number of elements based in a given query
     * @param {IQueryOrPartial<T>} query parameters to count
     * @returns {Promise<number>}
     */
    count(query) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.count(query, this.modelConfig));
        });
    }
    /**
     * @name destroy
     * @description destroys a single record
     * @param {IEntity} value
     * @returns {Promise<IEntity>} deleted record if avaible
     */
    destroy(value) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // [AS] I don't bother sending through the model instance
            // param since it is destroyed now
            return yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.destroy(value, this.modelConfig));
        });
    }
    /**
     * @name destroyAll
     * @description destroys multiple records depending one query
     * @param {IQueryOrPartial<T>} query
     * @returns {Promise<IEntity[]>} destroyed records
     */
    destroyAll(query) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.destroyAll(query, this.modelConfig));
        });
    }
    /**
     * @name create
     * @description creates a new model
     * @param { IEntityPartial<T>} query any the values to be created
     * @returns {Promise<IEntity>} newly created model
     */
    create(query) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.create(query, this.modelConfig));
            return this.modelInstance.applyOne(created);
        });
    }
    /**
     * @name createMany
     * @description creates a lot of records of a givin type
     * @param {IEntityPartial<T>[]} query
     * @returns {Promise<IEntity[]>} newly created models
     */
    createMany(query) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const created = (yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.createMany(query, this.modelConfig)));
            return this.modelInstance.applyMany(created);
        });
    }
    /**
     * @public
     * @name findOrCreate
     * @description finds a model based on the given criteria. The model criteria does
     *   not exist in the database, it creates a model with the initials values
     * @param {IQueryOrPartial<IEntity>} criteria
     * @param {IEntityPartial<IEntity>} initialValues
     * @returns {Promise<IEntity>}
     */
    findOrCreate(criteria, initialValues) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const foundOrCreated = (yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.findOrCreate(criteria, initialValues, this.modelConfig)));
            return this.modelInstance.applyOne(foundOrCreated);
        });
    }
    /**
     * @public
     * @name avg
     * @description gets the average for a numeric parameter
     * @param {keyofT} numericAttrName
     * @param {IQueryOrPartial<T>?} criteria
     * @returns {Promise<number>}
     */
    avg(numericAttrName, criteria) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.connector) === null || _a === void 0 ? void 0 : _a.avg(numericAttrName, criteria, this.modelConfig);
        });
    }
    /**
     * @public
     * @name sum
     * @param {keyofT} numericAttrName
     * @param {IQueryOrPartial<T>?} criteria
     * @description gets the sum for a numeric parameter
     * @returns {Promise<ISumType>}
     */
    sum(numericAttrName, criteria) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.connector) === null || _a === void 0 ? void 0 : _a.sum(numericAttrName, criteria, this.modelConfig);
        });
    }
    /**
     * @public
     * @name stream
     * @description streams records from the database instream of buffering
     *   all records. This is good for API calls with massive datasets
     * @param {any} query
     * @returns {QueryStreamDecorators<IEntity>}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stream(query) {
        return new _1.QueryStreamDecorators(this, query);
    }
    /**
     * @public
     * @name toJson
     * @description allows for an object override to occur. The default
     *  bechavior will simply return the model. However, it can be overriden
     *  in the individual model entities. Useful for sending data over the api
     * @param {IEntity} model {IEntity}
     * @returns {any}
     */
    toJson(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return model;
        });
    }
    /**
     * @public
     * @name query
     * @description generates a row sql query to the connector
     * @param {string} query
     * @param {IValuesToEscape} valuesToEscape
     * @returns {any} the queried results
     */
    query(query, valuesToEscape) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.connector) === null || _a === void 0 ? void 0 : _a.query(query, valuesToEscape, this.modelConfig);
        });
    }
    /**
     * @public
     * @name attr
     * @description pulls the attribute values from the model
     * @returns {Record<string, string>}
     */
    attr() {
        var _a;
        return (_a = this.connector) === null || _a === void 0 ? void 0 : _a.attr(this.modelConfig);
    }
}
exports.Model = Model;
