"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeLinkService = void 0;
const prisma_1 = require("../../../../helpers/prisma");
const createYoutubeLinkService = async (payload) => {
    const result = await prisma_1.prisma.youtubeLink.create({
        data: payload,
    });
    return result;
};
const getAllYoutubeLinksService = async () => {
    const result = await prisma_1.prisma.youtubeLink.findMany({});
    return result;
};
const deleteYoutubeLinkService = async (id) => {
    const result = await prisma_1.prisma.youtubeLink.delete({
        where: {
            id,
        },
    });
    return result;
};
exports.YoutubeLinkService = {
    createYoutubeLinkService,
    getAllYoutubeLinksService,
    deleteYoutubeLinkService,
};
