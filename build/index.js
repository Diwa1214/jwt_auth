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
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const src_1 = require("./src");
const current_user_1 = require("./src/middleware/current-user");
const jwt_signin_1 = require("./src/middleware/jwt-signin");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set('trust proxy', 1);
app.use((0, cookie_session_1.default)({
    secure: false,
    signed: false
}));
app.get("/", function (req, res) {
    return res.status(201).send("Hai");
});
app.post("/demo_login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let payload = { email, password };
    let data = {
        payload: payload,
        session: true,
        secret_key: 'demo_login',
        expireIn: "10s",
        refresh_token: {
            expireIn: "200s"
        }
    };
    let token = yield (0, jwt_signin_1.generateToken)(req, data);
    return res.status(200).send(token);
}));
app.get("/current", current_user_1.currentUser, src_1.Auth, (req, res) => {
    return res.send(req.currentUser);
});
app.get('/refresh_token', (req, res) => {
    let token = (0, jwt_signin_1.refreshToken)(req, "25s", true);
    return res.send(token);
});
app.post("/logout", (req, res) => {
    req.session = null;
    req.headers.authorization = undefined;
    return res.send(req.currentUser);
});
app.get("/verify", (req, res) => {
    let valid_token = jsonwebtoken_1.default.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpd2EiLCJwYXNzd29yZCI6MTIxMzQsImlhdCI6MTY4MDkzOTkyNywiZXhwIjoxNjgwOTQwMDQ3fQ.a07JOFOjUqjJU5w3fElFKrzN7zjMzSb3QYVIOzlh--4", 'demo_login');
    return res.send(valid_token);
});
app.use(src_1.RequestErrorHandling);
const startFunction = function () {
    // if(process.env.JWT_AUTH! == undefined){
    //    throw new Error("jwt is not defined") 
    // }
    app.listen(3000, () => {
        console.log("Connected successfully");
    });
};
startFunction();
