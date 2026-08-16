"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);
        // =========================
        // Fix Bangla / UTF-8 filename
        // =========================
        const originalName = Buffer.from(file.originalname, "latin1").toString("utf8");
        // =========================
        // Get extension
        // =========================
        const ext = path_1.default.extname(originalName);
        // Remove extension from filename
        const nameWithoutExt = path_1.default.basename(originalName, ext);
        // =========================
        // Final filename
        // =========================
        const finalName = `${nameWithoutExt}-${uniqueSuffix}${ext}`;
        cb(null, finalName);
    },
});
const upload = (0, multer_1.default)({
    storage,
});
exports.default = upload;
exports.fileUploader = { upload };
