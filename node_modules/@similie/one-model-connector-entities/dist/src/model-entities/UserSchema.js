"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const model_structures_1 = require("../model-structures");
class UserSchema extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'userschemas';
    }
}
exports.UserSchema = UserSchema;
