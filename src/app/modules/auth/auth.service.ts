import { StatusCodes } from "http-status-codes";
import { IAuth, TResetPasswordPayload } from "./auth.interface";
import { Config } from "../../../config";
import { AppError } from "../../errors/ApplicationError";
import { bcryptHelper } from "../../../helpers/bcryptHelper";
import { jwtHelper } from "./auth.utils";
import { prisma } from "../../../helpers/prisma";
import { UserService } from "../user/user.service";
import { TAuthUser } from "../../../interface/token";
import { UserRole, VataStatus } from "../../../generated/prisma/enums";
import {
  checkLoginLimit,
  createLoginHistory,
  recordFailedLoginAttempt,
  resetLoginLimit,
} from "./auth.extra";
import { sendMail } from "../../../utils/sendMail";
import { getRecoveryEmailTemplate } from "../../../templete/passwordRecovery";
import generateRecoveryCode from "./auth.recovery";

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

const loginUserToSystemService = async (payload: IAuth) => {
  // 1. Find user
  const user = await prisma.user.findUnique({
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
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
    );
  }

  // 2. Check vata status
  if (
    user.role !== UserRole.SUPER_ADMIN &&
    user.role !== UserRole.SYSTEM_ADMIN &&
    user.vata?.status !== VataStatus.ACTIVE
  ) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "আপনার ভাটা অ্যাকাউন্টটি বর্তমানে নিষ্ক্রিয় রয়েছে।",
    );
  }

  // 3. Check whether the user is blocked
  await checkLoginLimit(user.id);

  // 4. Validate password
  const isPasswordMatched = await bcryptHelper.comparePassword(
    payload.password,
    user.password,
  );

  // 5. Handle incorrect password
  if (!isPasswordMatched) {
    await createLoginHistory(user.id, payload, false);
    const { isBlocked } = await recordFailedLoginAttempt(user.id);
    if (isBlocked) {
      throw new AppError(
        StatusCodes.TOO_MANY_REQUESTS,
        "ভুল পাসওয়ার্ডের কারণে অ্যাকাউন্ট ২৪ ঘণ্টার জন্য ব্লক।",
      );
    }
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।",
    );
  }

  // 6. Reset failed attempts after successful password validation
  await resetLoginLimit(user.id);

  // 7. Save successful login history
  await createLoginHistory(user.id, payload, true);

  // 8. Prepare JWT payload
  const tokenInfo = {
    username: user.username,
    userId: user.id,
    role: user.role,
    vataId: user.vataId,
  };

  // 9. Generate access token
  const accessToken = await jwtHelper.generateToken(
    tokenInfo,
    Config.ACCESS_TOKEN_SECRET as string,
    "7D",
  );

  // 10. Generate refresh token
  const refreshToken = await jwtHelper.generateToken(
    tokenInfo,
    Config.REFRESH_TOKEN_SECRET as string,
    "30D",
  );

  // 11. Return tokens
  return {
    accessToken,
    refreshToken,
  };
};

const logoutUserService = async (
  userAuth: TAuthUser,
  payload: {
    device: string;
    browser: string;
    ip: string;
  },
) => {
  const user = await prisma.user.findUnique({
    where: {
      username: userAuth.username,
      vataId: userAuth.vataId,
    },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
    );
  }

  if (user.role !== "SUPER_ADMIN" && user.role !== "SYSTEM_ADMIN") {
    await prisma.loginHistory.create({
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
const changePasswordServie = async (
  user: TAuthUser,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const mainUser = await prisma.user.findFirst({
    where: {
      username: user.username,
      vataId: user.vataId,
    },
  });

  if (!mainUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "ব্যবহারকারী খুঁজে পাওয়া যায়নি।");
  }

  const matchPassword = await bcryptHelper.comparePassword(
    payload.oldPassword,
    mainUser.password,
  );

  if (!matchPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, "পুরাতন পাসওয়ার্ড সঠিক নয়।");
  }

  const hashedPassword = await bcryptHelper.hashPassword(payload.newPassword);

  const result = await prisma.user.update({
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
const forgotPasswordService = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "আপনার অ্যাকাউন্ট খুঁজে পাওয়া যায়নি",
    );
  }

  if (!user.email) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "আপনার অ্যাকাউন্টে কোনো ইমেইল যুক্ত নেই",
    );
  }

  const { recoveryCode, expiryTime } = generateRecoveryCode();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      recoveryCode,
      expiryTime,
    },
  });

  const mail = await sendMail({
    html: getRecoveryEmailTemplate(user.name, recoveryCode, "2"),
    receiver: user.email,
    subject: "evatabd | পাসওয়ার্ড পুনরুদ্ধার কোড",
  });
  console.log(mail);
  return user;
};

const resendRecoveryCodeService = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "আপনার অ্যাকাউন্ট খুঁজে পাওয়া যায়নি",
    );
  }

  const { recoveryCode, expiryTime } = generateRecoveryCode();
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      recoveryCode,
      expiryTime,
    },
  });

  await sendMail({
    html: getRecoveryEmailTemplate(user.name, recoveryCode, "2"),
    receiver: user?.email!,
    subject: "evatabd | পাসওয়ার্ড পুনরুদ্ধার কোড",
  });

  return user;
};

const verifyRecoveryCodeService = async (
  email: string,
  recoveryCode: string,
) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "আপনার অ্যাকাউন্ট খুঁজে পাওয়া যায়নি",
    );
  }

  if (!user.recoveryCode || !user.expiryTime) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "কোনো সক্রিয় কোড পাওয়া যায়নি",
    );
  }

  if (user.recoveryCode !== recoveryCode) {
    throw new AppError(StatusCodes.BAD_REQUEST, "ভুল ভেরিফিকেশন কোড");
  }

  if (new Date() > user.expiryTime) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "কোডের মেয়াদ শেষ হয়েছে। নতুন কোড নিন",
    );
  }

  return {
    message: "ভেরিফিকেশন সফল হয়েছে",
    verified: true,
  };
};

// RESET PASSWORD
const resetPasswordService = async (payload: TResetPasswordPayload) => {
  const user = await prisma.user.findFirst({
    where: {
      email: payload.email.trim().toLowerCase(),
    },
  });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "ইমেইল সঠিক নয়।");
  }

  if (payload.newPassword.length < 8) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
    );
  }

  if (payload.newPassword !== payload.confirmPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, "দুইটি পাসওয়ার্ড মিলছে না।");
  }

  const hashedPassword = await bcryptHelper.hashPassword(payload.newPassword);
  return await prisma.user.update({
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

export const AuthService = {
  loginUserToSystemService,
  logoutUserService,
  changePasswordServie,
  forgotPasswordService,
  resendRecoveryCodeService,
  verifyRecoveryCodeService,
  resetPasswordService,
};
