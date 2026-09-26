/*
  Warnings:

  - The values [INVOICE] on the enum `ModuleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `reviewNote` on the `ApprovalRequest` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModuleType_new" AS ENUM ('USER', 'LOGIN_HISTORY', 'CLASS_RATE', 'CHALLAN', 'CHALLAN_ITEM', 'CUSTOMER', 'CUSTOMER_DUE', 'DELIVERY', 'DELIVERY_STATUS_TIME', 'DUE', 'LEDGER', 'PAYMENT', 'CASH', 'ROUND', 'LOAD_INFO', 'UNLOAD', 'UNLOAD_ITEM', 'BRICK_STOCK_SUMMARY', 'STOCK', 'GOODS_STOCK_CATEGORY', 'GOODS_STOCK', 'GOODS_ISSUE', 'GOOD_HISTORY_LOG', 'GOODS_LOSS', 'DOCUMENT', 'CAR_RENT', 'PRODUCT', 'TASK', 'RECEIVABLE_PAYABLE', 'RECEIVABLE_PAYABLE_TRANSACTION', 'CONTACT', 'WEATHER', 'VATA', 'SUBSCRIPTION_PLAN', 'SUBSCRIPTION_PAYMENT', 'SEASON', 'DRIVER', 'VATA_CAR', 'CAR_INCOME_DELIVERY', 'SMS_SETTING', 'SMS_WALLET', 'SMS_RECHARGE_HISTORY', 'VATA_SMS_SETTINGS', 'SMS_LOG', 'NOTE', 'NOTIFICATION', 'FAQ', 'ABOUT_US', 'HELP_LINE', 'YOUTUBE_LINK', 'DATABASE_BACKUP_PERMISSION', 'DATABASE_BACKUP', 'APPROVAL_REQUEST', 'ACTIVITY_LOG');
ALTER TABLE "ApprovalRequest" ALTER COLUMN "module" TYPE "ModuleType_new" USING ("module"::text::"ModuleType_new");
ALTER TABLE "ActivityLog" ALTER COLUMN "module" TYPE "ModuleType_new" USING ("module"::text::"ModuleType_new");
ALTER TYPE "ModuleType" RENAME TO "ModuleType_old";
ALTER TYPE "ModuleType_new" RENAME TO "ModuleType";
DROP TYPE "public"."ModuleType_old";
COMMIT;

-- AlterTable
ALTER TABLE "ApprovalRequest" DROP COLUMN "reviewNote";
