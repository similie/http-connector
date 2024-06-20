"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistration = void 0;
const model_structures_1 = require("../model-structures");
class EventRegistration extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'eventregistrations';
    }
}
exports.EventRegistration = EventRegistration;
