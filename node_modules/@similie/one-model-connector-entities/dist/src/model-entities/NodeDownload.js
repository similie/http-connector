"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDownload = void 0;
const model_structures_1 = require("../model-structures");
class NodeDownload extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'nodedownloads';
    }
}
exports.NodeDownload = NodeDownload;
