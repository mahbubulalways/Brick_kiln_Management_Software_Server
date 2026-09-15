"use strict";
// FOR CHALLAN
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportUtils = void 0;
const calculateDashboardReport = (challans) => {
    return challans.reduce((acc, challan) => {
        // const carRent = Number(challan.carRent || 0);
        const cash = Number(challan.cash || 0);
        const discount = Number(challan.discount || 0);
        const due = Number(challan.due || 0);
        return {
            totalSale: acc.totalSale + cash + due, //carRent,
            discount: acc.discount + discount,
            // carRent: acc.carRent + carRent,
            totalSaleWithRent: acc.totalSaleWithRent + cash + due, // carRent,
            cash: acc.cash + cash, //+carRent,
            due: acc.due + due,
        };
    }, {
        totalSale: 0,
        discount: 0,
        // carRent: 0,
        totalSaleWithRent: 0,
        cash: 0,
        due: 0,
    });
};
const calculateClassWiseReport = (challans) => {
    const classMap = new Map();
    challans.forEach((challan) => {
        const classNames = new Set();
        challan.items.forEach((item) => {
            const className = item.class;
            const quantity = Number(item.quantity ?? 0);
            const price = Number(item.price ?? 0);
            if (!classMap.has(className)) {
                classMap.set(className, {
                    class: className,
                    totalChallan: 0,
                    totalQuantity: 0,
                    totalPrice: 0,
                });
            }
            const report = classMap.get(className);
            report.totalQuantity += quantity;
            report.totalPrice += price;
            classNames.add(className);
        });
        // একই challan-এ class যতবারই থাকুক,
        // ওই class-এর challan count একবারই হবে
        classNames.forEach((className) => {
            const report = classMap.get(className);
            report.totalChallan += 1;
        });
    });
    return Array.from(classMap.values());
};
const calculatePaymentReport = (payments) => {
    const ledgerMap = new Map();
    payments.forEach((item) => {
        const ledgerName = item.ledger.name;
        const totalBill = Number(item.totalBill ?? 0);
        const cutting = Number(item.cutting ?? 0);
        const payment = Number(item.payment ?? 0);
        const amount = totalBill - cutting;
        const existing = ledgerMap.get(ledgerName);
        if (existing) {
            existing.amount += amount;
            existing.paymentGiven += payment;
        }
        else {
            ledgerMap.set(ledgerName, {
                ledger: ledgerName,
                amount,
                paymentGiven: payment,
            });
        }
    });
    return Array.from(ledgerMap.values());
};
exports.ReportUtils = {
    calculateDashboardReport,
    calculateClassWiseReport,
    calculatePaymentReport,
};
