import {NEW_LOCATION} from '../actions/location'

export default function locationReducer(state = {hasLocation: false, lastUserLocation: null}, action = {}) {
    switch (action.type) {
        case NEW_LOCATION:
            return {
                ...state,
                hasLocation: true,
                lastUserLocation: action.data
            };
        default:
            return state;
    }
}