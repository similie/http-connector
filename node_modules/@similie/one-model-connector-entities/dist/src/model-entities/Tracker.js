"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
const model_structures_1 = require("../model-structures");
class Tracker extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'trackers';
    }
}
exports.Tracker = Tracker;
