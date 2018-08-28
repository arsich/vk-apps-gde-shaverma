import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as UI from '@vkontakte/vkui'

import {getImageUrl, getRatingString} from '../helpers/placeUtils'
import Footer from './Footer'

class TopComponent extends Component {
    handleShowPlace(place) {
        this.props.handleShowPlace(place)
    }

    render() {
        const {places} = this.props
        const renderPlace = (place) => {
            const hasAds = place.status === "promoted"
            return (
                <UI.ListItem
                    key={"place_top_" + place.id}
                    onClick={this.handleShowPlace.bind(this, place)}>
                    <UI.Entity photo={getImageUrl(place.picture)}
                               avatarProps={{size: 64, type: 'image'}}
                               title={place.name}
                               description={<div style={{marginTop: 5}}>
                                    <div className='ratingLabel'>{getRatingString(place.rate)}</div>
                                    {place.description}
                                </div>}>
                                {hasAds ? <div className='promoLabel'>Реклама</div> : null}
                    </UI.Entity>
                </UI.ListItem>
            )
        }
        return (
            <UI.Panel id="topPanel" className="noPaddingFromPanel">
                {places && places.length ?
                    <UI.Group className="bottomPaddingGroup">
                            <UI.List>
                                {places.map(renderPlace)}
                            </UI.List>
                    </UI.Group>
                    : null
                }
                <Footer/>
            </UI.Panel>
        )
    }
}


TopComponent.propTypes = {
    places: PropTypes.array,
    handleShowPlace: PropTypes.func
}

export default TopComponent