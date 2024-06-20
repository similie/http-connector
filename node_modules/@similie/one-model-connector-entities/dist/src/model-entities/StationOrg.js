"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationOrg = void 0;
const model_structures_1 = require("../model-structures");
class StationOrg extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stationorgs';
    }
}
exports.StationOrg = StationOrg;
