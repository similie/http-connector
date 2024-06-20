"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockNotification = void 0;
const model_structures_1 = require("../model-structures");
class StockNotification extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stocknotifications';
    }
}
exports.StockNotification = StockNotification;
