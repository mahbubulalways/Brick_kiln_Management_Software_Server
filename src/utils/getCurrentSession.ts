export const getCurrentSession = (): string => {
    const currentYear = new Date().getFullYear();

    const startYear = currentYear % 100;
    const endYear = (currentYear + 1) % 100;

    return `${startYear.toString().padStart(2, "0")}-${endYear
        .toString()
        .padStart(2, "0")}`;
};