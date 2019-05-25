import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {getPlacesNearby} from '../actions/places'
import {updateNavigation, redirectFromHash} from '../actions/vk'
import {sendLastRequestedLocation} from '../actions/location'
import * as UI from '@vkontakte/vkui';

import MapComponent from '../components/MapComponent'

import ProfilePage from './ProfilePage'
import TopPage from './TopPage'


import Icon24Map from '@vkontakte/icons/dist/24/globe';
import Icon24List from '@vkontakte/icons/dist/24/list';
import Icon24Profile from '@vkontakte/icons/dist/24/user_outline';

const MAP = 'map'
const TOP = 'top'
const PROFILE = 'profile'

let lastActiveTab = MAP

class MainPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            activeStory: lastActiveTab
        };
        this.checkHash(props);

        this.onStoryChange = this.onStoryChange.bind(this);
    }

    componentDidMount() {
        const {getPlacesNearby, lastUserLocation} = this.props
        if (!this.props.places || !this.props.places.length) {
            getPlacesNearby(lastUserLocation.lat, lastUserLocation.lng)
        }
    }

    onStoryChange (e) {
        lastActiveTab = e.currentTarget.dataset.story
        this.setState({ activeStory: lastActiveTab })
    }    

    checkHash(props) {
        if (props.hash && !props.redirectedFromHash) {
            const id = props.hash.replace("#", "")
            if (!isNaN(id)) {
                props.pushLocation(`/place/${id}`)
                this.props.updateNavigation(true, false)
                this.props.redirectFromHash()
            }
        }
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
        return (
            <UI.Epic activeStory={this.state.activeStory} tabbar={
                <UI.Tabbar>
                  <UI.TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === MAP}
                    data-story={MAP}
                    text="Карта"
                  ><Icon24Map /></UI.TabbarItem>
                  <UI.TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === TOP}
                    data-story={TOP}
                    text="Подборка"
                  ><Icon24List /></UI.TabbarItem>
                  <UI.TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === PROFILE}
                    data-story={PROFILE}
                    text="Профиль"
                  ><Icon24Profile /></UI.TabbarItem>
                </UI.Tabbar>
                }>
                <UI.View id={MAP} activePanel={MAP}>
                    <UI.Panel id={MAP}>
                        <UI.PanelHeader>Где Шаверма</UI.PanelHeader>
                        <MapComponent places={places}
                                        location={lastUserLocation}
                                        handleShowPlace={this.handleShowPlace}
                                        handleLocationChanged={this.handleLocationChanged} />
                    </UI.Panel>
                </UI.View>
                <UI.View id={TOP} activePanel={TOP}>
                    <UI.Panel id={TOP}>
                        <UI.PanelHeader>Где Шаверма</UI.PanelHeader>
                        <TopPage handleShowPlace={this.handleShowPlace} lastUserLocation={lastUserLocation}/>
                    </UI.Panel>
                </UI.View>
                <UI.View id={PROFILE} activePanel={PROFILE}>
                    <UI.Panel id={PROFILE}>
                        <UI.PanelHeader>Где Шаверма</UI.PanelHeader>
                        <ProfilePage handleShowPlace={this.handleShowPlace}/>
                    </UI.Panel>
                </UI.View>
            </UI.Epic>
        )
    }
}

MainPage.propTypes = {
    places: PropTypes.array,
    lastUserLocation: PropTypes.object,
    hash: PropTypes.string,
    redirectedFromHash: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    const places = state.places && state.places.listNearby ? state.places.listNearby : []
    const location = state.location ? state.location.lastRequestedLocation || state.location.lastUserLocation : null
    const hash = ownProps.history.location.hash
    const redirectedFromHash = state.vk.redirectedFromHash
    return {places, lastUserLocation: location, pushLocation: ownProps.history.push, hash, redirectedFromHash}
}

export default withRouter(connect(mapStateToProps, {
    getPlacesNearby, updateNavigation, sendLastRequestedLocation, redirectFromHash
})(MainPage))