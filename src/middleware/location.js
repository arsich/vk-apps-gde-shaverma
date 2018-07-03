import locationHelper from '../helpers/locationHelper'

import {NEW_REQUESTED_LOCATION} from '../actions/location'

export default store => next => action => {
    // TODO push action on map activity and handle here
    switch (action.type) {
        case NEW_REQUESTED_LOCATION:
            locationHelper.setNewLastRequestLocation(action.data)
            break;
        default:
            break;
    }
    return next(action)
}