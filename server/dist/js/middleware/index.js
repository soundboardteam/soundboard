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
const admin = require('../config/firebase-config');
class Middleware {
    decodeToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decodeValue = yield admin.auth().verifyIdToken(token);
                console.log(decodeValue);
                if (decodeValue) {
                    req.user = decodeValue;
                    return next();
                }
                return res.json({ message: 'Unauthorized' });
            }
            catch (e) {
                return res.json({ message: 'Internal Error' });
            }
        });
    }
}
module.exports = new Middleware();
