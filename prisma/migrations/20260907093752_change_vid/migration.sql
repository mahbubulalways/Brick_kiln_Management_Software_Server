-- DropForeignKey
ALTER TABLE "SmsRechargeHistory" DROP CONSTRAINT "SmsRechargeHistory_vataId_fkey";

-- DropForeignKey
ALTER TABLE "SmsWallet" DROP CONSTRAINT "SmsWallet_vataId_fkey";

-- AddForeignKey
ALTER TABLE "SmsWallet" ADD CONSTRAINT "SmsWallet_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmsRechargeHistory" ADD CONSTRAINT "SmsRechargeHistory_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
