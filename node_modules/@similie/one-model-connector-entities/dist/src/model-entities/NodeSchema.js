"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeSchema = void 0;
const model_structures_1 = require("../model-structures");
class NodeSchema extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'nodeschemas';
    }
}
exports.NodeSchema = NodeSchema;
