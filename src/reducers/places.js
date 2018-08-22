import {GET_NEARBY, GET_NEARBY_SUCCESS, GET_NEARBY_FAIL,
    GET_INFO, GET_INFO_FAIL, GET_INFO_SUCCESS, 
    ADD_RATING, ADD_RATING_SUCCESS, DELETE_RATING, DELETE_RATING_SUCCESS,
    GET_TOP_SUCCESS} from '../actions/places'

export default function placesReducer(state = {}, action = {}) {
    switch (action.type) {
        case GET_NEARBY:
            return {
                ...state,
                loading: true
            };
        case GET_NEARBY_SUCCESS:
            return {
                ...state,
                loading: false,
                listNearby: action.result.result
            };
        case GET_NEARBY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case GET_INFO:
            return {
                ...state,
                placeInfoLoading: true
            };
        case GET_INFO_SUCCESS:
            return {
                ...state,
                placeInfoLoading: false,
                placeInfo: action.result.result
            };
        case GET_INFO_FAIL:
            return {
                ...state,
                placeInfoLoading: false,
                error: action.error
            };
        case ADD_RATING:
        case DELETE_RATING:
            return {
                ...state,
                ratingUpdated: false
            };
        case ADD_RATING_SUCCESS:
        case DELETE_RATING_SUCCESS:
            return {
                ...state,
                ratingUpdated: true
            };
        case GET_TOP_SUCCESS:
            return {
                ...state,
                topList: action.result.result
            };
        default:
            return state;
    }
}