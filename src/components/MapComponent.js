import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

import {getIconForPlace, getRatingForPlace} from '../helpers/placeUtils'

import './MapComponent.css'

import * as UI from '@vkontakte/vkui';

class MapComponent extends Component {
    constructor(props) {
        super(props)

        const location = props.location
        const zoom = props.zoom || 15

        this.state = {
            map: { center: [location.lat, location.lng], zoom: zoom, controls: [] },
            zoom: zoom,
            mapHeight: this.getMapHeight()
        }
    }

    componentDidMount () {
        window.addEventListener('resize', this.onResize);
        // fix ios insets
        setTimeout(this.onResize, 50);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    onResize = () => {
        this.setState({mapHeight: this.getMapHeight()})
    }

    getMapHeight() {
        const browserHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight
        // tabbar height
        const mapBottom = UI.platform() === UI.IOS ? 102 : 104
        return browserHeight - mapBottom
    }

    handleLocationChanged = (event) => {
        this.props.handleLocationChanged(event.get('target').getCenter())
        this.props.handleZoomChanged(event.get('target').getZoom());
    }

    handleBoundsChange = (event) => {
        const newZoom = event.get('newZoom')
        const oldZoom = event.get('oldZoom')
        if (newZoom !== oldZoom) {
            this.setState({zoom: newZoom})
            this.props.handleZoomChanged(newZoom);
        }
    }
    handleBalloonClicked = (place) => {
        document.getElementById("balloon_id").onclick = (event) => {
            this.props.handleShowPlace(place)
        }
    }

    handlePlacemarkClicked = (place) => {
        this.props.handleShowPlace(place)
    }

    render() {
        const renderPlaceMark = (place, i) => {
            const showCaption = this.state.zoom > 14
            const titleLayout = `<a id="balloon_id" href="javascript:void(0);">${place.name}</a>`
            const iconLayout = `
                <div class="mapLabelContainer">
                    <div class="${showCaption ? 'mapLabel' : 'noCaption'}">
                        ${place.name}
                    </div>
                    <img src="${getIconForPlace(place)}" class="mapImage"/>
                </div>`;
            return <Placemark key={"place_" + place.id}
                              geometry={{
                                type: 'Point',
                                coordinates: [place.location.lat, place.location.lng]
                              }}
                              properties={{
                                  balloonContentHeader: titleLayout,
                                  balloonContent: place.description && place.description.substring(0, 25),
                                  balloonPanelMaxMapArea: 0,
                                  balloonContentFooter: getRatingForPlace(place),
                                  iconContent: iconLayout,
                                  balloonOnMouseUp: this.handleBalloonClicked
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
                              onClick={this.handlePlacemarkClicked.bind(this, place)}
                    />
        }
        const {map, mapHeight} = this.state;
        return (<YMaps  width="100%" height={mapHeight}>
                <Map state={map} width="100%" height={mapHeight}
                    onBoundsChange={this.handleBoundsChange}
                    onActionEnd={this.handleLocationChanged}>
                    {this.props.places.map(renderPlaceMark)}
                </Map>
            </YMaps>)
    }
}

MapComponent.propTypes = {
    places: PropTypes.array.isRequired,
    handleShowPlace: PropTypes.func.isRequired,
    handleLocationChanged: PropTypes.func.isRequired,
    handleZoomChanged: PropTypes.func.isRequired,
    location: PropTypes.object,
    zoom: PropTypes.number
}

export default MapComponent;