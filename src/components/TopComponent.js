import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as UI from '@vkontakte/vkui'

import {getImageUrl, getRatingString} from '../helpers/placeUtils'
import Footer from './Footer'

class TopComponent extends Component {
    handleShowPlace(place) {
        this.props.handleShowPlace(place)
    }
    handleRefresh() {
        this.props.handleRefresh()
    }
    render() {
        const {places, topLoading} = this.props
        const renderPlace = (place) => {
            const hasAds = place.status === "promoted"
            return (
                <UI.Cell
                    key={"place_top_" + place.id}
                    onClick={this.handleShowPlace.bind(this, place)}
                    before={<UI.Avatar size={72} type='app' src={getImageUrl(place.picture)} />}
                    description={<div style={{marginTop: 5, textOverflow: 'ellipsis', overflow: 'hidden'}}>
                        <div className='ratingLabel'>{getRatingString(place.rate)}</div>
                        {place.description}
                    </div>}
                    size="l"
                    bottomContent={hasAds ? <div className='promoLabel'>Реклама</div> : null}>
                    {place.name}
                </UI.Cell>
            )
        }
        return (
            <UI.Panel id="topPanel" className="noPaddingFromPanel">
                {places && places.length ?
                    <UI.PullToRefresh onRefresh={this.handleRefresh.bind(this)} isFetching={Boolean(topLoading)}>
                        <UI.Group className="bottomPaddingGroup">
                                <UI.List>
                                    {places.map(renderPlace)}
                                </UI.List>
                        </UI.Group>
                    </UI.PullToRefresh>
                    : null
                }
                <Footer/>
            </UI.Panel>
        )
    }
}


TopComponent.propTypes = {
    places: PropTypes.array,
    topLoading: PropTypes.bool,
    handleShowPlace: PropTypes.func,
    handleRefresh: PropTypes.func
}

export default TopComponent