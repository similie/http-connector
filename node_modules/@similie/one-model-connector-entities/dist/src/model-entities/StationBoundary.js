"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationBoundary = void 0;
const model_structures_1 = require("../model-structures");
class StationBoundary extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stationboundaries';
    }
}
exports.StationBoundary = StationBoundary;
