export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const updateProducts = (products) => {
    return {
        type: UPDATE_PRODUCTS,
        load: products
    }
};