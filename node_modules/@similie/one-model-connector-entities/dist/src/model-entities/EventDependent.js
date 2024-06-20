"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDependent = void 0;
const model_structures_1 = require("../model-structures");
class EventDependent extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'eventdependents';
    }
}
exports.EventDependent = EventDependent;
