import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TopComponent from '../components/TopComponent'
import {getTop} from '../actions/places'

class TopPage extends Component {
    componentDidMount() {
        const {getTop, lastUserLocation} = this.props
        if (!this.props.places || !this.props.places.length) {
            getTop(lastUserLocation.lat, lastUserLocation.lng)
        }
    }
    refresh = () => {
        const {getTop, lastUserLocation} = this.props
        getTop(lastUserLocation.lat, lastUserLocation.lng)
    }
    render() {
        const {handleShowPlace, places, topLoading} = this.props
        return (
            <TopComponent places={places}
                topLoading={topLoading}
                handleRefresh={this.refresh}
                handleShowPlace={handleShowPlace} />
        )
    }
}

TopPage.propTypes = {
    places: PropTypes.array,
    topLoading: PropTypes.bool,
    lastUserLocation: PropTypes.object,
    handleShowPlace: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    return {places: state.places.topList, topLoading: state.places.topLoading}
}

export default withRouter(connect(mapStateToProps, {
    getTop
})(TopPage))