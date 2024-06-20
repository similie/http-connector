"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationSchema = void 0;
const model_structures_1 = require("../model-structures");
class StationSchema extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stationschemas';
    }
}
exports.StationSchema = StationSchema;
