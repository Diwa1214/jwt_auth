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
exports.refreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const BadRequest_1 = require("../errors/BadRequest");
const InvalidTokenError_1 = require("../errors/InvalidTokenError");
const app = (0, express_1.default)();
app.set("trust proxy", 1);
app.use((0, cookie_session_1.default)({
    secure: true,
    signed: false
}));
const generateToken = (req, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payload = {
            'user': data.payload
        };
        let access_token = yield jsonwebtoken_1.default.sign(payload, data.secret_key, { expiresIn: data === null || data === void 0 ? void 0 : data.expireIn });
        let refresh_token = yield jsonwebtoken_1.default.sign(payload, data.secret_key, { expiresIn: (_a = data === null || data === void 0 ? void 0 : data.refresh_token) === null || _a === void 0 ? void 0 : _a.expireIn });
        if (data === null || data === void 0 ? void 0 : data.session) {
            req.session = {
                'access_token': access_token,
                'refresh_token': refresh_token
            };
        }
        return { access_token, refresh_token };
    }
    catch (err) {
        throw new BadRequest_1.BadRequest('Something went wrong while processing jwt sign');
    }
});
exports.generateToken = generateToken;
const refreshToken = (req, expireIn, session) => {
    var _a, _b, _c;
    try {
        let token = null;
        if (req.headers.authorization !== undefined) {
            let authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer")) {
                console.log(authHeader.split(" ")[1]);
                token = authHeader.split(" ")[1];
            }
        }
        else if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.refresh_token) !== null) {
            token = (_b = req.session) === null || _b === void 0 ? void 0 : _b.refresh_token;
        }
        console.log(token, "token");
        if (token !== null || token !== undefined) {
            let verify_refresh_token = jsonwebtoken_1.default.verify(token, process.env.JWT_AUTH);
            if (verify_refresh_token) {
                let decodeJwt = verify_refresh_token.user;
                let payload = {
                    "user": decodeJwt
                };
                let reassign_access_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_AUTH, { expiresIn: expireIn });
                if (session) {
                    req.session = {
                        'access_token': reassign_access_token,
                        'refresh_token': (_c = req === null || req === void 0 ? void 0 : req.session) === null || _c === void 0 ? void 0 : _c.refresh_token
                    };
                }
                return reassign_access_token;
            }
        }
    }
    catch (err) {
        throw new InvalidTokenError_1.InvalidTokenError("refresh token get expired kindly login again");
    }
};
exports.refreshToken = refreshToken;
