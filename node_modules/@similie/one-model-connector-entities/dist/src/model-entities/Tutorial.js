"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const model_structures_1 = require("../model-structures");
class Tutorial extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'tutorials';
    }
}
exports.Tutorial = Tutorial;
