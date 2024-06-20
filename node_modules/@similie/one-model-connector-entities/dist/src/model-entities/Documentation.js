"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Documentation = void 0;
const model_structures_1 = require("../model-structures");
class Documentation extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'documentations';
    }
}
exports.Documentation = Documentation;
