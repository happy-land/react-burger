export const getFormattedOrderNumber = (orderNumber: string | number) => {
  if (!orderNumber) return null;
  const maxDigits = 6;
  let zerosToAdd = maxDigits - getLength(Number(orderNumber));
  let zeroString = '';
  for (let i = 0; i < zerosToAdd; i++) {
    zeroString += '0';
  }
  return zeroString + orderNumber.toString();
};

const getLength = (number: number) => {
  return number.toString().length;
};
