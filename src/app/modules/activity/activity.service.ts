import { ActivityAction, ModuleType } from "../../../generated/prisma/enums";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { generateActivityDescription } from "../approval/approval.utils";

type TCreateActivity = {
  vataId: string;
  userId: string;
  action: ActivityAction;
  module: ModuleType;
  targetId: string;

  // EXTRA
  oldData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  referenceNumber?: number | string;
};

const createActivityService = async ({
  vataId,
  userId,
  action,
  module,
  targetId,
  newData,
  oldData,
  referenceNumber,
}: TCreateActivity) => {
  const description = generateActivityDescription(
    module,
    "UPDATE",
    oldData as Record<string, unknown>,
    newData as Record<string, unknown>,
    referenceNumber,
  );

  const result = await prisma.activityLog.create({
    data: {
      vataId,
      userId,
      action,
      module,
      targetId,
      description,
    },
  });

  return result;
};

// GET ALL ACTIVITY LOG
const getAllActivityLogService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total] = await Promise.all([
    prisma.activityLog.findMany({
      where: { vataId: user.vataId, isDeleted: false },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.activityLog.count({
      where: { vataId: user.vataId, isDeleted: false },
    }),
  ]);

  const meta = createMetaConfig({
    limit: limit,
    page: page,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};
export const ActivityService = {
  createActivityService,
  getAllActivityLogService,
};
