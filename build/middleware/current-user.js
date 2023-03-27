"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = function (req, res, next) {
    var _a, _b, _c, _d;
    if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt) == null || ((_b = req.session) === null || _b === void 0 ? void 0 : _b.jwt) == undefined) {
        console.log((_c = req.session) === null || _c === void 0 ? void 0 : _c.jwt, "not_jwt");
        req.currentUser = null;
        next();
    }
    const decodeJwt = jsonwebtoken_1.default.verify((_d = req.session) === null || _d === void 0 ? void 0 : _d.jwt, process.env.JWTAUTH);
    req.currentUser = decodeJwt;
    console.log('decodejwt', req.currentUser);
    next();
};
exports.currentUser = currentUser;
// Comment 12343
