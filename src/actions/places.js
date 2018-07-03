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