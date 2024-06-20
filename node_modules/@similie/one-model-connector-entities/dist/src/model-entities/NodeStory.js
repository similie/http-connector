"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeStory = void 0;
const model_structures_1 = require("../model-structures");
class NodeStory extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'nodestories';
    }
}
exports.NodeStory = NodeStory;
