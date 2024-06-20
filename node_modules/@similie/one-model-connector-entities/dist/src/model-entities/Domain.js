"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = void 0;
const model_structures_1 = require("../model-structures");
class Domain extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'domains';
    }
}
exports.Domain = Domain;
