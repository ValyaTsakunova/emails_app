export const defaultState = {
    users: [],
    filteredList: [],
    isLoading: false
};

export function ReducerFunction(state = defaultState, action) {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.data,
                filteredList: action.data
            }

        case 'SEARCH_USERS':
            let newState = {
                ...state,
                filteredList: state.users.filter(user => user.toLowerCase().includes(action.data.toLowerCase()))
            }
            return newState

        case 'LOAD':
            return {
                ...state,
                isLoading: action.data
            }
        default:
            return state
    }
};
