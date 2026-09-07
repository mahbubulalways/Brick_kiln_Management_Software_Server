"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAndPermissionForSms = void 0;
const client_1 = require("../../../generated/prisma/client");
const sendSmsToPhoneNumbers_1 = require("../../../utils/sendSmsToPhoneNumbers");
const getUserAndPermissionForSms = async ({ clientPhoneNumber, clientMessage, ownerMessage, sendToOwner, tx, user, from, }) => {
    const [userInfo, vataOwners, smsPermission, smsWallet] = await Promise.all([
        tx.user.findFirst({
            where: {
                username: user.username,
            },
            select: {
                id: true,
                name: true,
                username: true,
            },
        }),
        tx.user.findMany({
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
        tx.vataSmsSettings.findFirst({
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
        tx.smsWallet.findFirst({
            where: {
                vataId: user.vataId,
            },
        }),
    ]);
    // OWNER PHONE NUMBERS
    const ownerPhoneNumbers = [
        ...new Set(vataOwners
            .map((owner) => owner.vata?.ownerPhoneNumber)
            .filter((phone) => Boolean(phone))),
    ];
    // SMS PERMISSION
    const permissionMap = {
        NEW_INVOICE: Boolean(smsPermission?.newInvoice),
        UPDATE_INVOICE: Boolean(smsPermission?.updateInvoice),
        DELETE_INVOICE: Boolean(smsPermission?.deleteInvoice),
        NEW_DELIVERY: Boolean(smsPermission?.newDelivery),
        DEU_COLLECTION: Boolean(smsPermission?.newDueCollection),
        UPDATE_DEU_COLLECTION: Boolean(smsPermission?.deuCollectionUpdate),
    };
    const hasPermission = permissionMap[from];
    // PERMISSION OFF
    if (!hasPermission) {
        return {
            success: false,
            message: "SMS permission is disabled",
            from,
            smsPermission: false,
            smsNumbers: [],
        };
    }
    // CLIENT NUMBERS
    const clientNumbers = [];
    if (clientPhoneNumber && clientMessage) {
        clientNumbers.push(clientPhoneNumber);
    }
    // OWNER NUMBERS
    const ownerNumbers = sendToOwner && ownerMessage ? ownerPhoneNumbers : [];
    // ALL SMS NUMBERS
    const smsNumbers = [...clientNumbers, ...ownerNumbers];
    // TOTAL SMS
    const totalSms = smsNumbers.length;
    // যদি কোনো SMS পাঠানোর দরকার না থাকে
    if (totalSms === 0) {
        return {
            success: false,
            message: "No SMS number found",
            from,
            smsPermission: true,
            smsNumbers: [],
        };
    }
    // SMS RATE
    const smsRate = smsWallet?.currentRate ?? 0;
    // TOTAL SMS COST
    const totalCost = totalSms * Number(smsRate);
    // WALLET না থাকলে
    if (!smsWallet) {
        return {
            success: false,
            message: "SMS wallet not found",
            from,
            smsPermission: true,
            smsNumbers,
        };
    }
    // BALANCE CHECK
    const currentBalance = Number(smsWallet.balance);
    if (currentBalance < totalCost) {
        return {
            success: false,
            message: "Insufficient SMS balance",
            from,
            smsPermission: true,
            smsNumbers: [],
            requiredBalance: totalCost,
            currentBalance,
            totalSms,
        };
    }
    /*
     * ==============================
     * SEND CLIENT SMS
     * ==============================
     */
    if (clientNumbers.length && clientMessage) {
        await (0, sendSmsToPhoneNumbers_1.sendSmsToPhoneNumbers)(clientNumbers, clientMessage);
    }
    /*
     * ==============================
     * SEND OWNER SMS
     * ==============================
     */
    if (ownerNumbers.length && ownerMessage) {
        await (0, sendSmsToPhoneNumbers_1.sendSmsToPhoneNumbers)(ownerNumbers, ownerMessage);
    }
    /*
     * ==============================
     * CLIENT SMS LOG
     * ==============================
     */
    const clientLogs = clientNumbers.map((phoneNumber) => ({
        message: clientMessage,
        cost: Number(smsRate),
        phoneNumber,
        sendBy: userInfo?.username,
        status: client_1.SmsStatus.SENT,
        vataId: user.vataId,
    }));
    /*
     * ==============================
     * OWNER SMS LOG
     * ==============================
     */
    const ownerLogs = ownerNumbers.map((phoneNumber) => ({
        message: ownerMessage,
        cost: Number(smsRate),
        phoneNumber,
        sendBy: userInfo?.username,
        status: client_1.SmsStatus.SENT,
        vataId: user.vataId,
    }));
    const smsLogs = [...clientLogs, ...ownerLogs];
    /*
     * ==============================
     * SAVE SMS LOG
     * ==============================
     */
    if (smsLogs.length) {
        await tx.smsLog.createMany({
            data: smsLogs,
        });
    }
    /*
     * ==============================
     * UPDATE SMS WALLET
     * ==============================
     */
    await tx.smsWallet.update({
        where: {
            vataId: user.vataId,
        },
        data: {
            totalUsed: {
                increment: totalSms,
            },
            balance: {
                decrement: totalCost,
            },
        },
    });
};
exports.getUserAndPermissionForSms = getUserAndPermissionForSms;
