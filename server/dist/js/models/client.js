"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    profileId: {
        type: String,
        required: true,
    },
    ratings: {
        type: Array,
        required: true,
    },
    jobs: {
        type: Array,
        required: true,
    },
    previousClients: {
        type: Array,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Client', clientSchema);
