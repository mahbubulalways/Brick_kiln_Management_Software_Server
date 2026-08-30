import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { InvoiceService } from "./challan.service";
import { sendResponse } from "../../../utils/sendResponse";
import { prisma } from "../../../helpers/prisma";
import { parseListQuery } from "../../../utils/parseListQuery";
import { TAuthUser } from "../../../interface/token";


// GET INVOICE SERIAL
const getInvoiceSerial = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result =
    (await prisma.challan.count({
      where: {
        vataId: user.vataId,
      },
    })) + 1;

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "ইনভয়েস সিরিয়াল তৈরি করা যায়নি।"
    );
  }

  sendResponse(res, {
    message: "ইনভয়েস সিরিয়াল সফলভাবে তৈরি হয়েছে।",
    statusCode: StatusCodes.OK,
    success: true,
    data: {
      invoiceSerial: result,
    },
  });
});

// CREATE CUSTOMER AND INVOICE AND INVOICE ITEMS
const createInvoiceController = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user as TAuthUser
  const seasonId = req.seasonId

  const result = await InvoiceService.createInvoiceService(
    user,
    seasonId,
    body.customer,
    body.invoiceItems.items,
    body.invoice
  );
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "চ্যালান তৈরি করতে ব্যর্থ হয়েছে।"
    );
  } else {
    sendResponse(res, {
      message: "চ্যালান সফলভাবে তৈরি হয়েছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }

});

// SEARCH FOR DELIVERY
const searchChallanForDeliveryController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const { search } = await parseListQuery(req.query);
  const result = await InvoiceService.searchChallanForDeliveryService(
    user,
    { search },
  );

  if (!result) {
    return sendResponse(res, {
      message: "কোনো চ্যালান পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  }

  else {
    return sendResponse(res, {
      message: "চ্যালান সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET AL INVOICE WITH CUSTOMER NAME AND ADDRESS
const getAllInvoiceController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const seasonId = req.seasonId
  const { limit, page, search, date } = await parseListQuery(req.query);
  const result = await InvoiceService.getAllInvoiceService(
    user,
    seasonId,
    { limit, page, search, date });
  if (!result?.data.length) {
    sendResponse(res, {
      message: "চ্যালান পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });

  }
  else {
    sendResponse(res, {
      message: "চ্যালান সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET ADVANVCE INVOICE
const getAllAdvanceInvoiceController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const seasonId = req.seasonId
  const { limit, page, search, date } = await parseListQuery(req.query);
  const result = await InvoiceService.getAllAdvanceInvoiceService(user, seasonId, {
    limit,
    page,
    search,
    date
  });
  if (!result?.data.length) {
    sendResponse(res, {
      message: "চ্যালান পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });

  }
  else {
    sendResponse(res, {
      message: "চ্যালান সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

//  GET SINGLE INVOICE
const getSingleInvoiceController = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const user = req.user as TAuthUser
  const result = await InvoiceService.getSingleInvoiceService(user, id);
  if (!result?.id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "চ্যালান পাওয়া যায়নি।");
  }
  else {
    sendResponse(res, {
      message: !result?.id
        ? "চ্যালান পাওয়া যায়নি।"
        : "চ্যালান সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

//  GET SINGLE INVOICE ITEMS
const getSingleInvoiceItemsController = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const query = req.query;
  const user = req.user as TAuthUser
  const result = await InvoiceService.getSingleInvoiceItemsService(
    user,
    id,
    query?.ids as string
  );
  if (!result?.length) {
    sendResponse(res, {
      message: "চ্যালান পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: {},
    });
  }
  else {
    sendResponse(res, {
      message: "চ্যালান সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// UPDATE INVOICE

const updateInvoiceController = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const body = req.body;
  const user = req.user as TAuthUser
  const result = await InvoiceService.updateInvoiceService(
    user,
    id,
    body.invoice,
    body.invoiceItems
  );
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "চ্যালান হালনাগাদ করতে ব্যর্থ হয়েছে।"
    );
  }

  else {
    sendResponse(res, {
      message: "চ্যালান সফলভাবে হালনাগাদ হয়েছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// DELETE INVOICE
const deleteInvoiceController = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const user = req.user as TAuthUser
  const result = await InvoiceService.deleteInvoiceService(user, id);
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "চ্যালান মুছে ফেলতে ব্যর্থ হয়েছে।"
    );
  } else {
    sendResponse(res, {
      message: "চ্যালান সফলভাবে মুছে ফেলা হয়েছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }


});

// GET ITEMS WITH INVOICE
const getItemsWithInvoiceController = catchAsync(async (req, res) => {
  const { search, date } = await parseListQuery(req.query);
  const user = req.user as TAuthUser
  const seasonId = req.seasonId
  const result = await InvoiceService.getItemsWithInvoiceService(
    user,
    seasonId,
    { date, search }
  );
  if (!result?.length) {
    throw new AppError(StatusCodes.BAD_REQUEST, "চ্যালান পাওয়া যায়নি।");
  } else {
    sendResponse(res, {
      message: " চ্যালান সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }


});

// CHANGE INVOICE DELIVERY DATE
const updateInvoiceDeliveryDateController = catchAsync(async (req, res) => {
  const id = req?.params.id;
  const updatedDate = req.body.updatedDate;
  const user = req.user as TAuthUser
  const result = await InvoiceService.updateInvoiceDeliveryDateService(
    user,
    id,
    updatedDate
  );
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "চ্যালান আপডেট করতে ব্যর্থ হয়েছে।"
    );
  } else {
    sendResponse(res, {
      message: " চ্যালান সফলভাবে আপডেট হয়েছে",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

// CHANGE INVOICE ITEM DELIVERY DATE
const updateInvoiceItemDeliveryDateController = catchAsync(async (req, res) => {
  const id = req?.params.id;
  const updatedDate = req.body.updatedDate;
  const user = req.user as TAuthUser
  const result = await InvoiceService.updateItemsDateService(
    user,
    id,
    updatedDate
  );
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "চ্যালান আপডেট করতে ব্যর্থ হয়েছে।"
    );
  }
  else {

    sendResponse(res, {
      message: " চ্যালান সফলভাবে আপডেট হয়েছে",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

export const InvoiceController = {
  createInvoiceController,
  getInvoiceSerial,
  getAllInvoiceController,
  getSingleInvoiceController,
  updateInvoiceController,
  deleteInvoiceController,
  getItemsWithInvoiceController,
  getSingleInvoiceItemsController,
  updateInvoiceDeliveryDateController,
  updateInvoiceItemDeliveryDateController,
  getAllAdvanceInvoiceController,
  searchChallanForDeliveryController
};
