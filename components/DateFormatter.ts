export const DateFormatter = (date: string) => {
  const dateArray = date.split(" ");

  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
};
