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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ModelCollection__identity, _ModelCollection__connector;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelInstanceIdentity = exports.ModelInstance = exports.ModelCollection = exports.CollectionIdentifier = void 0;
const utils_1 = require("../utils");
/**
 * @class
 * @name CollectionIdentifier
 * @description provides the configuration details
 *  required by the connector to run the collection-based
 *  functions
 * @param {string} name
 * @param {string} collection
 * @param {T | number} instance
 * @param {string} model
 */
class CollectionIdentifier {
    constructor(name, collection, instance, model) {
        this._name = name;
        this._collection = collection;
        this._instance = (0, utils_1.getId)(instance) || -1;
        this._model = model;
    }
    get model() {
        return this._model;
    }
    get name() {
        return this._name;
    }
    get collection() {
        return this._collection;
    }
    get instance() {
        return this._instance;
    }
}
exports.CollectionIdentifier = CollectionIdentifier;
/**
 * @class
 * @name ModelCollection
 * @extends Array
 * @description Allows us to apply functionality to collection
 *  attributes that behave as arrays
 * @param {CollectionIdentifier<T>} identity
 * @param {LiveConnectionConstruct} connector
 */
class ModelCollection extends Array {
    constructor(identity, connector) {
        super();
        // [AS] hides properties from console.log
        _ModelCollection__identity.set(this, void 0);
        _ModelCollection__connector.set(this, void 0);
        __classPrivateFieldSet(this, _ModelCollection__identity, identity, "f");
        __classPrivateFieldSet(this, _ModelCollection__connector, connector, "f");
    }
    get model() {
        return __classPrivateFieldGet(this, _ModelCollection__identity, "f").model;
    }
    get name() {
        return __classPrivateFieldGet(this, _ModelCollection__identity, "f").name;
    }
    get collection() {
        return __classPrivateFieldGet(this, _ModelCollection__identity, "f").collection;
    }
    get instance() {
        return __classPrivateFieldGet(this, _ModelCollection__identity, "f").instance;
    }
    /**
     * @public
     * @name addToCollection
     * @description adds and entity or id to a collection. It's function is
     *   controlled by the connector
     * @param {number | IEntity} value
     * @returns {Promise<void>}
     */
    addToCollection(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _ModelCollection__connector, "f").addToCollection(value, this);
        });
    }
    /**
     * @public
     * @name removeFromCollection
     * @description removes and entity or id to a collection. It's function is
     *   controlled by the connector
     * @param {number | IEntity} value
     * @returns {Promise<void>}
     */
    removeFromCollection(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _ModelCollection__connector, "f").removeFromCollection(value, this);
        });
    }
}
exports.ModelCollection = ModelCollection;
_ModelCollection__identity = new WeakMap(), _ModelCollection__connector = new WeakMap();
/**
 * @class
 * @name ModelInstance
 * @description when we get a raw model from the there is
 *  a specfic functionality we want to apply to these models.
 *  the most obvious use case is the operations on collection
 *  attributes. We can also are stringified JSON and any
 *  additional operations required by the application
 * @param {LiveConnectionConstruct} connector
 * @param {IModelConfigurationDetails} modelConfig
 */
class ModelInstance {
    // we instantiate with the LiveConnection and
    // the configuration details
    constructor(connector, modelConfig) {
        this.types = {
            collection: 'collection',
            json: 'json',
        };
        this.connector = connector;
        this._modelConfig = modelConfig;
    }
    get modelConfig() {
        return this._modelConfig;
    }
    /**
     * @public
     * @name attrs
     * @description retrieves the attributes for that model
     *    from the connector
     * @returns {Record<string, IModelAttributes>}
     */
    attrs() {
        return this.connector.attr(this.modelConfig);
    }
    /**
     * @public
     * @description retrieves the list of keys for a given model
     * @returns {string[]}
     */
    getKeys() {
        return this.connector.keys(this.modelConfig);
    }
    /**
     * @public
     * @name applyOne
     * @param {IEntity} model - the raw model
     * @returns {Promise<ModelInstanceIdentity<IEntity>>}
     */
    applyOne(model) {
        return this.applyRegistration(model);
    }
    /**
     * @public
     * @name applyMany
     * @param {IEntity[]} models - the raw models
     * @returns {Promise<ModelInstanceIdentity<IEntity[]>>}
     */
    applyMany(models) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < models.length; i++) {
                const model = models[i];
                if (!model) {
                    continue;
                }
                yield this.applyOne(model);
            }
            return models;
        });
    }
    /**
     * @private
     * @name isType
     * @description Checks the type param to see if we have
     *   a specific type
     * @param {IModelAttributes} attr the param getting checked
     * @param {string} type
     * @returns {boolean} true if type matches
     */
    isType(attr = {}, type) {
        return attr.type === type;
    }
    /**
     * @private
     * @name containsKey
     * @description we are searching for a specific key value in the
     *   attribute
     * @param {IModelAttributes | string} attr
     * @param {string} key
     * @returns {boolean} true if it contains the second key param
     */
    containsKey(attr, key) {
        // sometimes in waterline, 0.1x you can define an attribute as "param": 'string'
        if (typeof attr === 'string') {
            return attr === key;
        }
        // default to false
        const hasNot = false;
        const keys = Object.keys(attr);
        for (let i = 0; i < keys.length; i++) {
            const _key = keys[i];
            if (_key === key) {
                // we have a true, just return
                return true;
            }
        }
        return hasNot;
    }
    /**
     * @private
     * @name buildCollection
     * @description builds those paramters that are defined as a collection
     *   with the Model collection object
     * @param {IEntity} model
     * @param {string} key
     * @param {IModelAttributes} attr
     * @returns {void}
     */
    buildCollection(model, key, attr) {
        const _k = key;
        const value = model[_k];
        const arr = value || new Array();
        const clone = [...arr];
        const modelName = this.modelConfig.modelname || '';
        const identity = new CollectionIdentifier(key, attr.collection || '', model, modelName);
        const c = new ModelCollection(identity, this.connector);
        c.push(...clone);
        // set the model with the new collection
        model[_k] = c;
    }
    /**
     * @private
     * @name isValidJson
     * @description checks to see of a json specific model is valid JSON
     * @param {any} model
     * @returns {boolean} - if the json is valid
     */
    isValidJson(model) {
        return !model || model instanceof Array || model instanceof Object;
    }
    /**
     * @private
     * @name startsAndEndsWith
     * @description we want to see if a string looks like json. It should either
     *   start and end with {} or [].
     * @param  {string} value the values to check
     * @param {string} chars comma delineated start and end characters, length 3
     * @returns {boolean} - if the string is valid
     */
    startsAndEndsWith(value, chars) {
        const split = chars.split(',');
        return value.startsWith(split[0] || '') && value.endsWith(split[1] || '');
    }
    /**
     * @private
     * @name isStringJson
     * @description is our JSON a string?
     * @param {any} model we are trying to see if the value is a string
     * @returns {boolean} - true if it is a stringified json object
     */
    isStringJson(model) {
        return (typeof model === 'string' &&
            (this.startsAndEndsWith(model, '[,]') ||
                this.startsAndEndsWith(model, '{,}')));
    }
    /**
     * @private
     * @name parseJSONString
     * @description simply parses a JSON string
     * @param {string} json - string value but any to make
     *   the interpreter happy
     * @returns {object}
     */
    parseJSONString(json) {
        return JSON.parse(json);
    }
    /**
     * @private
     * @name ensureIsValidJSON
     * @description we want to make sure our params designated as JSON
     *   or array are not stringified
     * @param {IEntity} model
     * @param {string} key the key of the parameter
     * @returns {void}
     */
    ensureIsValidJSON(model, key) {
        const _k = key;
        const value = model[_k];
        if (this.isValidJson(value)) {
            return;
        }
        if (!this.isStringJson(value)) {
            return;
        }
        model[_k] = this.parseJSONString(value);
    }
    /**
     * @private
     * @name applyRegistration
     * @description iterates through all the param values and checks to
     *   make sure they are in the correct form from the database. Additionally,
     *   we can add decorators to specific params such as collections.
     * @param {IEntity} model
     * @returns {ModelInstanceIdentity<T>}
     */
    applyRegistration(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!model) {
                return null;
            }
            const attrs = yield this.attrs();
            for (const k in attrs) {
                const attr = attrs[k];
                if (!attr) {
                    continue;
                }
                if (this.containsKey(attr, this.types.collection)) {
                    this.buildCollection(model, k, attr);
                }
                else if (this.isType(attr, this.types.json)) {
                    this.ensureIsValidJSON(model, k);
                }
            }
            // we simply instantiate this incase we want to
            // add functionality to the base model. For now
            // we just copy the values.
            return new ModelInstanceIdentity(model);
        });
    }
}
exports.ModelInstance = ModelInstance;
/**
 * @class
 * @name ModelInstanceIdentity
 * @description a class to wrap a bare model entity.
 *   for now it acts like a noop wrapper.
 */
class ModelInstanceIdentity {
    constructor(model) {
        Object.assign(this, model);
    }
}
exports.ModelInstanceIdentity = ModelInstanceIdentity;
