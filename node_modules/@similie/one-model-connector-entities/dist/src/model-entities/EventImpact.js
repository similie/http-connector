"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventImpact = void 0;
const model_structures_1 = require("../model-structures");
class EventImpact extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'eventimpacts';
    }
}
exports.EventImpact = EventImpact;
