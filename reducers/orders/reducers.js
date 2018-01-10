import * as actions from './actions'

export default reducer = (state = { list: [] }, action) => {
    switch(action.type) {
        case actions.UPDATE_ORDERS:
            return {
                list: action.load
            };
        default:
            return state
    }
};