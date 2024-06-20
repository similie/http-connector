"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockCount = void 0;
const model_structures_1 = require("../model-structures");
class StockCount extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stockcounts';
    }
}
exports.StockCount = StockCount;
