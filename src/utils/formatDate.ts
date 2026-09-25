export const formatDate = (date: Date | string | null) => {
  if (date) {
    return new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date!));
  } else {
    return null;
  }
};
