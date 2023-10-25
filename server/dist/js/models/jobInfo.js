"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jobInfoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
    urgentStatus: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('JobInfo', jobInfoSchema);
