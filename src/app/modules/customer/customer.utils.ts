import { Prisma } from "../../../generated/prisma/client";

type CustomerWithDetails = Prisma.CustomerGetPayload<{
  include: {
    dueCollections: true,
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
    const totalAmount = customer.challans.reduce(
      (total, challan) => total + Number(challan.totalPrice),
      0
    );

    // মোট payment
    const totalPaid = customer.challans.reduce(
      (total, challan) => total + Number(challan.cash),
      0
    ) + totalDueCollection;

    // টাকা বাকি
    const totalDue = totalAmount - totalPaid;

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

      note: customer.note || customer.challans[0]?.note || null,

      nextPaymentDate: customer.nextPaymentDate,
    };
  });
};