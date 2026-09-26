import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";

const getAlApprovalService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total] = await Promise.all([
    prisma.approvalRequest.findMany({
      where: { vataId: user.vataId, isDeleted: false },
      skip,
      take: limit,
    }),
    prisma.approvalRequest.count({
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

export const ApprovalService = {
  getAlApprovalService,
};
