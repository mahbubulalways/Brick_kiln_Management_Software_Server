import axios from "axios";

const API_KEY = process.env.MRAM_API_KEY;
const SENDER_ID = process.env.MRAM_SENDER_ID;

const MRAM_API_URL = "https://msg.mram.com.bd/smsapimany";

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

const formatBangladeshPhoneNumber = (phone: string): string => {
  let number = phone.replace(/\s+/g, "");

  // +8801407128177 -> 8801407128177
  if (number.startsWith("+88")) {
    number = number.slice(1);
  }

  // 01407128177 -> 8801407128177
  if (number.startsWith("01")) {
    number = `88${number}`;
  }

  return number;
};

export const sendSmsToPhoneNumbers = async (
  phoneNumbers: string[],
  message: string,
) => {
  if (!API_KEY) {
    throw new Error("MRAM API Key সেট করা হয়নি");
  }

  if (!SENDER_ID) {
    throw new Error("MRAM Sender ID সেট করা হয়নি");
  }

  if (!phoneNumbers.length) {
    throw new Error("মোবাইল নম্বর প্রয়োজন");
  }

  if (!message.trim()) {
    throw new Error("SMS message প্রয়োজন");
  }

  const messages = phoneNumbers.map((phone) => ({
    number: formatBangladeshPhoneNumber(phone),
    message: message.trim(),
  }));

  console.log(messages);

  //   {
  //   type : "post",
  //   url : "https://msg.mram.com.bd/smsapi",
  //   data : {
  //     "api_key" : "{your api key}",
  //     "senderid" : "{sender id}",
  //     "type" : "{content type}",
  //     "scheduledDateTime" : "{schedule date time}",
  //     "msg" : "{your message}",
  //     "contacts" : "88017xxxxxxxx+88018xxxxxxxx"
  //   }
  // }
  try {
    const response = await fetch("https://msg.mram.com.bd/smsapi", {
      method: "POST",
      body: JSON.stringify({
        api_key: API_KEY,
        senderid: SENDER_ID,
        msg: "Hello",
        contacts: "8801407128177",
      }),
      headers: {
        "content-type": "text",
      },
    });

    console.log(await response.json());
  } catch (error: any) {
    console.error("MRAM SMS Error:", error?.response?.data || error?.message);

    throw new Error(getMramErrorMessage(error));
  }
};
