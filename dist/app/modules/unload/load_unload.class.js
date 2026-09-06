"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadUnloadTotal = void 0;
const prisma_1 = require("../../../helpers/prisma");
class LoadUnloadTotal {
    loadId;
    loads = [];
    unloads = [];
    constructor(loadId) {
        this.loadId = loadId;
    }
    async init() {
        const load = await prisma_1.prisma.loadInfo.findUnique({
            where: {
                id: this.loadId,
            },
            select: {
                quantity: true,
                loadType: true,
            },
        });
        if (load) {
            this.loads = [load];
        }
        this.unloads = await prisma_1.prisma.unload.findMany({
            where: {
                isDeleted: false,
            },
            select: {
                type: true,
                items: {
                    select: {
                        quantity: true,
                    },
                },
            },
        });
        return this;
    }
    getTotalLoad(type) {
        return this.loads
            .filter((load) => load.loadType === type)
            .reduce((sum, load) => sum + load.quantity, 0);
    }
    getTotalUnload(type) {
        return this.unloads
            .filter((unload) => unload.type === type)
            .reduce((sum, unload) => sum +
            unload.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    }
}
exports.LoadUnloadTotal = LoadUnloadTotal;
