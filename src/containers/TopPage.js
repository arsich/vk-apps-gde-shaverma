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
    render() {
        const {handleShowPlace, places} = this.props
        return (
            <TopComponent places={places} 
                handleShowPlace={handleShowPlace} />
        )
    }
}

TopPage.propTypes = {
    places: PropTypes.array,
    lastUserLocation: PropTypes.object,
    handleShowPlace: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    return {places: state.places.topList}
}

export default withRouter(connect(mapStateToProps, {
    getTop
})(TopPage))