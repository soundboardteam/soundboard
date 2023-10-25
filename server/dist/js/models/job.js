"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    jobInfo: {
        type: Object,
        required: true,
    },
    paymentFee: {
        type: Number,
        required: true,
    },
    paymentFrequency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    bids: {
        type: Array,
        required: true,
    },
    postedDate: {
        type: String,
        required: true,
    },
    activeDate: {
        type: String,
        required: true,
    },
    completedDate: {
        type: String,
        required: true,
    },
    chosenFreelancer: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Job', jobSchema);
