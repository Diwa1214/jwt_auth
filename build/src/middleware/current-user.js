"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const InvalidTokenError_1 = require("../errors/InvalidTokenError");
dotenv.config();
const currentUser = function (req, res, next) {
    var _a, _b;
    let token = null;
    console.log(req.session, req.headers.authorization);
    if (req.headers.authorization !== undefined) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(' ')[1];
        }
    }
    else if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null) {
        token = (_b = req.session) === null || _b === void 0 ? void 0 : _b.access_token;
    }
    if (token == null || token == undefined) {
        req.currentUser = null;
        next();
    }
    try {
        let verfiy_access_token = jsonwebtoken_1.default.verify(token, process.env.JWT_AUTH);
        if (verfiy_access_token) {
            const decodeJwt = verfiy_access_token;
            req.currentUser = decodeJwt;
            next();
        }
    }
    catch (err) {
        throw new InvalidTokenError_1.InvalidTokenError("access token get expired kindly get the access token again by using refresh token");
    }
};
exports.currentUser = currentUser;
// Comment 12343
