"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// cloudinary.config({
//   cloud_name: "dt4kwpzfk",
//   api_key: "881498193527174",
//   api_secret: "rO8e7-cw179mOfgrTBI8ZJYR70Q",
// });
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // ✅ EXTENSION FIX (ADDED)
        const ext = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});
const upload = (0, multer_1.default)({ storage });
// CLOUDINARY
// const uploadToCloudinary = async (
//   file: IUploadFile,
// ): Promise<ICloudinaryResponse | undefined> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,
//       {
//         resource_type: "video", // 👈 REQUIRED for audio files (m4a, mp3, wav, etc.)
//       },
//       (
//         error: UploadApiErrorResponse | undefined,
//         result: UploadApiResponse | undefined,
//       ) => {
//         fs.unlinkSync(file.path);
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result as ICloudinaryResponse | undefined);
//         }
//       },
//     );
//   });
// };
exports.fileUploader = { upload };
