"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = async (payload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: expiresIn,
    });
};
const verifyToken = async (token, secret) => {
    try {
        const data = jsonwebtoken_1.default.verify(token, secret);
        return data;
    }
    catch (error) {
        return null;
    }
};
exports.jwtHelper = {
    generateToken,
    verifyToken,
};
