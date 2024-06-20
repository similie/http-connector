"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeSerial = void 0;
const model_structures_1 = require("../model-structures");
class NodeSerial extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'nodeserials';
    }
}
exports.NodeSerial = NodeSerial;
