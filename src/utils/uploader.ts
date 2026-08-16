import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(
            null,
            path.join(process.cwd(), "uploads")
        );
    },

    filename: function (req, file, cb) {
        const uniqueSuffix =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);

        // =========================
        // Fix Bangla / UTF-8 filename
        // =========================
        const originalName = Buffer.from(
            file.originalname,
            "latin1"
        ).toString("utf8");

        // =========================
        // Get extension
        // =========================
        const ext = path.extname(originalName);

        // Remove extension from filename
        const nameWithoutExt = path.basename(
            originalName,
            ext
        );

        // =========================
        // Final filename
        // =========================
        const finalName =
            `${nameWithoutExt}-${uniqueSuffix}${ext}`;

        cb(null, finalName);
    },
});

const upload = multer({
    storage,
});

export default upload;


export const fileUploader = { upload };
