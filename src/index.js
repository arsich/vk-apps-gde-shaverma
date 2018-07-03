import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'

import authHelper from './helpers/authHelper'
import locationHelper from './helpers/locationHelper'

import registerServiceWorker from './registerServiceWorker'

const store = configureStore()
authHelper.init(store)
locationHelper.init(store)

ReactDOM.render(
    <Router>
        <Root store={store} />
    </Router>
    , document.getElementById('root'))
registerServiceWorker()
