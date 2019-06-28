import { CALL_VKUI_CONNECT } from '../middleware/vkuiconnect'

let vkInitialized = false;

export function initBefore() {
    return vkInitialized
}

export function initVK() {
    vkInitialized = true
    return {[CALL_VKUI_CONNECT]: {
        type: 'VKWebAppInit'
    }}
}

export const SET_TITLE_EVENT = 'VKWebAppSetTitle'

export function setTitle() {
    return {[CALL_VKUI_CONNECT]: {
        type: SET_TITLE_EVENT,
        data: {
            title: 'Где Шаверма'
        }
    }}
}

export const GET_GEODATA_EVENT = 'VKWebAppGetGeodata'

export function requestLocation() {
    return {[CALL_VKUI_CONNECT]: {
        type: GET_GEODATA_EVENT
    }}
}

export const GET_USER_INFO_EVENT = 'VKWebAppGetUserInfo'

export function getUserInfo() {
    return {[CALL_VKUI_CONNECT]: {
        type: GET_USER_INFO_EVENT
    }}
}


export const UPDATE_NAVIGATION_STATE_EVENT = 'VKWebAppViewUpdateNavigationState'

export function updateNavigation(can_back, can_forward) {
    return {[CALL_VKUI_CONNECT]: {
        type: UPDATE_NAVIGATION_STATE_EVENT,
        data: {
            can_back,
            can_forward
        }
    }}
}

export const VK_NEED_GO_BACK_EVENT = "vk_need_go_back_event"
export function goBack() {
    return {
        type: VK_NEED_GO_BACK_EVENT
    }
}

export const VK_WENT_BACK_EVENT = "vk_went_back_event"

export const UPDATE_INSETS = 'vk_update_insets'

export function updateInsets(insets) {
    return {
        type: UPDATE_INSETS,
        data: insets
    }
}

export const VK_SET_LOCATION = 'VKWebAppSetLocation'

export function setLocationForVK(location) {
    return {[CALL_VKUI_CONNECT]: {
        type: VK_SET_LOCATION,
        data: {
            location
        }
    }}
}
export const VK_SHARE = 'VKWebAppShare'

export function shareVK(link) {
    return {[CALL_VKUI_CONNECT]: {
        type: VK_SHARE,
        data: {
            link
        }
    }}
}

export const VK_SHOW_IMAGE = 'VKWebAppShowImages'

export function showImageInVK(image) {
    return {[CALL_VKUI_CONNECT]: {
        type: VK_SHOW_IMAGE,
        data: {
            images:[image]
        }
    }}
}

export const REDIRECT_FROM_HASH_SUCCESS = 'redirect_from_hash_success'

export function redirectFromHash() {
    return {
        type: REDIRECT_FROM_HASH_SUCCESS
    }
}