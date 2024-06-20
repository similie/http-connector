"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const model_structures_1 = require("../model-structures");
class User extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'users';
    }
}
exports.User = User;
