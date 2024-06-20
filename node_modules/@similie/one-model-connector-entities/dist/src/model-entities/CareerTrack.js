"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerTrack = void 0;
const model_structures_1 = require("../model-structures");
class CareerTrack extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'careertracks';
    }
}
exports.CareerTrack = CareerTrack;
