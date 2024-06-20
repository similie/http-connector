"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
const model_structures_1 = require("../model-structures");
class Icon extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'icons';
    }
}
exports.Icon = Icon;
