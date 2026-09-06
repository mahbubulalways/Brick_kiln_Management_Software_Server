export const toBanglaNumber = (value: string | number): string => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return String(value).replace(/\d/g, (digit) => {
    return banglaDigits[Number(digit)];
  });
};