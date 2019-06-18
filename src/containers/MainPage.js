import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {getPlacesNearby} from '../actions/places'
import {updateNavigation, redirectFromHash} from '../actions/vk'
import {sendLastRequestedLocation, sendLastRequestedZoom} from '../actions/location'
import * as UI from '@vkontakte/vkui';

import MapComponent from '../components/MapComponent'

import ProfilePage from './ProfilePage'
import ReviewsPage from './ReviewsPage'
import TopPage from './TopPage'
import DiscountsPage from './DiscountsPage'

import Icon24Map from '@vkontakte/icons/dist/24/globe';
import Icon24List from '@vkontakte/icons/dist/24/list';
import Icon24Profile from '@vkontakte/icons/dist/24/user_outline';
import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline';
import Icon24Gift from '@vkontakte/icons/dist/24/gift';

const MAP = 'map'
const TOP = 'top'
const REVIEWS = 'reviews'
const PROFILE = 'profile'
const DISCOUNTS = 'discounts'

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

    handleZoomChanged = (zoom) => {
        this.props.sendLastRequestedZoom(zoom);
    }

    handleOpenMapClicked = () => {
        const {lastUserLocation, lastUserZoom} = this.props;
        const url = `https://maps.yandex.ru/?z=${lastUserZoom}&ll=${lastUserLocation.lng},${lastUserLocation.lat}&l=map`;
        window.location.replace(url);
    }

    render() {
        const {places, lastUserLocation, lastUserZoom} = this.props;
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
                    selected={this.state.activeStory === REVIEWS}
                    data-story={REVIEWS}
                    text="Отзывы"
                  ><Icon24CommentOutline /></UI.TabbarItem>
                  <UI.TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === DISCOUNTS}
                    data-story={DISCOUNTS}
                    text="Акции"
                  ><Icon24Gift /></UI.TabbarItem>
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
                                        zoom={lastUserZoom}
                                        handleShowPlace={this.handleShowPlace}
                                        handleLocationChanged={this.handleLocationChanged}
                                        handleZoomChanged={this.handleZoomChanged} />
                        <div style={{position: 'absolute', backgroundColor:'#ff000000', width: '160px', height: '36px', bottom: '48px'}}
                            onClick={this.handleOpenMapClicked}></div>
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
                <UI.View id={REVIEWS} activePanel={REVIEWS}>
                    <UI.Panel id={REVIEWS}>
                        <UI.PanelHeader>Где Шаверма</UI.PanelHeader>
                        <ReviewsPage handleShowPlace={this.handleShowPlace}/>
                    </UI.Panel>
                </UI.View>
                <UI.View id={DISCOUNTS} activePanel={DISCOUNTS}>
                    <UI.Panel id={DISCOUNTS}>
                        <UI.PanelHeader>Где Шаверма</UI.PanelHeader>
                        <DiscountsPage handleShowPlace={this.handleShowPlace}/>
                    </UI.Panel>
                </UI.View>
            </UI.Epic>
        )
    }
}

MainPage.propTypes = {
    places: PropTypes.array,
    lastUserLocation: PropTypes.object,
    lastUserZoom: PropTypes.number,
    hash: PropTypes.string,
    redirectedFromHash: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    const places = state.places && state.places.listNearby ? state.places.listNearby : []
    const location = state.location ? state.location.lastRequestedLocation || state.location.lastUserLocation : null
    const hash = ownProps.history.location.hash
    const redirectedFromHash = state.vk.redirectedFromHash
    const zoom = state.location ? state.location.lastRequestedZoom : 15;
    return {places, lastUserLocation: location, lastUserZoom: zoom, pushLocation: ownProps.history.push, hash, redirectedFromHash}
}

export default withRouter(connect(mapStateToProps, {
    getPlacesNearby, updateNavigation, sendLastRequestedLocation, sendLastRequestedZoom, redirectFromHash
})(MainPage))