"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const report_utils_1 = require("./report.utils");
const getTopSellingAreasService = async (user) => {
    const challans = await prisma_1.prisma.challan.findMany({
        where: {
            isDeleted: false,
            customer: {
                vataId: user.vataId,
                isDeleted: false,
            },
        },
        select: {
            id: true,
            totalPrice: true,
            customerId: true,
            customer: {
                select: {
                    address: true,
                },
            },
            items: {
                where: {
                    isDeleted: false,
                },
                select: {
                    quantity: true,
                },
            },
        },
    });
    const areaMap = new Map();
    for (const challan of challans) {
        const area = challan.customer.address.trim();
        const totalQuantity = challan.items.reduce((sum, item) => sum + item.quantity, 0);
        const existingArea = areaMap.get(area);
        if (existingArea) {
            // Unique customer
            existingArea.customerIds.add(challan.customerId);
            // Challan count
            existingArea.totalChallan += 1;
            // Total bricks
            existingArea.totalQuantity += totalQuantity;
            // Total sales
            existingArea.totalSales += challan.totalPrice;
        }
        else {
            areaMap.set(area, {
                customerIds: new Set([challan.customerId]),
                totalChallan: 1,
                totalQuantity,
                totalSales: challan.totalPrice,
            });
        }
    }
    const result = Array.from(areaMap.entries())
        .map(([area, data]) => ({
        area,
        totalCustomer: data.customerIds.size,
        totalChallan: data.totalChallan,
        totalQuantity: data.totalQuantity,
        totalSales: data.totalSales,
    }))
        .sort((a, b) => b.totalSales - a.totalSales)
        .slice(0, 15)
        .map((item, index) => ({
        rank: index + 1,
        ...item,
    }));
    return result;
};
// LOAD UNLOAD
const getLoadUnloadReportService = async (user) => {
    const result = await prisma_1.prisma.brickStockSummary.findFirst({
        where: { vataId: user.vataId }, //need to add season id
    });
    return result;
};
// GET ALL REPORT FOR DASHBOARD
const dashboardAllReportService = async (user, seasonId, query) => {
    const challanWhere = {
        isDeleted: false,
        vataId: user.vataId,
        seasonId,
    };
    const paymentWhere = {
        isDeleted: false,
        ledger: { seasonId, vataId: user.vataId },
    };
    const deuWhere = {
        seasonId,
        customer: {
            vataId: user.vataId,
        },
    };
    const cashExpenseWhere = {
        vataId: user.vataId,
        seasonId,
        type: "EXPENSE",
    };
    const cashIncomeWhere = {
        vataId: user.vataId,
        seasonId,
        type: "INCOME",
    };
    const deliveryWhere = {
        invoice: {
            seasonId,
            vataId: user.vataId,
        },
    };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            challanWhere.challanDate = dateRange;
            paymentWhere.paymentDate = dateRange;
            deuWhere.createdAt = dateRange;
            cashExpenseWhere.createdAt = dateRange;
            cashIncomeWhere.createdAt = dateRange;
            deliveryWhere.deliveryDate = dateRange;
        }
    }
    const challans = await prisma_1.prisma.challan.findMany({
        where: challanWhere,
        select: {
            // carRent: true,
            cash: true,
            discount: true,
            due: true,
            items: {
                select: {
                    class: true,
                    quantity: true,
                    price: true,
                },
            },
        },
    });
    const challanReport = report_utils_1.ReportUtils.calculateDashboardReport(challans);
    // ITEMS
    const items = report_utils_1.ReportUtils.calculateClassWiseReport(challans);
    // PAYMENTS
    const payments = await prisma_1.prisma.payment.findMany({
        where: paymentWhere,
        select: {
            payment: true,
            totalBill: true,
            cutting: true,
            ledger: {
                select: { name: true },
            },
        },
    });
    const paymentReport = report_utils_1.ReportUtils.calculatePaymentReport(payments);
    const totalPaymentGiven = paymentReport.reduce((sum, item) => sum + item.paymentGiven, 0);
    // DUE=====================================================================
    const due = await prisma_1.prisma.due_Collection.aggregate({
        where: deuWhere,
        _sum: {
            collect: true,
        },
    });
    // CASH==================================================
    const cashExpense = await prisma_1.prisma.cash.aggregate({
        where: cashExpenseWhere,
        _sum: {
            amount: true,
        },
    });
    const cashIncome = await prisma_1.prisma.cash.aggregate({
        where: cashIncomeWhere,
        _sum: {
            amount: true,
        },
    });
    const totalCash = Number(cashIncome._sum.amount) - Number(cashExpense._sum.amount);
    const delivery = await prisma_1.prisma.delivery.findMany({
        where: deliveryWhere,
        select: {
            deliveryReceived: true,
            class: true,
        },
    });
    //   DELIVERY
    const classWiseDelivery = Object.values(delivery.reduce((acc, item) => {
        const className = item.class;
        if (!acc[className]) {
            acc[className] = {
                class: className,
                quantity: 0,
            };
        }
        acc[className].quantity += item.deliveryReceived;
        return acc;
    }, {}));
    //   STOCK
    const resultSummary = await prisma_1.prisma.brickStockSummary.findFirst({
        where: { vataId: user.vataId }, //need to add season id
    });
    // CLASS
    const classes = await prisma_1.prisma.classAndRate.findMany({
        where: {
            vataId: user.vataId,
        },
        select: {
            className: true,
        },
    });
    //   GRAPH
    const allClassGraph = classes.map((item) => {
        const totalQuantity = items
            .filter((it) => it.class === item.className)
            .reduce((total, it) => total + it.totalQuantity, 0);
        return {
            class: item.className,
            quantity: totalQuantity,
        };
    });
    const allClassDeliveryGraph = classes.map((item) => {
        const totalQuantity = delivery
            .filter((it) => it.class === item.className)
            .reduce((total, it) => total + it.deliveryReceived, 0);
        return {
            class: item.className,
            quantity: totalQuantity,
        };
    });
    const Informations = {
        challan: {
            summary: challanReport,
            items,
        },
        payment: {
            total: totalPaymentGiven,
            payments: paymentReport,
        },
        due: due?._sum?.collect ?? 0,
        cash: totalCash ?? 0,
        delivery: classWiseDelivery,
        stockSummary: resultSummary,
        sellGraph: allClassGraph,
        deliveryGraph: allClassDeliveryGraph,
    };
    return Informations;
};
// GET OWNER REPORT
const getReportForOwnerService = async (user, seasonId, query) => {
    const result = dashboardAllReportService(user, seasonId, query);
    const response = {};
};
exports.ReportService = {
    getTopSellingAreasService,
    dashboardAllReportService,
    getLoadUnloadReportService,
};
