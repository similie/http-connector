"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Station = void 0;
const model_structures_1 = require("../model-structures");
class Station extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'stations';
    }
}
exports.Station = Station;
