import {GET_NEARBY, GET_NEARBY_SUCCESS, GET_NEARBY_FAIL,
    GET_INFO, GET_INFO_FAIL, GET_INFO_SUCCESS, 
    ADD_RATING, ADD_RATING_SUCCESS, DELETE_RATING, DELETE_RATING_SUCCESS,
    GET_TOP, GET_TOP_FAIL, GET_TOP_SUCCESS,
    GET_COMMENTS_FOR_PLACE,
    GET_COMMENTS_FOR_PLACE_FAIL,
    GET_COMMENTS_FOR_PLACE_SUCCESS} from '../actions/places'

export default function placesReducer(state = {placesWithAllComments: [], placesComments: {}}, action = {}) {
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
            const placesComments = {...state.placesComments, [action.placeId]: []};

            let withAllComments = state.placesWithAllComments;
            if (withAllComments.includes(action.placeId)) {
                const index = withAllComments.indexOf(action.placeId);
                if (index !== -1) {
                    withAllComments = withAllComments.slice()
                    withAllComments.splice(index, 1);
                }
            }

            return {
                ...state,
                placeInfoLoading: true,
                placesComments,
                placesWithAllComments: withAllComments
            };
        case GET_INFO_SUCCESS:
            const placeInfo = action.result.result;
            const comments = {...state.placesComments, [action.placeId]: placeInfo.comments};

            const noMoreComments = placeInfo.comments && placeInfo.comments.length < 3;
            let allComments = state.placesWithAllComments;
            if (noMoreComments && !allComments.includes(action.placeId)) {
                allComments = allComments.slice();
                allComments.push(action.placeId);
            }
            return {
                ...state,
                placeInfoLoading: false,
                placeInfo,
                placesComments: comments,
                placesWithAllComments: allComments
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
        case GET_TOP:
            return {
                ...state,
                topLoading: true
            };
        case GET_TOP_FAIL:
            return {
                ...state,
                topLoading: false
            };
        case GET_TOP_SUCCESS:
            return {
                ...state,
                topList: action.result.result,
                topLoading: false
            };
        case GET_COMMENTS_FOR_PLACE:
            return {
                ...state,
                commentsLoading: true
            };
        case GET_COMMENTS_FOR_PLACE_SUCCESS:
            let placeComments = state.placesComments[action.placeId] || [];
            if (placeComments.length == 3) {
                placeComments = [];
            }
            placeComments = placeComments.concat(action.result.result);
            const newComments = {...state.placesComments, [action.placeId]: placeComments};
            const hasNoMoreComments = hasNoMoreCommentsFunc(action.result.result);
            let placesWithAllComments = state.placesWithAllComments;
            if (hasNoMoreComments && !placesWithAllComments.includes(action.placeId)) {
                placesWithAllComments = placesWithAllComments.slice();
                placesWithAllComments.push(action.placeId);
            }
            return {
                ...state,
                commentsLoading: false,
                placesComments: newComments,
                placesWithAllComments
            };
        case GET_COMMENTS_FOR_PLACE_FAIL:
            return {
                ...state,
                commentsLoading: false
            };
        default:
            return state;
    }
}

function hasNoMoreCommentsFunc(comments) {
    return comments && comments.length < 10;
}