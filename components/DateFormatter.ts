export const DateFormatter = (date: string) => {
  const monthData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.slice(0, 4);
  const month = monthData[parseInt(date.slice(5, 7)) - 1];
  const day = date.slice(8, 10);

  return `${month} ${day}, ${year}`;
};
