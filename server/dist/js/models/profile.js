"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    displayName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    userRoles: {
        type: Array,
        required: true,
    },
    verifiedAccount: {
        type: Boolean,
        required: true,
    },
    linkedAccounts: {
        type: Array,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Profile', profileSchema);
