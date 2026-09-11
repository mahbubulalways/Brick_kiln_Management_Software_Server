"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBackupToGoogleDrive = void 0;
const fs_1 = __importDefault(require("fs"));
const googleapis_1 = require("googleapis");
const auth = new googleapis_1.google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive.file"],
});
const drive = googleapis_1.google.drive({
    version: "v3",
    auth,
});
const uploadBackupToGoogleDrive = async (filePath, fileName) => {
    console.log(process.env.GOOGLE_PRIVATE_KEY);
    console.log("KEYyyyyyyyyyyyyyyyyyyy");
    try {
        const folderId = process.env.GOOGLE_DRIVE_BACKUP_FOLDER_ID;
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
            throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL is not configured");
        }
        if (!process.env.GOOGLE_PRIVATE_KEY) {
            throw new Error("GOOGLE_PRIVATE_KEY is not configured");
        }
        if (!folderId) {
            throw new Error("GOOGLE_DRIVE_BACKUP_FOLDER_ID is not configured");
        }
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error(`Backup file not found: ${filePath}`);
        }
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [folderId],
            },
            media: {
                mimeType: "application/sql",
                body: fs_1.default.createReadStream(filePath),
            },
            fields: "id,name,size,webViewLink",
        });
        console.log(response);
        return {
            fileId: response.data.id,
            fileName: response.data.name,
            fileSize: response.data.size,
            webViewLink: response.data.webViewLink,
        };
    }
    catch (error) {
        console.error("Google Drive backup upload error:", error);
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to upload database backup to Google Drive");
    }
};
exports.uploadBackupToGoogleDrive = uploadBackupToGoogleDrive;
