import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {getPlacesNearby} from '../actions/places'
import {updateNavigation} from '../actions/vk'
import {sendLastRequestedLocation} from '../actions/location'

import MapComponent from '../components/MapComponent'

class MainPage extends Component {
    componentDidMount() {
        const {getPlacesNearby, lastUserLocation} = this.props
        getPlacesNearby(lastUserLocation.lat, lastUserLocation.lng)
    }

    handleShowPlace = (place) => {
        this.props.pushLocation(`/place/${place.id}`)
        this.props.updateNavigation(true, false)
    }

    handleLocationChanged = (coordinates) => {
        this.props.getPlacesNearby(coordinates[0], coordinates[1]);
        this.props.sendLastRequestedLocation(coordinates[0], coordinates[1]);
    }

    render() {
        const {places, lastUserLocation} = this.props;
        return <div className="fullHeight">
            { lastUserLocation ?
                    <MapComponent places={places}
                                  location={lastUserLocation}
                                  handleShowPlace={this.handleShowPlace}
                                  handleLocationChanged={this.handleLocationChanged} />
                        : null }
                </div>
    }
}

MainPage.propTypes = {
    places: PropTypes.array,
    lastUserLocation: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    const places = state.places && state.places.listNearby ? state.places.listNearby : []
    const location = state.location ? state.location.lastUserLocation : null
    return {places, lastUserLocation: location, pushLocation: ownProps.history.push}
}

export default withRouter(connect(mapStateToProps, {
    getPlacesNearby, updateNavigation, sendLastRequestedLocation
})(MainPage))