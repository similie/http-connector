"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorLedger = void 0;
const model_structures_1 = require("../model-structures");
class VendorLedger extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'vendorledgers';
    }
}
exports.VendorLedger = VendorLedger;
