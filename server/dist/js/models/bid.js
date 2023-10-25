"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bidSchema = new mongoose_1.Schema({
    freelancerId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Bid', bidSchema);
