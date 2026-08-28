import { Prisma } from "../../../generated/prisma/client";

type CustomerWithDetails = Prisma.CustomerGetPayload<{
  include: {
    dueCollections: {
      where: {
        isDeleted: false,
      },
      select: {
        collect: true,
      },
      orderBy: { createdAt: "desc" }
    },
    customerDues: {
      select: {
        dueAmount: true,
        paidAmount: true,
        totalAmount: true,
      },
      orderBy: { createdAt: "desc" }
    }
    challans: {
      include: {
        items: true;
        deliveries: true;
      };
    };

  };
}>;

export const formatCustomerData = (
  customers: CustomerWithDetails[]
) => {
  return customers.map((customer) => {
    // মোট কেনা quantity
    const totalPurchasedQuantity = customer.challans.reduce(
      (challanTotal, challan) => {
        return (
          challanTotal +
          challan.items.reduce(
            (itemTotal, item) => itemTotal + item.quantity,
            0
          )
        );
      },
      0
    );

    // মোট delivered quantity
    const totalDeliveredQuantity = customer.challans.reduce(
      (challanTotal, challan) => {
        return (
          challanTotal +
          challan.deliveries.reduce(
            (deliveryTotal, delivery) =>
              deliveryTotal + delivery.deliveryReceived,
            0
          )
        );
      },
      0
    );

    // Due collections
    const totalDueCollection = customer.dueCollections.reduce((totalDueCollect, due) => {
      return (
        totalDueCollect + due.collect
      )
    }, 0)

    // মোট বাকি quantity
    const totalRemainingQuantity =
      totalPurchasedQuantity - totalDeliveredQuantity;

    // মোট বিল
    const totalAmount = customer.customerDues.reduce(
      (total, due) => total + Number(due.totalAmount),
      0
    );

    // মোট payment
    const totalPaid = customer.customerDues.reduce(
      (total, due) => total + Number(due.paidAmount),
      0
    ) + totalDueCollection;

    // টাকা বাকি
    const totalDue = totalAmount - totalPaid;


    // DUE PAYMENT DATE

    const nexnextPaymentDate = customer.nextPaymentDate

    return {
      id: customer.id,
      name: customer.name,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      customerCode: customer.customerCode,
      totalPurchasedQuantity,
      totalDeliveredQuantity,
      totalRemainingQuantity,
      totalAmount,
      totalPaid,
      totalDue,
      note: customer.note ,

      nextPaymentDate: nexnextPaymentDate,
    };
  });
};


// SECOND DUE + CURRENT 

type PreviousDue = Prisma.CustomerDueGetPayload<{
  select: {
    customerId: true;
    dueAmount: true;
  };
}>;

type PreviousCollection = Prisma.Due_CollectionGetPayload<{
  select: {
    customerId: true;
    collect: true;
  };
}>;

// SECOND OLD DUE + CURRENT
export const formatCustomerDataWithPrevDue = (
  customers: CustomerWithDetails[],
  previousDues: PreviousDue[],
  previousCollections: PreviousCollection[]
) => {
  return customers.map((customer) => {
    // ==========================================
    // CURRENT SEASON PURCHASED
    // ==========================================

    const totalPurchasedQuantity = customer.challans.reduce(
      (challanTotal, challan) => {
        return (
          challanTotal +
          challan.items.reduce(
            (itemTotal, item) => itemTotal + item.quantity,
            0
          )
        );
      },
      0
    );

    // ==========================================
    // CURRENT SEASON DELIVERED
    // ==========================================

    const totalDeliveredQuantity = customer.challans.reduce(
      (challanTotal, challan) => {
        return (
          challanTotal +
          challan.deliveries.reduce(
            (deliveryTotal, delivery) =>
              deliveryTotal + delivery.deliveryReceived,
            0
          )
        );
      },
      0
    );

    // ==========================================
    // CURRENT SEASON COLLECTION
    // ==========================================

    const totalDueCollection = customer.dueCollections.reduce(
      (total, due) => total + Number(due.collect),
      0
    );

    // ==========================================
    // CURRENT SEASON AMOUNT
    // ==========================================

    const totalAmount = customer.customerDues.reduce(
      (total, due) => total + Number(due.totalAmount),
      0
    );

    const totalPaid =
      customer.customerDues.reduce(
        (total, due) => total + Number(due.paidAmount),
        0
      ) + totalDueCollection;

    // Current season due
    const currentSeasonDue = totalAmount - totalPaid;

    // ==========================================
    // PREVIOUS SEASON DUE
    // ==========================================

    const previousDue = previousDues
      .filter((due) => due.customerId === customer.id)
      .reduce(
        (total, due) => total + Number(due.dueAmount),
        0
      );

    // ==========================================
    // PREVIOUS SEASON COLLECTION
    // ==========================================

    const previousDueCollection = previousCollections
      .filter(
        (collection) =>
          collection.customerId === customer.id
      )
      .reduce(
        (total, collection) =>
          total + Number(collection.collect),
        0
      );

    // ==========================================
    // PREVIOUS REMAINING DUE
    // ==========================================

    const previousRemainingDue =
      previousDue - previousDueCollection;

    // ==========================================
    // TOTAL DUE
    // ==========================================

    const totalDue =
      currentSeasonDue + previousRemainingDue;

    // ==========================================
    // REMAINING QUANTITY
    // ==========================================

    const totalRemainingQuantity =
      totalPurchasedQuantity - totalDeliveredQuantity;

    return {
      id: customer.id,
      name: customer.name,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      customerCode: customer.customerCode,
      createdAt:customer.createdAt,

      totalPurchasedQuantity,
      totalDeliveredQuantity,
      totalRemainingQuantity,

      // Current season
      totalAmount,
      totalPaid,
      currentSeasonDue,

      // Previous seasons
      previousDue: previousRemainingDue,

      // Current + Previous
      totalDue,

      note: customer.note,
      nextPaymentDate: customer.nextPaymentDate,
    };
  });
};