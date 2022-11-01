const formatDay = (day: number, orderDate: Date) => {
  if (day === 0) {
    return 'Сегодня';
  }
  if (day === 1) {
    return 'Вчера';
  }
  if (day > 1 && day < 4) {
    return `${day} дня назад`;
  }
  return orderDate.toLocaleDateString('ru-RU');
};

export const formatDate = (date: string) => {
  const orderDate = new Date(date);
  const diff = new Date().getDate() - orderDate.getDate();
  const diffInDays = formatDay(diff, orderDate);
  const hours =
    orderDate.getHours() > 9 ? `${orderDate.getHours()}` : `0${orderDate.getHours()}`;
  const minutes =
    orderDate.getMinutes() > 9
      ? `${orderDate.getMinutes()}`
      : `0${orderDate.getMinutes()}`;
  return `${diffInDays}, ${hours}:${minutes} i-GMT+${
    -orderDate.getTimezoneOffset() / 60
  }`;
};
