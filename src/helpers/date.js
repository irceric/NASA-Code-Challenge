export const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const formatDate = (dateObj) => {
  let month = '' + (dateObj.getMonth() + 1),
    day = '' + dateObj.getDate(),
    year = dateObj.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};
