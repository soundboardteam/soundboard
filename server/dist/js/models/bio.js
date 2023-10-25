"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bioSchema = new mongoose_1.Schema({
    roleId: {
        type: String,
        required: true,
    },
    socials: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Bio', bioSchema);
