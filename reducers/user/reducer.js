import * as actions from './actions'

export default reducer = (state = { user: null }, action) => {
    switch(action.type) {
        case actions.AUTHENTICATE_USER:
            return {
                user: action.load
            };
        default:
            return state
    }
};