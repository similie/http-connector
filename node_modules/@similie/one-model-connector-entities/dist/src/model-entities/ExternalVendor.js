"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalVendor = void 0;
const model_structures_1 = require("../model-structures");
class ExternalVendor extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'externalvendors';
    }
}
exports.ExternalVendor = ExternalVendor;
