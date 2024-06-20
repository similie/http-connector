"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileAccess = void 0;
const model_structures_1 = require("../model-structures");
class FileAccess extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'fileaccesses';
    }
}
exports.FileAccess = FileAccess;
