import fs from "fs";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },

  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

export const uploadBackupToGoogleDrive = async (
  filePath: string,
  fileName: string,
) => {
  console.log(process.env.GOOGLE_PRIVATE_KEY);

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

    if (!fs.existsSync(filePath)) {
      throw new Error(`Backup file not found: ${filePath}`);
    }

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },

      media: {
        mimeType: "application/sql",
        body: fs.createReadStream(filePath),
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
  } catch (error) {
    console.error("Google Drive backup upload error:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to upload database backup to Google Drive",
    );
  }
};
