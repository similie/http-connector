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
exports.LiveConnection = exports.LiveConnectConfig = void 0;
const global_connect_1 = require("../global-connect");
const utils_1 = require("../utils");
class LiveConnectConfig {
    constructor() {
        this._name = '';
    }
    get modelname() {
        return this._name;
    }
    set modelname(modelname) {
        this._name = modelname;
    }
}
exports.LiveConnectConfig = LiveConnectConfig;
/**
 * @class
 * @name LiveConnection
 *
 * @description The purpose of live connect is so that a single class
 * can manage the start instance. Also, the child classes can safely
 * choose to NOT implement certain functions such as init or teardown
 * if they are not required. Additionally, for future functionality
 * we can use this class to implement parent logic that all the child classes
 * can extend without changing the structure of the child class. Finally,
 * to create a new connector, you simply copy this class and populate the
 * public functions with the desired logic
 */
class LiveConnection {
    constructor(global) {
        if (global === global_connect_1.GlobalConnection.SET_GLOBAL) {
            global_connect_1.GlobalConnection.startInstance(this);
        }
    }
    getId(query) {
        return (0, utils_1.getId)(query);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    get modelConfig() {
        return new LiveConnectConfig();
    }
    raw(config) {
        !!config;
        throw new Error('NOT IMPLEMENTED');
    }
    find(query, limiters, config) {
        !{ query, limiters, config };
        throw new Error('NOT IMPLEMENTED');
        return null;
    }
    findOne(query, limiters, config) {
        !{ query, limiters, config };
        throw new Error('NOT IMPLEMENTED');
        return null;
    }
    save(values, config) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ values, config };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    update(query, update, config) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ query, update, config };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    count(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ query, config };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    destroy(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ query, config };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    create(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ query, config };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    createMany(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ query, config };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    destroyAll(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ query, config };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    addToCollection(value, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ value, collection };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    removeFromCollection(value, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            !{ value, collection };
            throw new Error('NOT IMPLEMENTED');
            return null;
        });
    }
    attr(config) {
        !!config;
        throw new Error('NOT IMPLEMENTED');
        return null;
    }
    keys(config) {
        !config;
        throw new Error('NOT IMPLEMENTED');
        return new Array();
    }
    sum(numericAttrName, criteria, config) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('NOT IMPLEMENTED');
            return { numericAttrName, criteria, config };
        });
    }
    avg(numericAttrName, criteria, config) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('NOT IMPLEMENTED');
            return { numericAttrName, criteria, config };
        });
    }
    findOrCreate(criteria, initialsValues, config) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('NOT IMPLEMENTED');
            return { initialsValues, criteria, config };
        });
    }
    streamEach(query, limiters, config, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('NOT IMPLEMENTED');
            return { query, limiters, config, cb };
        });
    }
    streamBatch(query, limiters, config, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('NOT IMPLEMENTED');
            return { query, limiters, config, cb };
        });
    }
    tearDown() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('NOT IMPLEMENTED');
        });
    }
    query(query, valuesToEscape, config) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('NOT IMPLEMENTED');
            return { query, valuesToEscape, config };
        });
    }
}
exports.LiveConnection = LiveConnection;
