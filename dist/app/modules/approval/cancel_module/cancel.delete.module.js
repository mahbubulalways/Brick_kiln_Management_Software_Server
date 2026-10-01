"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelDeleteModule = void 0;
const prisma_1 = require("../../../../helpers/prisma");
const cancelDeleteModule = async (user, findRequest) => {
    switch (findRequest.module) {
        case "CLASS_RATE":
            await prisma_1.prisma.classAndRate.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "শ্রেণি ও রেট ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "CHALLAN":
            await prisma_1.prisma.challan.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "চালান ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "DELIVERY":
            await prisma_1.prisma.delivery.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    invoice: {
                        vataId: user.vataId,
                    },
                    id: findRequest.targetId,
                },
            });
            return {
                message: "ডেলিভারি ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "LEDGER":
            await prisma_1.prisma.ledger.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "লেজার ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "CASH":
            await prisma_1.prisma.ledger.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "ক্যাশ ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "DUE":
            await prisma_1.prisma.due_Collection.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    customer: {
                        vataId: user.vataId,
                    },
                    id: findRequest.targetId,
                },
            });
            return {
                message: "বাকি জমার ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "PAYMENT":
            await prisma_1.prisma.due_Collection.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    customer: {
                        vataId: user.vataId,
                    },
                    id: findRequest.targetId,
                },
            });
            return {
                message: "বাকি পরিশোধের ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "LOAD_INFO":
            await prisma_1.prisma.loadInfo.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    id: findRequest.targetId,
                    round: {
                        vataId: user.vataId,
                    },
                },
            });
            return {
                message: "ইটের লোড ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "GOODS_STOCK_CATEGORY":
            await prisma_1.prisma.goodsStockCategory.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "পণ্যের ক্যাটাগরি ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "CONTACT":
            await prisma_1.prisma.contact.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "ফোন নম্বর ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "DRIVER":
            await prisma_1.prisma.driver.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "ড্রাইভার ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "CAR_RENT":
            await prisma_1.prisma.carRent.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "গাড়ির ভাড়া ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "STOCK":
            await prisma_1.prisma.stockBook.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "স্টকের তথ্য ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "CUSTOMER":
            await prisma_1.prisma.customer.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "কাস্টমারের তথ্য ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        case "USER":
            await prisma_1.prisma.user.update({
                data: {
                    deleteStatus: "CANCELLED",
                },
                where: {
                    vataId: user.vataId,
                    id: findRequest.targetId,
                },
            });
            return {
                message: "ইউজারের তথ্য ডিলিটের অনুরোধ বাতিল করা হয়েছে।",
            };
        default:
            return {
                message: "এই মডিউলের জন্য ডিলিট বাতিল করার ব্যবস্থা নেই।",
            };
    }
};
exports.cancelDeleteModule = cancelDeleteModule;
