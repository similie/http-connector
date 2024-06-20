"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sensor = void 0;
const model_structures_1 = require("../model-structures");
class Sensor extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'sensors';
    }
}
exports.Sensor = Sensor;
