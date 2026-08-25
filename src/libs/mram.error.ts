export const MRAM_ERROR_CODES: Record<number, string> = {
  1002: "Sender Id/Masking Not Found",
  1003: "API Not Found",
  1004: "SPAM Detected",
  1005: "Internal Error",
  1006: "Internal Error",
  1007: "Balance Insufficient",
  1008: "Message is empty",
  1009: "Message Type Not Set (text/unicode)",
  1010: "Invalid User & Password",
  1011: "Invalid User Id",
  1012: "Invalid Number",
  1013: "API limit error",
  1014: "No matching template",
  1015: "SMS Content Validation Fails",
  1016: "IP address not allowed",
  1019: "Sms Purpose Missing",
};

export interface MramError {
  code: number;
  message: string;
}

/**
 * Resolve MRAM error code from any response.
 */
export const resolveMramError = (
  rawResponse: unknown
): MramError | null => {
  let text = "";

  if (typeof rawResponse === "string") {
    text = rawResponse;
  } else {
    try {
      text = JSON.stringify(rawResponse);
    } catch {
      return null;
    }
  }

  // Match known MRAM error codes only
  const match = text.match(/\b(1002|1003|1004|1005|1006|1007|1008|1009|1010|1011|1012|1013|1014|1015|1016|1019)\b/);

  if (!match) {
    return null;
  }

  const code = Number(match[1]);
  const message = MRAM_ERROR_CODES[code];

  if (!message) {
    return null;
  }

  return {
    code,
    message,
  };
};