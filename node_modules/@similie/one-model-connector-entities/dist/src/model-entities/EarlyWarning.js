"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarlyWarning = void 0;
const model_structures_1 = require("../model-structures");
class EarlyWarning extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'earlywarnings';
    }
}
exports.EarlyWarning = EarlyWarning;
