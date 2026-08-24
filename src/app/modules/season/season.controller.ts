import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../helpers/prisma";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";

const getAllSeasons = catchAsync(async (req, res) => {
    const result = await prisma.season.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            startDate: "asc",
        },
    });

    if (!result.length) {
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "কোনো সিজন পাওয়া যায়নি",
            data: [],
        });
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "সকল সিজন সফলভাবে পাওয়া গেছে",
        data: result,
    });
});



const getActiveSeason = catchAsync(async (req, res) => {
    const result = await prisma.season.findFirst({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            name: true,
        },
    });

    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "কোনো সক্রিয় সিজন পাওয়া যায়নি",)
    }
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "সক্রিয় সিজন সফলভাবে পাওয়া গেছে",
        data: result,
    });
});

const changeActiveSeason = catchAsync(async (req, res) => {
  const { id } = req.params;

  const season = await prisma.season.findUnique({
    where: {
      id,
    },
  });

  if (!season) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "সিজন পাওয়া যায়নি",
      data: [],
    });
  }

  await prisma.$transaction([
    prisma.season.updateMany({
      data: {
        isActive: false,
      },
    }),

    prisma.season.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    }),
  ]);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "সিজন সফলভাবে পরিবর্তন করা হয়েছে",
  });
});


export const SeasonController = {
    getActiveSeason,
    getAllSeasons,
    changeActiveSeason
}