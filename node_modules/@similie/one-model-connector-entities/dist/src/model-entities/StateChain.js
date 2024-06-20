"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateChain = void 0;
const model_structures_1 = require("../model-structures");
class StateChain extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'statechains';
    }
}
exports.StateChain = StateChain;
