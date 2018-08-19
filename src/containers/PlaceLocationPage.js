import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {getIconForPlace, getRatingForPlace} from '../helpers/placeUtils'

import Icon24Back from '@vkontakte/icons/dist/24/back'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'

import * as UI from '@vkontakte/vkui'

import {goBack, updateNavigation} from '../actions/vk'

import '../components/MapComponent.css'

class PlaceLocationPage extends Component {
    constructor(props) {
        super(props);

        const location = props.location
        this.state = {
            map: { center: [location.lat, location.lng], zoom: 15, controls: [] },
            zoom: 15
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.needBack && nextProps.needBack) {
            this.props.updateNavigation(false, false)
            this.props.goBack()
        }
    }

    render() {
        const renderPlaceMark = (place) => {
            const iconLayout = `
                <div class="mapLabelContainer">
                    <div class="mapLabel">
                        ${place.name}
                    </div>
                    <img src="${getIconForPlace(place)}" class="mapImage"/>
                </div>`;
            return <Placemark geometry={{
                                type: 'Point',
                                coordinates: [place.location.lat, place.location.lng]
                              }}
                              properties={{
                                  iconContent: iconLayout
                              }}
                              options={{
                                  iconLayout: 'default#imageWithContent',
                                  iconImageHref: '',
                                  iconImageSize: [30, 42],
                                  iconImageOffset: [0, 0],
                                  iconShape: {
                                    type: 'Rectangle',
                                    coordinates: [
                                      [-60, -60], [100, 0]
                                    ]
                                  }
                              }}
                    />
        }
        const {map} = this.state;
        return (
            <UI.View activePanel="location_content" id="viewLocation">
                <UI.Panel id="location_content">
                    <UI.PanelHeader
                        left={<UI.HeaderButton onClick={this.props.goBackVK}>{UI.platform() === UI.IOS ? <Icon28ChevronBack /> : <Icon24Back />}</UI.HeaderButton>}
                        >{this.props.place.name}</UI.PanelHeader>
                    <YMaps  width="100%" height="100vh">
                        <Map state={map} width="100%" height="100vh">
                            {renderPlaceMark(this.props.place)}
                        </Map>
                    </YMaps>;
                </UI.Panel>
            </UI.View>
        )
    }
}

PlaceLocationPage.propTypes = {
    place: PropTypes.object,
    location: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    return {
        place: state.places && state.places.placeInfo,
        location: state.places && state.places.placeInfo && state.places.placeInfo.location,
        goBack: ownProps.history.goBack,
        needBack: state.vk && state.vk.needBack
    }
}

export default withRouter(connect(mapStateToProps, {
    goBackVK: goBack, updateNavigation
})(PlaceLocationPage))