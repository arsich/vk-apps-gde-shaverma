import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

import {getIconForPlace, getRatingForPlace} from '../helpers/placeUtils'

import './MapComponent.css'

class MapComponent extends Component {
    constructor(props) {
        super(props);

        const location = props.location
        this.state = {
            map: { center: [location.lat, location.lng], zoom: 15, controls: [] },
            zoom: 15
        }
    }

    handleLocationChanged = (event) => {
        this.props.handleLocationChanged(event.get('target').getCenter())
    }

    handleBoundsChange = (event) => {
        const newZoom = event.get('newZoom')
        const oldZoom = event.get('oldZoom')
        if (newZoom !== oldZoom) {
            this.setState({zoom: newZoom})
        }
    }
    handleBalloonClicked = (place) => {
        document.getElementById("balloon_id").onclick = (event) => {
            this.props.handleShowPlace(place)
        }
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
                                      [-60, -60], [30, 0]
                                    ]
                                  }
                              }}
                              onBalloonOpen={this.handleBalloonClicked.bind(this, place)}
                    />
        }
        const {map} = this.state;
        return <YMaps>
            <Map state={map} width="100%" height="100%"
                 onBoundsChange={this.handleBoundsChange}
                 onActionEnd={this.handleLocationChanged}>
                {this.props.places.map(renderPlaceMark)}
            </Map>
        </YMaps>;
    }
}

MapComponent.propTypes = {
    places: PropTypes.array.isRequired,
    handleShowPlace: PropTypes.func.isRequired,
    location: PropTypes.object
}

export default MapComponent;