"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivity = void 0;
const model_structures_1 = require("../model-structures");
class UserActivity extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'useractivities';
    }
}
exports.UserActivity = UserActivity;
