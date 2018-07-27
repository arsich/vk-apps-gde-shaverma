import {NEW_AUTH_INFO, GET_VK_USER_INFO_SUCCESS, 
    GET_MY_PROFILE_SUCCESS, HIDE_INTRO} from '../actions/auth'

export default function authReducer(state = {hasAuth: false, introShown: false}, action = {}) {
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
        case HIDE_INTRO:
            return {
                ...state,
                introShown: true
            }
        default:
            return state;
    }
}