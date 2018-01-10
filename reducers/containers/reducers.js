import * as actions from './actions'
import Container from "../../Models/Container";

export default reducer = (state = { list: [], entries: [] }, action) => {
    switch(action.type) {
        case actions.UPDATE_CONTAINERS:
            const entries = {};
            action.load.forEach(container => {
                entries[Container.getId(container)] = container
            });
            return {
                list: action.load,
                entries
            };
        default:
            return state
    }
};