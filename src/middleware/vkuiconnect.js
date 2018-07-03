import * as connect from '@vkontakte/vkui-connect'

import {VK_NEED_GO_BACK_EVENT, VK_WENT_BACK_EVENT,
    GET_GEODATA_EVENT, UPDATE_NAVIGATION_STATE_EVENT, GET_USER_INFO_EVENT} from '../actions/vk'
import {sendVKInfo, sendVKInfoFailed} from '../actions/auth'

import locationHelper from '../helpers/locationHelper'

export const CALL_VKUI_CONNECT = 'call_vkui_connect'

let wasSubscribed = false

export default store => next => action => {
    if (!action || !action[CALL_VKUI_CONNECT]) {
        return next(action)
    }

    if (connect.supports(action[CALL_VKUI_CONNECT].type)) {
        connect.send(action[CALL_VKUI_CONNECT].type, action[CALL_VKUI_CONNECT].data || {})
    }

    if (action[CALL_VKUI_CONNECT].type === GET_GEODATA_EVENT && !connect.supports(GET_GEODATA_EVENT)) {
        locationHelper.setNoLocationFromVK()
    }

    if (action[CALL_VKUI_CONNECT].type === UPDATE_NAVIGATION_STATE_EVENT
        && !action[CALL_VKUI_CONNECT].data.can_back
        && !action[CALL_VKUI_CONNECT].data.can_forward) {
        next({type: VK_WENT_BACK_EVENT})
    }

    // test code remove it
    if (action[CALL_VKUI_CONNECT].type === GET_USER_INFO_EVENT && !connect.supports(GET_USER_INFO_EVENT)) {
        next(sendVKInfoFailed());
    }

    if (!wasSubscribed) {
        wasSubscribed = true
        connect.subscribe(e => {
            const event = e.detail
            console.log("VK EVENT:")
            console.log(event)
            switch (event.type) {
                case 'VKWebAppGeodataResult':
                    const location = {lat: event.data.lat, lng: event.data.long}
                    if (!location.lat) {
                        locationHelper.setNoLocationFromVK()
                    } else {
                        locationHelper.setUserLocationFromVK(location)
                    }
                    return
                case 'VKWebAppGeodataFailed':
                    locationHelper.setNoLocationFromVK()
                    return
                case 'VKWebAppGoBack':
                    next({type: VK_NEED_GO_BACK_EVENT});
                    return
                case 'VKWebAppGetUserInfoResult':
                    next(sendVKInfo(event.data));
                    return
                case 'VKWebAppGetUserInfoFailed':
                    next(sendVKInfoFailed());
                    return
                default:
                    return
            }
        });
    }
}