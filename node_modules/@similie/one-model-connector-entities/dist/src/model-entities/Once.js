"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Once = void 0;
const model_structures_1 = require("../model-structures");
class Once extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'onces';
    }
}
exports.Once = Once;
