import locationHelper from '../helpers/locationHelper'
import {GET_VK_USER_INFO_SUCCESS, GET_VK_USER_INFO_FAILED} from '../actions/auth'

import {NEW_REQUESTED_LOCATION} from '../actions/location'

export default store => next => action => {
    // TODO push action on map activity and handle here
    switch (action.type) {
        case NEW_REQUESTED_LOCATION:
            locationHelper.setNewLastRequestLocation(action.data)
            break;
        case GET_VK_USER_INFO_SUCCESS:
            locationHelper.setVkInfo(action.data)
            break;
        case GET_VK_USER_INFO_FAILED:
            locationHelper.setVkInfoFinish()
            break;
        default:
            break;
    }
    return next(action)
}