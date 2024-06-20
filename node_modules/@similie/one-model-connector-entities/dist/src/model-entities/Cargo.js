"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cargo = void 0;
const model_structures_1 = require("../model-structures");
class Cargo extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'cargos';
    }
}
exports.Cargo = Cargo;
