"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalConnection = void 0;
class GlobalConnection {
    constructor(Connector) {
        this.connection = Connector;
    }
    static startInstance(Connector) {
        if (!GlobalConnection.instance) {
            GlobalConnection.instance = new GlobalConnection(Connector);
        }
        return GlobalConnection.instance;
    }
    static hasConnection() {
        return !!GlobalConnection.instance;
    }
    static getInstance() {
        if (!GlobalConnection.instance) {
            throw new Error("A connection has not been initialized");
        }
        return GlobalConnection.instance;
    }
    get connector() {
        return this.connection;
    }
}
exports.GlobalConnection = GlobalConnection;
GlobalConnection.SET_GLOBAL = true;
GlobalConnection.SET_LOCAL = false;
