import multer from "multer";
import path from "path";
// import {
//   v2 as cloudinary,
//   UploadApiErrorResponse,
//   UploadApiResponse,
// } from "cloudinary";
// import { ICloudinaryResponse, IUploadFile } from "../interface/file";
import fs from "fs";
// cloudinary.config({
//   cloud_name: "dt4kwpzfk",
//   api_key: "881498193527174",
//   api_secret: "rO8e7-cw179mOfgrTBI8ZJYR70Q",
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // ✅ EXTENSION FIX (ADDED)
    const ext = path.extname(file.originalname);

    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

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

export const fileUploader = { upload };
