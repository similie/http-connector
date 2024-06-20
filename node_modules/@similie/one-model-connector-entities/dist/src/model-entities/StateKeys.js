"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateKeys = void 0;
const model_structures_1 = require("../model-structures");
class StateKeys extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'statekeys';
    }
}
exports.StateKeys = StateKeys;
