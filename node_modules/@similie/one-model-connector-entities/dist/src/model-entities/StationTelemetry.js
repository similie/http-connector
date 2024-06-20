"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationTelemetry = void 0;
const model_structures_1 = require("../model-structures");
class StationTelemetry extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stationtelemetries';
    }
}
exports.StationTelemetry = StationTelemetry;
