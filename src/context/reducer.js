export const defaultState = {
    users: [],
    selectedUsers: []
};

export function ReducerFunction (state = defaultState, action){
    switch (action.type){
        case 'GET_USERS':
            
            return {...state, ...action.data}
        default:
            return state
    }
};
