"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const model_structures_1 = require("../model-structures");
class Tag extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'tags';
    }
}
exports.Tag = Tag;
