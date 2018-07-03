import {requestLocation} from '../actions/vk'
import {sendNewLocation, DEFAULT_LOCATION_DATA} from '../actions/location'
import storage from './storage'

const LAST_USER_LOCATION_KEY = 'key_last_user_location'
const LAST_REQUESTED_LOCATION_KEY = 'key_last_requested_location'

class LocationHelper {
    init(store) {
        this.store = store
        this.hasLocation = false
        this.send(requestLocation())
    }

    setUserLocationFromVK(location) {
        this.hasLocation = true
        storage.set(LAST_USER_LOCATION_KEY, location)
        this.send(sendNewLocation(location))
    }

    setNoLocationFromVK() {
        this.hasLocation = true
        const location = storage.get(LAST_REQUESTED_LOCATION_KEY) || storage.get(LAST_USER_LOCATION_KEY) || DEFAULT_LOCATION_DATA
        this.send(sendNewLocation(location))
    }

    setNewLastRequestLocation(location) {
        storage.set(LAST_REQUESTED_LOCATION_KEY, location)
    }

    send(message) {
        this.store.dispatch(message)
    }

    hasLocationForUser() {
        return this.hasLocation
    }
}

export default new LocationHelper()