"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const model_structures_1 = require("../model-structures");
class Role extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'roles';
    }
}
exports.Role = Role;
