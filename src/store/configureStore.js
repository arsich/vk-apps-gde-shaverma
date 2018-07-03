import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import api from '../middleware/api'
import vkuiconnect from '../middleware/vkuiconnect'
import auth from '../middleware/auth'
import location from '../middleware/location'

import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
    rootReducer,
    applyMiddleware(thunk, api, vkuiconnect, auth, location)
)

export default configureStore