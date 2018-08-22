import { CALL_API } from '../middleware/api'

export const GET_NEARBY = 'places/GET_NEARBY';
export const GET_NEARBY_SUCCESS = 'places/GET_NEARBY_SUCCESS';
export const GET_NEARBY_FAIL = 'places/GET_NEARBY_FAIL';

export function getPlacesNearby(lat, lng) {
    return {[CALL_API]: {
        types: [GET_NEARBY, GET_NEARBY_SUCCESS, GET_NEARBY_FAIL],
        endpoint: 'Places/getNearby',
        query: {
            lat,
            lng
        }
    }}
}

export const GET_INFO = 'places/GET_INFO';
export const GET_INFO_SUCCESS = 'places/GET_INFO_SUCCESS';
export const GET_INFO_FAIL = 'places/GET_INFO_FAIL';


export function getPlaceInfo(placeId) {
    return {[CALL_API]: {
        types: [GET_INFO, GET_INFO_SUCCESS, GET_INFO_FAIL],
        endpoint: 'Places/getInfo',
        query: {
            placeId,
            limitComments: true
        }
    }}
}

export const ADD_RATING = 'places/ADD_RATING'
export const ADD_RATING_SUCCESS = 'places/ADD_RATING_SUCCESS'
export const ADD_RATING_FAIL = 'places/ADD_RATING_FAIL'

export function addRating(placeId, value, text) {
    return {[CALL_API]: {
        types: [ADD_RATING, ADD_RATING_SUCCESS, ADD_RATING_FAIL],
        endpoint: 'Rates/add',
        post: {
            placeId,
            value,
            text
        }
    }}
}

export const DELETE_RATING = 'places/DELETE_RATING'
export const DELETE_RATING_SUCCESS = 'places/DELETE_RATING_SUCCESS'
export const DELETE_RATING_FAIL = 'places/DELETE_RATING_FAIL'

export function deleteRating(placeId) {
    return {[CALL_API]: {
        types: [DELETE_RATING, DELETE_RATING_SUCCESS, DELETE_RATING_FAIL],
        endpoint: 'Rates/delete',
        post: {
            placeId
        }
    }}
}

export const GET_TOP = 'places/GET_TOP';
export const GET_TOP_SUCCESS = 'places/GET_TOP_SUCCESS';
export const GET_TOP_FAIL = 'places/GET_TOP_FAIL';

export function getTop(lat, lng) {
    return {[CALL_API]: {
        types: [GET_TOP, GET_TOP_SUCCESS, GET_TOP_FAIL],
        endpoint: 'Places/getTop',
        query: {
            lat,
            lng
        }
    }}
}
