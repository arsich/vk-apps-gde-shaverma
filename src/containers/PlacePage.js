import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as UI from '@vkontakte/vkui';

import {getPlaceInfo} from '../actions/places'
import {updateNavigation} from '../actions/vk'

import PlaceComponent from '../components/PlaceComponent'

class PlacePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activePanel: 'loadingPanel'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.placeLoading && !nextProps.placeLoading) {
            this.setState({activePanel: 'mainPanel'})
        }
        if (!this.props.needBack && nextProps.needBack) {
            this.props.updateNavigation(false, false)
            this.props.goBack()
        }
    }

    componentDidMount() {
        const {getPlaceInfo, placeId} = this.props
        getPlaceInfo(placeId)
    }

    render() {
        const {place} = this.props;
        return (
            <UI.View id="mainView" activePanel={this.state.activePanel}>
                <PlaceComponent place={place} id="mainPanel"/>
                <UI.Panel id="loadingPanel">
                    <UI.ScreenSpinner />
                </UI.Panel>
            </UI.View>
        )
    }
}

PlacePage.propTypes = {
    place: PropTypes.object,
    placeLoading: PropTypes.bool,
    needBack: PropTypes.bool,
    placeId: PropTypes.string.isRequired,
    getPlaceInfo: PropTypes.func.isRequired,
    updateNavigation: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        place: state.places && state.places.placeInfo,
        placeLoading: state.places && state.places.placeInfoLoading,
        placeId: ownProps.match.params.placeId,
        needBack: state.vk && state.vk.needBack,
        goBack: ownProps.history.goBack
    }
}

export default withRouter(connect(mapStateToProps, {
    getPlaceInfo, updateNavigation
})(PlacePage))