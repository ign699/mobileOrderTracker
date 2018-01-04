import * as actions from './actions'

export default reducer = (state = { list: [] }, action) => {
    switch(action.type) {
        case actions.UPDATE_CUSTOMERS:
            return {
                list: action.load
            };
        default:
            return state
    }
};