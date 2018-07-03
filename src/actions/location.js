export const NEW_LOCATION = 'location/NEW_LOCATION'

export const DEFAULT_LOCATION_DATA = {lat: 55.737875, lng: 37.626891}

export function sendNewLocation(location) {
    return {
        type: NEW_LOCATION,
        data: location
    }
}

export const NEW_REQUESTED_LOCATION = 'location/NEW_REQUESTED_LOCATION'

export function sendLastRequestedLocation(lat, lng) {
    return {
        type: NEW_REQUESTED_LOCATION,
        data: {
            lat,
            lng
        }
    }
}