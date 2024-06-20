"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = void 0;
const model_structures_1 = require("../model-structures");
class UserSession extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'usersessions';
    }
}
exports.UserSession = UserSession;
