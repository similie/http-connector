"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const model_structures_1 = require("../model-structures");
class Badge extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'badges';
    }
}
exports.Badge = Badge;
