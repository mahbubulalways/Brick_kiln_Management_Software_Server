"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const ApplicationError_1 = require("../../errors/ApplicationError");
const payment_module_1 = require("./module/payment.module");
const ledger_module_1 = require("./module/ledger.module");
const class_rate_module_1 = require("./module/class.rate.module");
const challan_module_1 = require("./module/challan.module");
const delivery_module_1 = require("./module/delivery.module");
const due_collection_module_1 = require("./module/due.collection.module");
const cash_module_1 = require("./module/cash.module");
const load_module_1 = require("./module/load.module");
const goods_category_module_1 = require("./module/goods.category.module");
const contact_module_1 = require("./module/contact.module");
const driver_module_1 = require("./module/driver.module");
const car_rent_module_1 = require("./module/car.rent.module");
const cancel_update_module_1 = require("./cancel_module/cancel.update.module");
const cancel_delete_module_1 = require("./cancel_module/cancel.delete.module");
const stock_module_1 = require("./module/stock.module");
const customer_module_1 = require("./module/customer.module");
const user_module_1 = require("./module/user.module");
const getAlApprovalService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.approvalRequest.findMany({
            where: { vataId: user.vataId, isDeleted: false },
            include: {
                requestedBy: {
                    select: {
                        name: true,
                    },
                },
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.approvalRequest.count({
            where: { vataId: user.vataId, isDeleted: false },
        }),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
const changeAprovalStatus = async (user, seasonId, approvalId, status) => {
    const findRequest = await prisma_1.prisma.approvalRequest.findFirst({
        where: {
            id: approvalId,
            vataId: user.vataId,
            isDeleted: false,
            status: "PENDING",
        },
        select: {
            id: true,
            module: true,
            action: true,
            targetId: true,
            newData: true,
            oldData: true,
            vataId: true,
        },
    });
    if (!findRequest) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "অনুমোদনের অনুরোধ পাওয়া যায়নি।");
    }
    if (status === "CANCELLED") {
        const result = await prisma_1.prisma.approvalRequest.update({
            where: {
                id: approvalId,
            },
            data: {
                status: "CANCELLED",
                reviewedAt: new Date(),
            },
        });
        if (findRequest?.action === "UPDATE") {
            const response = await (0, cancel_update_module_1.cancelUpdateModule)(user, findRequest);
            return {
                result,
                message: response.message,
            };
        }
        if (findRequest?.action === "DELETE") {
            const response = await (0, cancel_delete_module_1.cancelDeleteModule)(user, findRequest);
            return {
                result,
                message: response.message,
            };
        }
    }
    if (status !== "APPROVED") {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অনুমোদনের স্ট্যাটাস সঠিক নয়।");
    }
    switch (findRequest.module) {
        case "CLASS_RATE":
            return await (0, class_rate_module_1.classRateModule)(user, findRequest, approvalId); //done
        case "LEDGER":
            return await (0, ledger_module_1.ledgerModule)(user, findRequest, approvalId); //done
        case "CHALLAN":
            return await (0, challan_module_1.challanModule)(user, findRequest, approvalId); //done
        case "DELIVERY":
            return await (0, delivery_module_1.deliveryModule)(user, findRequest, approvalId); //done delete
        case "PAYMENT":
            return await (0, payment_module_1.paymentModule)(user, findRequest, approvalId); //done
        case "DUE":
            return await (0, due_collection_module_1.dueCollectionModule)(user, findRequest, approvalId); //done
        case "CASH":
            return await (0, cash_module_1.cashModule)(user, findRequest, approvalId); //done
        case "LOAD_INFO":
            return await (0, load_module_1.loadModule)(user, seasonId, findRequest, approvalId); //done
        case "GOODS_STOCK_CATEGORY":
            return await (0, goods_category_module_1.goodsStockCategoryModule)(user, findRequest, approvalId); //done
        case "CONTACT":
            return await (0, contact_module_1.contactModule)(user, findRequest, approvalId); //done
        case "DRIVER":
            return await (0, driver_module_1.driverModule)(user, findRequest, approvalId); //done
        case "CAR_RENT":
            return await (0, car_rent_module_1.carRentModule)(user, findRequest, approvalId); //done
        case "STOCK":
            return await (0, stock_module_1.stockModule)(user, findRequest, approvalId); //done
        case "CUSTOMER":
            return await (0, customer_module_1.customerModule)(user, findRequest, approvalId); //done
        case "USER":
            return await (0, user_module_1.userModule)(user, findRequest, approvalId); //done
        default:
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "এই অনুমোদনের অনুরোধের জন্য কোনো কার্যক্রম নির্ধারিত নেই।");
    }
};
exports.ApprovalService = {
    getAlApprovalService,
    changeAprovalStatus,
};
