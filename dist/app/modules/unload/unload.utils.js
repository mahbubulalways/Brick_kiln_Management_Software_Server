"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextStepOfUnload = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const getNextStepOfUnload = (loadType) => {
    switch (loadType) {
        case "RAWENTRY":
            return "RAW_TO_FIELD"; // NEW KACHA IT TO FIELD
        case "FIELD_TO_CHULLI":
            return enums_1.UnloadType.FIELD_TO_CHULLI; // FIELD THEKE CHULLI
        case "STOCK_TO_CHULLI":
            return enums_1.UnloadType.STOCK_TO_CHULLI; // STOCK THEKE CHULLI TE JABE
        case "CHULLI_TO_FINISHED":
            return enums_1.UnloadType.CHULLI_TO_FINISHED; // CHULLI THEKE PAKA IT BER HOYE MAIN STOCK A JOMA HBE
        case "FIELD_TO_STOCK":
            return enums_1.UnloadType.FIELD_TO_STOCK; // FIELD ER IT SOCK A JOMA HBE
    }
};
exports.getNextStepOfUnload = getNextStepOfUnload;
// 
