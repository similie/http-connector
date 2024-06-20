"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EWS = void 0;
const model_structures_1 = require("../model-structures");
class EWS extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'ews';
    }
}
exports.EWS = EWS;
