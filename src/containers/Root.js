import React  from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import MainPage from './MainPage'
import PlacePage from './PlacePage'
import LoadingPage from './LoadingPage'
import PlaceLocationPage from './PlaceLocationPage'
import authHelper from '../helpers/authHelper'
import locationHelper from '../helpers/locationHelper'
import './Root.css'

import '@vkontakte/vkui/dist/vkui.css';

const Root = ({ store }) => (
    <Provider store={store}>
        <div>
            <PrivateRoute exact path="/" component={MainPage} data={store.getState()} />
            <PrivateRoute path="/place/:placeId" component={PlacePage} data={store.getState()} />
            <PrivateRoute path="/place-location/:placeId" component={PlaceLocationPage} data={store.getState()} />
            <Route path="/loading" component={LoadingPage} />
        </div>
    </Provider>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (authHelper.hasAuthForUser() 
            && !authHelper.needToShowIntroToUser()
            && locationHelper.hasLocationForUser() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/loading",
            state: { from: props.location }
          }}
        />
      ))
    }
    />
);

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root