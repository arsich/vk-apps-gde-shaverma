import {NEW_LOCATION, NEW_REQUESTED_LOCATION, NEW_REQUESTED_ZOOM} from '../actions/location'

export default function locationReducer(state = {hasLocation: false, lastUserLocation: null, lastRequestedZoom: 15}, action = {}) {
    switch (action.type) {
        case NEW_LOCATION:
            return {
                ...state,
                hasLocation: true,
                lastUserLocation: action.data
            };
        case NEW_REQUESTED_LOCATION:
            return {
                ...state,
                lastRequestedLocation: action.data
            };
        case NEW_REQUESTED_ZOOM:
            return {
                ...state,
                lastRequestedZoom: action.data.zoom
            };
        default:
            return state;
    }
}