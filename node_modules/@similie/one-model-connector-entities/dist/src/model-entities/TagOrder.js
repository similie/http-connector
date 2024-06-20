"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagOrder = void 0;
const model_structures_1 = require("../model-structures");
class TagOrder extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'tagorders';
    }
}
exports.TagOrder = TagOrder;
