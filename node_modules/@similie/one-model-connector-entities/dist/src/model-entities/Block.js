"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const model_structures_1 = require("../model-structures");
class Block extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'blocks';
    }
}
exports.Block = Block;
