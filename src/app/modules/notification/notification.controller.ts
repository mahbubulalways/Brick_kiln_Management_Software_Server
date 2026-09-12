import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { parseListQuery } from "../../../utils/parseListQuery";
import { sendResponse } from "../../../utils/sendResponse";
import { NotificationService } from "./notification.service";

const getAllNotification = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const seasonId = req.seasonId;
  const { limit, page } = await parseListQuery(req.query);
  const result = await NotificationService.getAllNotification(user, seasonId, {
    limit,
    page,
  });

  if (result.data.length > 0) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "নোটিফিকেশন সফলভাবে পাওয়া গেছে",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "কোনো নোটিফিকেশন পাওয়া যায়নি",
      data: [],
    });
  }
});

const getUnreadNotificationsNumber = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const seasonId = req.seasonId;
  const result = await NotificationService.getUnreadNotificationsNumber(
    user,
    seasonId,
  );

  if (result > 0) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "অপঠিত নোটিফিকেশনের সংখ্যা পাওয়া গেছে",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "কোনো অপঠিত নোটিফিকেশন নেই",
      data: 0,
    });
  }
});

const updateNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user as TAuthUser;

  const result = await NotificationService.updateNotification(user, id);

  if (result) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.isRead
        ? "নোটিফিকেশন পড়া হয়েছে"
        : "নোটিফিকেশন অপঠিত করা হয়েছে",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "নোটিফিকেশন পাওয়া যায়নি",
      data: [],
    });
  }
});

export const NotificationController = {
  getAllNotification,
  updateNotification,
  getUnreadNotificationsNumber,
};
