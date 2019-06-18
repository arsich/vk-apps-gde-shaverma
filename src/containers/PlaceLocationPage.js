import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {getIconForPlace} from '../helpers/placeUtils'

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
            zoom: 15,
            mapHeight: this.getMapHeight()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.needBack && nextProps.needBack) {
            this.props.updateNavigation(false, false)
            this.props.goBack()
        }
    }

    componentDidMount () {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    onResize = () => {
        this.setState({mapHeight: this.getMapHeight()})
    }

    getMapHeight() {
        const browserHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight
        // toolbar and tabs
        const mapTop = UI.platform() === UI.IOS ? 64 : 56
        return browserHeight - mapTop
    }

    handlePlaceClicked = () => {
        this.props.goBack()
    }

    
    handleOpenMapClicked = () => {
        const {location} = this.props;
        const url = `https://maps.yandex.ru/?z=15&ll=${location.lng},${location.lat}&l=map&rtext=~${location.lat},${location.lng}&mode=routes`;
        window.location.replace(url);
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
                              onClick={this.handlePlaceClicked}
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
        const {map, mapHeight} = this.state;
        return (
            <UI.View activePanel="location_content" id="viewLocation">
                <UI.Panel id="location_content">
                    <UI.PanelHeader
                        left={<UI.HeaderButton onClick={this.props.goBackVK}>{UI.platform() === UI.IOS ? <Icon28ChevronBack /> : <Icon24Back />}</UI.HeaderButton>}
                        >{this.props.place.name}</UI.PanelHeader>
                    <YMaps  width="100%" height={mapHeight}>
                        <Map state={map} width="100%" height={mapHeight}>
                            {renderPlaceMark(this.props.place)}
                        </Map>
                    </YMaps>
                    <div style={{position: 'absolute', backgroundColor:'#00000000', width: '160px', height: '36px', bottom: '0px'}}
                            onClick={this.handleOpenMapClicked}></div>
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