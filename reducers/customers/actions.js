export const UPDATE_CUSTOMERS = 'UPDATE_CUSTOMERS';
export const updateCustomers = (customers) => {
    return {
        type: UPDATE_CUSTOMERS,
        load: customers
    }
};