import {NEW_AUTH_INFO, GET_VK_USER_INFO_SUCCESS, 
    GET_MY_PROFILE, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAILED, HIDE_INTRO} from '../actions/auth'

import {ADD_RATING_SUCCESS, DELETE_RATING_SUCCESS} from '../actions/places'

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
        case GET_MY_PROFILE:
            return {
                ...state,
                profileLoading: true
            };
        case GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                profileInfo: action.result.result,
                profileLoading: false
            }
        case GET_MY_PROFILE_FAILED:
            return {
                ...state,
                profileLoading: false
            }
        case HIDE_INTRO:
            return {
                ...state,
                introShown: true
            }
        case ADD_RATING_SUCCESS:
        case DELETE_RATING_SUCCESS:
            return {
                ...state,
                profileInfo: null
            }
        default:
            return state;
    }
}