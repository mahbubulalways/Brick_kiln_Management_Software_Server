import axios from "axios";

import { Config } from "../../config";

const MRAM_ERRORS: Record<string, string> = {
  "1002": "Sender ID বা Masking ID পাওয়া যায়নি",
  "1003": "SMS API পাওয়া যায়নি",
  "1004": "SMS Spam হিসেবে শনাক্ত হয়েছে",
  "1005": "MRAM সার্ভারে অভ্যন্তরীণ সমস্যা হয়েছে",
  "1006": "MRAM সার্ভারে অভ্যন্তরীণ সমস্যা হয়েছে",
  "1007": "SMS পাঠানোর জন্য পর্যাপ্ত ব্যালেন্স নেই",
  "1008": "SMS message খালি",
  "1009": "Message type সেট করা হয়নি",
  "1010": "API Key অথবা Password সঠিক নয়",
  "1011": "User ID সঠিক নয়",
  "1012": "মোবাইল নম্বর সঠিক নয়",
  "1013": "SMS API limit অতিক্রম করেছে",
  "1014": "SMS template পাওয়া যায়নি",
  "1015": "SMS content validation failed",
  "1016": "এই IP address থেকে API ব্যবহার অনুমোদিত নয়",
  "1019": "SMS Purpose দেওয়া হয়নি",
};

const MRAM_ERROR_CODES = [
  1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014,
  1015, 1016, 1019,
];

const getMramErrorMessage = (error: any): string => {
  const responseData = error?.response?.data;

  const errorCode =
    typeof responseData === "string"
      ? responseData.match(/\d{4}/)?.[0]
      : responseData?.code?.toString();

  if (errorCode && MRAM_ERRORS[errorCode]) {
    return MRAM_ERRORS[errorCode];
  }

  return responseData?.message || error?.message || "SMS পাঠানো সম্ভব হয়নি";
};

const formatBangladeshPhoneNumbers = (phones: string[]): string => {
  return phones
    .map((phone) => {
      let number = phone.replace(/\s+/g, "");

      if (number.startsWith("+88")) {
        number = number.slice(1);
      }

      if (number.startsWith("01")) {
        number = `88${number}`;
      }

      return number;
    })
    .join("+");
};

export const sendSmsToPhoneNumbers = async (
  phoneNumber: string[],
  message: string,
) => {
  if (!phoneNumber || !message) {
    return null;
  }

  const contract = formatBangladeshPhoneNumbers(phoneNumber);
  try {
    const response = await axios.get(Config.MRAM_BASE_URL!, {
      params: {
        api_key: Config.MRAM_API_KEY,
        type: "unicode",
        contacts: contract,
        senderid: Config.MRAM_SENDER_ID,
        msg: message,
      },
    });
    if (MRAM_ERROR_CODES.includes(Number(response.data))) {
      return null;
    }
    return response;
  } catch (error: any) {
    console.error("MRAM SMS Error:", getMramErrorMessage(error));

    return null;
  }
};
