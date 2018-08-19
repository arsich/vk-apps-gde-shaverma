import {VK_NEED_GO_BACK_EVENT, VK_WENT_BACK_EVENT, UPDATE_INSETS, REDIRECT_FROM_HASH_SUCCESS} from '../actions/vk'

export default function locationReducer(state = {}, action = {}) {
    switch (action.type) {
        case VK_NEED_GO_BACK_EVENT:
            return {
                ...state,
                needBack: true
            };
        case VK_WENT_BACK_EVENT:
            return {
                ...state,
                needBack: false
            };
        case UPDATE_INSETS:
            return {
                ...state,
                insets: action.data
            };
        case REDIRECT_FROM_HASH_SUCCESS:
            return {
                ...state,
                redirectedFromHash: true
            };
        default:
            return state;
    }
}