"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const InvalidCredential_1 = require("../errors/InvalidCredential");
const Auth = function (req, res, next) {
    if (req.currentUser == null) {
        throw new InvalidCredential_1.InvalidCredentialError();
    }
    next();
};
exports.Auth = Auth;
