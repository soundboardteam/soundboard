"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.addProfile = exports.getProfiles = void 0;
const profile_1 = __importDefault(require("../../models/profile"));
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield profile_1.default.find();
        res.status(200).json({ profiles });
    }
    catch (error) {
        throw error;
    }
});
exports.getProfiles = getProfiles;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqPhoneNumber = req.params.phoneNumber;
        const profile = yield profile_1.default.find({ phoneNumber: reqPhoneNumber });
        if (profile.length === 0) {
            res.status(201).json({});
        }
        res.status(200).json(undefined);
    }
    catch (error) {
        res.status(500).json({ error: 'Cannot find profile' });
    }
});
exports.getProfile = getProfile;
const addProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('REQUEST BODY', req.body);
    try {
        const body = req.body;
        const profile = new profile_1.default({
            displayName: body.displayName,
            fullName: body.fullName,
            phoneNumber: body.phoneNumber,
            email: body.email,
            userRoles: body.userRoles,
            verifiedAccount: body.verifiedAccount,
            linkedAccounts: body.linkedAccounts,
        });
        const newProfile = yield profile.save();
        res.status(201).json({
            message: 'Profile added',
            status: 201,
            profile: newProfile,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addProfile = addProfile;
