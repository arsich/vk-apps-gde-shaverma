import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'

import authHelper from './helpers/authHelper'
import locationHelper from './helpers/locationHelper'

import {unregister} from './registerServiceWorker'

import 'core-js/es6/map'
import 'core-js/es6/set'

const store = configureStore()
authHelper.init(store)
locationHelper.init(store)

ReactDOM.render(
    <Router>
        <Root store={store} />
    </Router>
    , document.getElementById('root'))
unregister()
