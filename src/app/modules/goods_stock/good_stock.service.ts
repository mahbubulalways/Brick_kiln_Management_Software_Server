import { Request } from "express"
import { GoodsStock } from "../../../generated/prisma/client"
import { prisma } from "../../../helpers/prisma"
import { TAuthUser } from "../../../interface/token"
import { IUploadFile } from "../../../interface/multer"
import { TProductForm } from "./goods_stock.interface"

const createGoodStockService = async (req: Request) => {
    const user = req.user as TAuthUser
    const file = req?.file as IUploadFile || null;
    const body = JSON.parse(req.body.data) as TProductForm;
    const result = await prisma.goodsStock.create({
        data: {
            name: body.name,
            price: Number(body.price),
            quantity: Number(body.quantity),
            shop: body.shop,
            categoryId: body.categoryId,
            image: file?.filename || null,
            warranty: body.warranty || null,
            vataId: user.vataId,

        }
    })
    return result
}

// GET ALL MALAMAL
const getAllGoodStockService = async (user: TAuthUser) => {
    const result = await prisma.goodsStock.findMany({
        where: {
            vataId: user.vataId
        },
        include: {
            category: {
                select: {
                    name: true,
                }
            },
            _count: {
                select: {
                    goodsIssues: true,
                    goodsLosses: true
                }
            }
        }
    })

    return result
}


const getGoodStockOptionsService = async (user: TAuthUser) => {
    const result = await prisma.goodsStock.findMany({
        where: {
            vataId: user.vataId,
        },
        select: {
            name: true,
            id: true,
            quantity: true,
            _count: {
                select: {
                    goodsIssues: true,
                    goodsLosses: true,
                },
            },
        },
    });

    return result.map((item) => {
        const issueQuantity = item._count.goodsIssues;
        const lossQuantity = item._count.goodsLosses;
        const currentQuantity =
            Number(item.quantity) -
            issueQuantity -
            lossQuantity;
        return {
            id: item.id,
            name: item.name,
            currentQuantity: currentQuantity,
        };
    });
};

export const GoodStockService = {
    createGoodStockService,
    getAllGoodStockService,
    getGoodStockOptionsService
}