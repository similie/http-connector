"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryDemand = void 0;
const model_structures_1 = require("../model-structures");
class InventoryDemand extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'inventorydemands';
    }
}
exports.InventoryDemand = InventoryDemand;
