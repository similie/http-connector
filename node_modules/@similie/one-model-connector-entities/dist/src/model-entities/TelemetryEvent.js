"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryEvent = void 0;
const model_structures_1 = require("../model-structures");
class TelemetryEvent extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'telemetryevents';
    }
}
exports.TelemetryEvent = TelemetryEvent;
