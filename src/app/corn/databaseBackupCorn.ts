import cron from "node-cron";
import { prisma } from "../../helpers/prisma";
import { DatabaseBackupService } from "../modules/system_modules/database/database.service";
import { DatabaseBackupType } from "../../generated/prisma/enums";

const databaseBackupCron = () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        const permission = await prisma.databaseBackupPermission.findFirst({
          where: {
            type: DatabaseBackupType.AUTO,
          },
        });

        if (!permission) {
          return;
        }

        await DatabaseBackupService.createDatabaseBackup({
          backupType: DatabaseBackupType.AUTO,
        });
      } catch (error) {
        console.error("❌ Automatic database backup failed:", error);
      }
    },
    {
      timezone: "Asia/Dhaka",
    },
  );

  console.log("🕛 Database backup cron scheduled: Every day at 12:00 AM");
};

export default databaseBackupCron;
