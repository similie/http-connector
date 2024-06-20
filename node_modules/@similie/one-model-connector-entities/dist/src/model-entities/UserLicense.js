"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLicense = void 0;
const model_structures_1 = require("../model-structures");
class UserLicense extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'userlicenses';
    }
}
exports.UserLicense = UserLicense;
