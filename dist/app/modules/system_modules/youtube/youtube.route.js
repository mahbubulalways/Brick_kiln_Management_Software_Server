"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const youtube_controller_1 = require("./youtube.controller");
const AuthGuard_1 = __importDefault(require("../../../middlewares/AuthGuard"));
const enums_1 = require("../../../../generated/prisma/enums");
const router = express_1.default.Router();
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.SYSTEM_ADMIN, enums_1.UserRole.SUPER_ADMIN), youtube_controller_1.YoutubeLinkController.createYoutubeLinkController);
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.SYSTEM_ADMIN, enums_1.UserRole.SUPER_ADMIN), youtube_controller_1.YoutubeLinkController.getAllYoutubeLinksController);
router.delete("/delete/:id", (0, AuthGuard_1.default)(enums_1.UserRole.SYSTEM_ADMIN, enums_1.UserRole.SUPER_ADMIN), youtube_controller_1.YoutubeLinkController.deleteYoutubeLinkController);
exports.default = router;
