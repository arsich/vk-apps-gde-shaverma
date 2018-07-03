import { combineReducers } from 'redux'

import places from './places'
import location from './location'
import vk from './vk'
import auth from './auth'

const rootReducer = combineReducers({
    places,
    location,
    vk,
    auth
})

export default rootReducer