import {NEW_AUTH_INFO, GET_VK_USER_INFO_SUCCESS} from '../actions/auth'

export default function authReducer(state = {hasAuth: false}, action = {}) {
    switch (action.type) {
        case NEW_AUTH_INFO:
            return {
                ...state,
                authInfo: action.data,
                hasAuth: true
            };
        case GET_VK_USER_INFO_SUCCESS:
            return {
                ...state,
                vkInfo: action.data
            };
        default:
            return state;
    }
}