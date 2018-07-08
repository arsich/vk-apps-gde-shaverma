import {NEW_AUTH_INFO, GET_VK_USER_INFO_SUCCESS, GET_MY_PROFILE_SUCCESS} from '../actions/auth'

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
        case GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                profileInfo: action.result.result
            }
        default:
            return state;
    }
}