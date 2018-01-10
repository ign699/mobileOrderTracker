import * as actions from './actions'

export default reducer = (state = { list: [] }, action) => {
    switch(action.type) {
        case actions.UPDATE_PRODUCTS:
            return {
                list: action.load
            };
        default:
            return state
    }
};