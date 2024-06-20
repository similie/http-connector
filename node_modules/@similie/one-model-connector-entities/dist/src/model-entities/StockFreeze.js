"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockFreeze = void 0;
const model_structures_1 = require("../model-structures");
class StockFreeze extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stockfreezes';
    }
}
exports.StockFreeze = StockFreeze;
