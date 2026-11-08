"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../../config");
const ApplicationError_1 = require("../../errors/ApplicationError");
const bcryptHelper_1 = require("../../../helpers/bcryptHelper");
const auth_utils_1 = require("./auth.utils");
const prisma_1 = require("../../../helpers/prisma");
const enums_1 = require("../../../generated/prisma/enums");
const auth_extra_1 = require("./auth.extra");
const sendMail_1 = require("../../../utils/sendMail");
const passwordRecovery_1 = require("../../../templete/passwordRecovery");
const auth_recovery_1 = __importDefault(require("./auth.recovery"));
// const loginUserToSystemService = async (payload: IAuth) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       username: payload.username,
//     },
//     include: {
//       vata: {
//         select: {
//           status: true,
//         },
//       },
//     },
//   });
//   // const u = await UserService.createUserServie(userData)
//   // User not found
//   if (!user) {
//     throw new AppError(
//       StatusCodes.NOT_FOUND,
//       "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
//     );
//   }
//   if (
//     user.role !== UserRole.SUPER_ADMIN &&
//     user.role !== UserRole.SYSTEM_ADMIN &&
//     user.vata?.status !== VataStatus.ACTIVE
//   ) {
//     throw new AppError(
//       StatusCodes.FORBIDDEN,
//       "আপনার ভাটা অ্যাকাউন্টটি বর্তমানে নিষ্ক্রিয় রয়েছে।",
//     );
//   }
//   // Password validation
//   const isPasswordMatched = await bcryptHelper.comparePassword(
//     payload.password,
//     user.password,
//   );
//   if (!isPasswordMatched) {
//     await prisma.loginHistory.create({
//       data: {
//         type: "Login",
//         device: payload.extra?.device || "Unknown",
//         browser: payload.extra?.browser || "Unknown",
//         ipAddress: payload.ip || "Unknown",
//         userId: user.id,
//         status: false,
//       },
//     });
//     await prisma.loginLimit.
//     throw new AppError(
//       StatusCodes.UNAUTHORIZED,
//       "ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।",
//     );
//   }
//   // Login history
//   await prisma.loginHistory.create({
//     data: {
//       type: "Login",
//       device: payload.extra?.device || "Unknown",
//       browser: payload.extra?.browser || "Unknown",
//       ipAddress: payload.ip || "Unknown",
//       userId: user.id,
//       status: true,
//     },
//   });
//   // JWT payload
//   const tokenInfo = {
//     username: user.username,
//     userId: user.id,
//     role: user.role,
//     vataId: user.vataId,
//   };
//   // Access token
//   const accessToken = await jwtHelper.generateToken(
//     tokenInfo,
//     Config.ACCESS_TOKEN_SECRET as string,
//     "7D",
//   );
//   // Refresh token
//   const refreshToken = await jwtHelper.generateToken(
//     tokenInfo,
//     Config.REFRESH_TOKEN_SECRET as string,
//     "30D",
//   );
//   return {
//     accessToken,
//     refreshToken,
//   };
// };
// LOGOUT
const loginUserToSystemService = async (payload) => {
    // 1. Find user
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            username: payload.username,
        },
        include: {
            vata: {
                select: {
                    status: true,
                },
            },
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।");
    }
    // 2. Check vata status
    if (user.role !== enums_1.UserRole.SUPER_ADMIN &&
        user.role !== enums_1.UserRole.SYSTEM_ADMIN &&
        user.vata?.status !== enums_1.VataStatus.ACTIVE) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "আপনার ভাটা অ্যাকাউন্টটি বর্তমানে নিষ্ক্রিয় রয়েছে।");
    }
    // 3. Check whether the user is blocked
    await (0, auth_extra_1.checkLoginLimit)(user.id);
    // 4. Validate password
    const isPasswordMatched = await bcryptHelper_1.bcryptHelper.comparePassword(payload.password, user.password);
    // 5. Handle incorrect password
    if (!isPasswordMatched) {
        await (0, auth_extra_1.createLoginHistory)(user.id, payload, false);
        const { isBlocked } = await (0, auth_extra_1.recordFailedLoginAttempt)(user.id);
        if (isBlocked) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS, "ভুল পাসওয়ার্ডের কারণে অ্যাকাউন্ট ২৪ ঘণ্টার জন্য ব্লক।");
        }
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।");
    }
    // 6. Reset failed attempts after successful password validation
    await (0, auth_extra_1.resetLoginLimit)(user.id);
    // 7. Save successful login history
    await (0, auth_extra_1.createLoginHistory)(user.id, payload, true);
    // 8. Prepare JWT payload
    const tokenInfo = {
        username: user.username,
        userId: user.id,
        role: user.role,
        vataId: user.vataId,
    };
    // 9. Generate access token
    const accessToken = await auth_utils_1.jwtHelper.generateToken(tokenInfo, config_1.Config.ACCESS_TOKEN_SECRET, "7D");
    // 10. Generate refresh token
    const refreshToken = await auth_utils_1.jwtHelper.generateToken(tokenInfo, config_1.Config.REFRESH_TOKEN_SECRET, "30D");
    // 11. Return tokens
    return {
        accessToken,
        refreshToken,
    };
};
const logoutUserService = async (userAuth, payload) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            username: userAuth.username,
            vataId: userAuth.vataId,
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।");
    }
    if (user.role !== "SUPER_ADMIN" && user.role !== "SYSTEM_ADMIN") {
        await prisma_1.prisma.loginHistory.create({
            data: {
                type: "Logout",
                device: payload?.device || "Unknown",
                browser: payload?.browser || "Unknown",
                ipAddress: payload?.ip || "Unknown",
                userId: user.id,
            },
        });
    }
    return {
        id: user.id,
    };
};
// CHANGE PASSWORD
const changePasswordServie = async (user, payload) => {
    const mainUser = await prisma_1.prisma.user.findFirst({
        where: {
            username: user.username,
            vataId: user.vataId,
        },
    });
    if (!mainUser) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ব্যবহারকারী খুঁজে পাওয়া যায়নি।");
    }
    const matchPassword = await bcryptHelper_1.bcryptHelper.comparePassword(payload.oldPassword, mainUser.password);
    if (!matchPassword) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "পুরাতন পাসওয়ার্ড সঠিক নয়।");
    }
    const hashedPassword = await bcryptHelper_1.bcryptHelper.hashPassword(payload.newPassword);
    const result = await prisma_1.prisma.user.update({
        where: {
            id: mainUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return result;
};
// HERE PASSWORD RECOVERY
const forgotPasswordService = async (email) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "আপনার অ্যাকাউন্ট খুঁজে পাওয়া যায়নি");
    }
    if (!user.email) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপনার অ্যাকাউন্টে কোনো ইমেইল যুক্ত নেই");
    }
    const { recoveryCode, expiryTime } = (0, auth_recovery_1.default)();
    await prisma_1.prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            recoveryCode,
            expiryTime,
        },
    });
    const mail = await (0, sendMail_1.sendMail)({
        html: (0, passwordRecovery_1.getRecoveryEmailTemplate)(user.name, recoveryCode, "2"),
        receiver: user.email,
        subject: "evatabd | পাসওয়ার্ড পুনরুদ্ধার কোড",
    });
    console.log(mail);
    return user;
};
const resendRecoveryCodeService = async (email) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "আপনার অ্যাকাউন্ট খুঁজে পাওয়া যায়নি");
    }
    const { recoveryCode, expiryTime } = (0, auth_recovery_1.default)();
    await prisma_1.prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            recoveryCode,
            expiryTime,
        },
    });
    await (0, sendMail_1.sendMail)({
        html: (0, passwordRecovery_1.getRecoveryEmailTemplate)(user.name, recoveryCode, "2"),
        receiver: user?.email,
        subject: "evatabd | পাসওয়ার্ড পুনরুদ্ধার কোড",
    });
    return user;
};
const verifyRecoveryCodeService = async (email, recoveryCode) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "আপনার অ্যাকাউন্ট খুঁজে পাওয়া যায়নি");
    }
    if (!user.recoveryCode || !user.expiryTime) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "কোনো সক্রিয় কোড পাওয়া যায়নি");
    }
    if (user.recoveryCode !== recoveryCode) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ভুল ভেরিফিকেশন কোড");
    }
    if (new Date() > user.expiryTime) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "কোডের মেয়াদ শেষ হয়েছে। নতুন কোড নিন");
    }
    return {
        message: "ভেরিফিকেশন সফল হয়েছে",
        verified: true,
    };
};
// RESET PASSWORD
const resetPasswordService = async (payload) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            email: payload.email.trim().toLowerCase(),
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ইমেইল সঠিক নয়।");
    }
    if (payload.newPassword.length < 8) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    }
    if (payload.newPassword !== payload.confirmPassword) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "দুইটি পাসওয়ার্ড মিলছে না।");
    }
    const hashedPassword = await bcryptHelper_1.bcryptHelper.hashPassword(payload.newPassword);
    return await prisma_1.prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
            recoveryCode: null,
            expiryTime: null,
        },
    });
};
exports.AuthService = {
    loginUserToSystemService,
    logoutUserService,
    changePasswordServie,
    forgotPasswordService,
    resendRecoveryCodeService,
    verifyRecoveryCodeService,
    resetPasswordService,
};
