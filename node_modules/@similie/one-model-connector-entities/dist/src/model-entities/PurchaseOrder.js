"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrder = void 0;
const model_structures_1 = require("../model-structures");
class PurchaseOrder extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'purchaseorders';
    }
}
exports.PurchaseOrder = PurchaseOrder;
