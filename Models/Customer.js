export default Customer = {
    getName: (customer) => {
        return customer._data.name;
    },
    getEmail: (customer) => {
        return customer._data.email;
    },
    getPhone: (customer) => {
        return customer._data.phone;
    },
    getId: (customer) => {
        return customer._ref._documentPath._parts[1]
    }
}