"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoFeature = void 0;
const model_structures_1 = require("../model-structures");
class GeoFeature extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'geofeatures';
    }
}
exports.GeoFeature = GeoFeature;
