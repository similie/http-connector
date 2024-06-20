"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const model_structures_1 = require("../model-structures");
class Organization extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'organizations';
    }
}
exports.Organization = Organization;
