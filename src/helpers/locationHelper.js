import {requestLocation} from '../actions/vk'
import {sendNewLocation, DEFAULT_LOCATION_DATA} from '../actions/location'
import storage from './storage'

const LAST_USER_LOCATION_KEY = 'key_last_user_location'
const LAST_REQUESTED_LOCATION_KEY = 'key_last_requested_location'

class LocationHelper {
    init(store) {
        this.store = store
        this.hasLocation = false
    }

    requestLocationOnStart() {
        this.send(requestLocation())
    }

    setUserLocationFromVK(location) {
        this.hasLocation = true
        storage.set(LAST_USER_LOCATION_KEY, location)
        storage.set(LAST_REQUESTED_LOCATION_KEY, location)
        this.send(sendNewLocation(location))
    }

    setNoLocationFromVK() {
        this.hasLocation = true
        const location = storage.get(LAST_REQUESTED_LOCATION_KEY) || storage.get(LAST_USER_LOCATION_KEY)
        if (location) {
            this.send(sendNewLocation(location))
        } else {
            if (this.vkInfoLoaded) {
                this.sendDefaultLocation()
            } else {
                this.needDefaultLocation = true
            }
        }
    }

    sendDefaultLocation() {
        const location = this.vkInfo && this.vkInfo.city ? this.getLocationFromCity(this.vkInfo.city.title) : DEFAULT_LOCATION_DATA
        this.send(sendNewLocation(location))
    }

    getLocationFromCity(city) {
        return require('./defaultLocations')[city] || DEFAULT_LOCATION_DATA
    }

    setNewLastRequestLocation(location) {
        storage.set(LAST_REQUESTED_LOCATION_KEY, location)
    }

    setVkInfo(vkInfo) {
        this.vkInfo = vkInfo
        this.setVkInfoFinish()
    }

    setVkInfoFinish() {
        this.vkInfoLoaded = true
        if (this.needDefaultLocation) {
            this.sendDefaultLocation()
        }
    }

    send(message) {
        this.store.dispatch(message)
    }

    hasLocationForUser() {
        return this.hasLocation
    }
}

export default new LocationHelper()