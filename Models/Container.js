export default Container = {
    getName: (container) => {
        return container._data.name;
    },
    getId: (container) => {
        return container?container._ref._documentPath._parts[1]:null
    }
}