"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permit = void 0;
const model_structures_1 = require("../model-structures");
class Permit extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'permits';
    }
}
exports.Permit = Permit;
