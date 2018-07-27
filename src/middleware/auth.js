import authHelper from '../helpers/authHelper'
import {GET_VK_USER_INFO_SUCCESS, GET_VK_USER_INFO_FAILED,
    GET_USER_INFO_FROM_API_SUCCESS, GET_USER_INFO_FROM_API_FAILED,
    HIDE_INTRO} from '../actions/auth'

export default store => next => action => {
    switch (action.type) {
        case GET_VK_USER_INFO_SUCCESS:
            authHelper.setVkInfo(action.data)
            break;
        case GET_VK_USER_INFO_FAILED:
            authHelper.setDefaultToken()
            break;
        case GET_USER_INFO_FROM_API_SUCCESS:
            authHelper.setUserInfoFromApi(action.result)
            break;
        case GET_USER_INFO_FROM_API_FAILED:
            authHelper.setDefaultToken()
            break;
        case HIDE_INTRO:
            authHelper.saveIntroShown()
            break;
        default:
            break;
    }
    return next(action)
}