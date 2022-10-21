export const ORDER_MODAL_OPEN = 'ORDER_MODAL_OPEN';
export const ORDER_MODAL_CLOSE = 'ORDER_MODAL_CLOSE';

export const openOrderModal = (orderNumber) => ({
  type: ORDER_MODAL_OPEN,
  payload: orderNumber,
})

export const closeOrderModal = () => ({
  type: ORDER_MODAL_CLOSE,
})