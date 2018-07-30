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
export const VK_WENT_BACK_EVENT = "vk_went_back_event"

export const UPDATE_INSETS = 'vk_update_insets'

export function updateInsets(insets) {
    return {
        type: UPDATE_INSETS,
        data: insets
    }
}