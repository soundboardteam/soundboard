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
const client_1 = __importDefault(require("../../models/client"));
const profile_1 = __importDefault(require("../../models/profile"));
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield client_1.default.find();
        res.status(200).json({ clients });
    }
    catch (error) {
        throw error;
    }
});
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
        const allProfiles = yield profile_1.default.find();
        res.status(201).json({
            message: 'Profile added',
            profile: newProfile,
            profiles: allProfiles,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addProfile = addProfile;
