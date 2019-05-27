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
    }, placeId}
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

export const GET_COMMENTS_FOR_PLACE = 'places/GET_COMMENTS';
export const GET_COMMENTS_FOR_PLACE_SUCCESS = 'places/GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FOR_PLACE_FAIL = 'places/GET_COMMENTS_FAIL';

export function getCommentsForPlace(placeId, pageNumber, before) {
    return {[CALL_API]: {
        types: [GET_COMMENTS_FOR_PLACE, GET_COMMENTS_FOR_PLACE_SUCCESS, GET_COMMENTS_FOR_PLACE_FAIL],
        endpoint: 'Rates/getForPlace',
        query: {
            placeId,
            pageNumber,
            before
        }
    }, placeId}
}

export const GET_LAST_COMMENTS = 'comments/GET_LATEST';
export const GET_LAST_COMMENTS_SUCCESS = 'comments/GET_LATEST_SUCCESS';
export const GET_LAST_COMMENTS_FAIL = 'comments/GET_LATEST_FAIL';

export function getLastComments(pageNumber, before) {
    return {[CALL_API]: {
        types: [GET_LAST_COMMENTS, GET_LAST_COMMENTS_SUCCESS, GET_LAST_COMMENTS_FAIL],
        endpoint: 'Rates/getLatest',
        query: {
            pageNumber,
            before
        }
    }, forceUpdate: pageNumber == 0}
}

export const GET_LAST_DISCOUNTS = 'places/GET_LATEST_DISCOUNTS';
export const GET_LAST_DISCOUNTS_SUCCESS = 'places/GET_LATEST_DISCOUNTS_SUCCESS';
export const GET_LAST_DISCOUNTS_FAIL = 'places/GET_LATEST_DISCOUNTS_FAIL';

export function getLastDiscounts(pageNumber, before) {
    return {[CALL_API]: {
        types: [GET_LAST_DISCOUNTS, GET_LAST_DISCOUNTS_SUCCESS, GET_LAST_DISCOUNTS_FAIL],
        endpoint: 'Discounts/getLatest',
        query: {
            pageNumber,
            before
        }
    }, forceUpdate: pageNumber == 0}
}
