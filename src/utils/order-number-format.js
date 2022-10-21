export const getFormattedOrderNumber = (orderNumber) => {
  if (!orderNumber) return null;
  const maxDigits = 6;
  let zerosToAdd = maxDigits - getLength(orderNumber);
  let zeroString = '';
  for (let i = 0; i < zerosToAdd; i++) {
    zeroString += '0';
  }
  return zeroString + orderNumber.toString();
};

const getLength = (number) => {
  return number.toString().length;
};
