const defaultState = {
    token : "",
};

export default function adminReducer (state = defaultState, action){
    switch(action.type){
        case 'LOGIN_ADMIN':
            return {
                ...state,
                token: action.data
        }
        default:
           return state   
    }
}
