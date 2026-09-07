export const formatDate = (date: Date | string) =>
    new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));