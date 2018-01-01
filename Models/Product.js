export default Product = {
    getName: (product) => {
        return product._data.name;
    },
    getId: (product) => {
        return product._ref._documentPath._parts[1]
    }
}