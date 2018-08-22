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

const MAP = 'map'
const TOP = 'top'
const PROFILE = 'profile'

let lastActiveTap = MAP

class MainPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            activeTab: lastActiveTap
        };
        this.checkHash(props);
    }

    componentDidMount() {
        const {getPlacesNearby, lastUserLocation} = this.props
        if (!this.props.places || !this.props.places.length) {
            getPlacesNearby(lastUserLocation.lat, lastUserLocation.lng)
        }
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
        const isMap = this.state.activeTab === MAP
        const isProfile = this.state.activeTab === PROFILE
        const isTop = this.state.activeTab === TOP
        return (
            <UI.Root activeView="view1">
            <UI.View activePanel="panel_content" id="view1">
                <UI.Panel id="panel_content">
                    <UI.PanelHeader noShadow>Где Шаверма</UI.PanelHeader>
                    <UI.Tabs theme={UI.platform() === UI.IOS ? "light" : "header"}>
                        <UI.TabsItem
                            onClick={() => {
                                lastActiveTap = MAP
                                this.setState({ activeTab: MAP })}
                            }
                            selected={isMap}
                        >
                            Карта
                        </UI.TabsItem>
                        <UI.TabsItem
                            onClick={() => {
                                lastActiveTap = TOP
                                this.setState({ activeTab: TOP })}
                            }
                            selected={isTop}
                        >
                            Подборка
                        </UI.TabsItem>
                        <UI.TabsItem
                            onClick={() => {
                                lastActiveTap = PROFILE
                                this.setState({ activeTab: PROFILE })}
                            }
                            selected={isProfile}
                        >
                            Профиль
                        </UI.TabsItem>
                    </UI.Tabs>
                    {isMap ?
                        <MapComponent places={places}
                                        location={lastUserLocation}
                                        handleShowPlace={this.handleShowPlace}
                                        handleLocationChanged={this.handleLocationChanged} />
                        : null}
                    {isProfile ?
                        <ProfilePage handleShowPlace={this.handleShowPlace}/>
                        : null}
                    {isTop ?
                        <TopPage handleShowPlace={this.handleShowPlace} lastUserLocation={lastUserLocation}/>
                    : null}
                </UI.Panel>
            </UI.View>
            </UI.Root>
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