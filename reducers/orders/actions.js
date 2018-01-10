export const UPDATE_ORDERS = 'UPDATE_ORDERS';
export const updateOrders = (orders) => {
    return {
        type: UPDATE_ORDERS,
        load: orders
    }
};