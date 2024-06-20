"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccess = void 0;
const model_structures_1 = require("../model-structures");
class UserAccess extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'useraccesses';
    }
}
exports.UserAccess = UserAccess;
