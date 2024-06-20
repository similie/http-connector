"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTake = void 0;
const model_structures_1 = require("../model-structures");
class StockTake extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stocktakes';
    }
}
exports.StockTake = StockTake;
