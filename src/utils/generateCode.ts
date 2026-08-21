export const generateCode = (
    count: number
): string => {
    return `${String(count).padStart(3, "0")}`;
};