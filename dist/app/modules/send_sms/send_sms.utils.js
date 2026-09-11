"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAndPermissionForSms = void 0;
const client_1 = require("../../../generated/prisma/client");
const prisma_1 = require("../../../helpers/prisma");
const smsService_1 = require("../../service/smsService");
const getUserAndPermissionForSms = async ({ clientPhoneNumber, message, sendToOwner, user, from, }) => {
    const [userInfo, vataOwner, smsPermission, smsWallet] = await Promise.all([
        prisma_1.prisma.user.findFirst({
            where: {
                username: user.username,
            },
            select: {
                username: true,
            },
        }),
        prisma_1.prisma.user.findFirst({
            where: {
                vataId: user.vataId,
                role: "OWNER",
            },
            select: {
                vata: {
                    select: {
                        ownerPhoneNumber: true,
                    },
                },
            },
        }),
        prisma_1.prisma.vataSmsSettings.findFirst({
            where: {
                vataId: user.vataId,
            },
            select: {
                deleteInvoice: true,
                deuCollectionUpdate: true,
                newDelivery: true,
                newDueCollection: true,
                newInvoice: true,
                updateInvoice: true,
            },
        }),
        prisma_1.prisma.smsWallet.findFirst({
            where: {
                vataId: user.vataId,
            },
        }),
    ]);
    const permissionMap = {
        NEW_INVOICE: Boolean(smsPermission?.newInvoice),
        UPDATE_INVOICE: Boolean(smsPermission?.updateInvoice),
        DELETE_INVOICE: Boolean(smsPermission?.deleteInvoice),
        NEW_DELIVERY: Boolean(smsPermission?.newDelivery),
        DEU_COLLECTION: Boolean(smsPermission?.newDueCollection),
        UPDATE_DEU_COLLECTION: Boolean(smsPermission?.deuCollectionUpdate),
    };
    if (!permissionMap[from] || !smsWallet || !message) {
        return;
    }
    const smsRate = Number(smsWallet.currentRate ?? 0);
    const ownerPhoneNumber = vataOwner?.vata?.ownerPhoneNumber;
    const phoneNumbers = [];
    if (clientPhoneNumber) {
        phoneNumbers.push(clientPhoneNumber);
    }
    if (sendToOwner && ownerPhoneNumber) {
        phoneNumbers.push(ownerPhoneNumber);
    }
    if (!phoneNumbers.length) {
        return;
    }
    const totalSms = phoneNumbers.length;
    const currentBalance = Number(smsWallet.totalPurchased) - Number(smsWallet.totalUsed);
    if (currentBalance < totalSms) {
        return;
    }
    const response = await (0, smsService_1.sendSmsToPhoneNumbers)(phoneNumbers, message);
    console.log(response?.data);
    if (!response) {
        await prisma_1.prisma.smsLog.createMany({
            data: phoneNumbers.map((phoneNumber) => ({
                message,
                cost: 0,
                phoneNumber,
                sendBy: userInfo?.username ?? user.username,
                status: client_1.SmsStatus.FAILED,
                vataId: user.vataId,
            })),
        });
        return;
    }
    await prisma_1.prisma.smsLog.createMany({
        data: phoneNumbers.map((phoneNumber) => ({
            message,
            cost: smsRate,
            phoneNumber,
            sendBy: userInfo?.username ?? user.username,
            status: client_1.SmsStatus.SENT,
            vataId: user.vataId,
        })),
    });
    await prisma_1.prisma.smsWallet.update({
        where: {
            vataId: user.vataId,
        },
        data: {
            totalUsed: {
                increment: totalSms,
            },
            balance: {
                decrement: totalSms * smsRate,
            },
        },
    });
};
exports.getUserAndPermissionForSms = getUserAndPermissionForSms;
