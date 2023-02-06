export const DateFormatter = (date: string | Date) => {
  let dateString = date;

  if (typeof date !== "string") {
    dateString = date.toString();
  }

  if (typeof dateString === "string") {
    const dateArray = dateString.split(" ");

    return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
  }
};
