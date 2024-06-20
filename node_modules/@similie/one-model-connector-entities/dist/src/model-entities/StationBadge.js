"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationBadge = void 0;
const model_structures_1 = require("../model-structures");
class StationBadge extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stationbadges';
    }
}
exports.StationBadge = StationBadge;
