"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesStack = void 0;
const model_structures_1 = require("../model-structures");
class RulesStack extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'rulesstacks';
    }
}
exports.RulesStack = RulesStack;
