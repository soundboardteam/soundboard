"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ratingSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    ratingValue: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    associatedJob: {
        type: String,
        required: true,
    },
});
