"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badging = void 0;
const model_structures_1 = require("../model-structures");
class Badging extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'badgings';
    }
}
exports.Badging = Badging;
