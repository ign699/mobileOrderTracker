export const UPDATE_CONTAINERS = 'UPDATE_CONTAINERS';
export const updateContainers = (containers) => {
    return {
        type: UPDATE_CONTAINERS,
        load: containers
    }
};