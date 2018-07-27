import { CALL_API } from '../middleware/api'
import defaultAuth from '../helpers/defaultAuth'

export const NEW_AUTH_INFO = 'auth/NEW_AUTH_INFO';

export const GET_VK_USER_INFO_SUCCESS = 'auth/GET_VK_USER_INFO_SUCCESS';
export const GET_VK_USER_INFO_FAILED = 'auth/GET_VK_USER_INFO_FAILED';


export function sendAuthInfo(authInfo) {
    return {
        type: NEW_AUTH_INFO,
        data: authInfo
    }
}

export function sendVKInfo(vkInfo) {
    return {
        type: GET_VK_USER_INFO_SUCCESS,
        data: vkInfo
    }
}

export function sendVKInfoFailed() {
    return {
        type: GET_VK_USER_INFO_FAILED
    }
}

export const GET_USER_INFO_FROM_API = 'auth/GET_USER_INFO_FROM_API';
export const GET_USER_INFO_FROM_API_SUCCESS = 'auth/GET_USER_INFO_FROM_API_SUCCESS';
export const GET_USER_INFO_FROM_API_FAILED = 'auth/GET_USER_INFO_FROM_API_FAIL';

export function requestUserInfoFromApi(vkInfo) {
    return {[CALL_API]: {
        types: [GET_USER_INFO_FROM_API, GET_USER_INFO_FROM_API_SUCCESS, GET_USER_INFO_FROM_API_FAILED],
        endpoint: 'VkUsers/add',
        post: getPostForVKUsersAdd(vkInfo)
    }}
}

function getPostForVKUsersAdd(vkInfo) {
    return {
        accessToken: defaultAuth.tokenForUsersAdding,
        vkId: vkInfo.id,
        firstName: vkInfo.first_name,
        lastName: vkInfo.last_name,
        sex: vkInfo.sex,
        city: vkInfo.city && vkInfo.city.title,
        country: vkInfo.country && vkInfo.country.title,
        photoSmall: vkInfo.photo_200,
        photoMax: vkInfo.photo_200
    }
}

export const GET_MY_PROFILE = 'auth/GET_MY_PROFILE';
export const GET_MY_PROFILE_SUCCESS = 'auth/GET_MY_PROFILE_SUCCESS';
export const GET_MY_PROFILE_FAILED = 'auth/GET_MY_PROFILE_FAIL';

export function requestProfileInfo(userId) {
    return {[CALL_API]: {
        types: [GET_MY_PROFILE, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAILED],
        endpoint: 'VkUsers/getInfo',
        post: {
            userId
        }
    }}
}

export const HIDE_INTRO = 'auth/HIDE_INTRO';

export function hideIntro() {
    return {
        type: HIDE_INTRO
    }
}