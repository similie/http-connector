"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const model_structures_1 = require("../model-structures");
class Activity extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'activities';
    }
}
exports.Activity = Activity;
