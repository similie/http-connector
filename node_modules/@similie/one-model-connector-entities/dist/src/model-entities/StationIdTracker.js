"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationIdTracker = void 0;
const model_structures_1 = require("../model-structures");
class StationIdTracker extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stationidtrackers';
    }
}
exports.StationIdTracker = StationIdTracker;
