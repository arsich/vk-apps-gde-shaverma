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

import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper'

import 'core-js/features/map'
import 'core-js/features/set'

const store = configureStore()
authHelper.init(store)
locationHelper.init(store)

const root = document.getElementById('root')
mVKMiniAppsScrollHelper(root)

ReactDOM.render(
    <Router>
        <Root store={store} />
    </Router>
    , root)
unregister()
