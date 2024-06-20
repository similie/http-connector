"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransfer = void 0;
const model_structures_1 = require("../model-structures");
class InventoryTransfer extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'inventorytransfers';
    }
}
exports.InventoryTransfer = InventoryTransfer;
