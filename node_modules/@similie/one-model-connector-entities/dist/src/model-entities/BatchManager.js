"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchManager = void 0;
const model_structures_1 = require("../model-structures");
class BatchManager extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'batchmanagers';
    }
}
exports.BatchManager = BatchManager;
