import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as UI from '@vkontakte/vkui'
import ReactDOM from 'react-dom'

import {getImageUrl, getImageForPlace, getDateFromTimestamp} from '../helpers/placeUtils'
import Footer from './Footer'

class DiscountsComponent extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.handleShowMore = this.handleShowMore.bind(this);

        this.state = {
            wasRefreshed: false
        }
    }
    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling.bind(this));
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling.bind(this));
    }
    trackScrolling() {
        try {
            const element = ReactDOM.findDOMNode(this.containerRef.current).firstChild;
            const isBottom = window.scrollY + window.innerHeight >= element.scrollHeight
            if (isBottom) {
                this.handleShowMore();
            }
        } catch (e) {

        }
    }
    handleShowMore() {
        const {handleShowMore, hasNoMoreLastDiscounts, lastDiscountsLoading} = this.props;
        if (!hasNoMoreLastDiscounts && !lastDiscountsLoading) {
            handleShowMore()
        }
    }
    handleRefresh() {
        this.props.handleRefresh()

        this.setState({
            wasRefreshed: true
        })
    }
    handleShowPlace(place) {
        if (place) {
            this.props.handleShowPlace(place)
        }
    }
    render() {
        const {lastDiscounts, lastDiscountsLoading} = this.props
        const renderDiscount = (discount) => {
            return (
                <UI.Cell
                    key={"last_discount_" + discount.id}
                    before={<UI.Avatar size={72} type='app' src={getImageForPlace(discount.place)}/>}
                    onClick={this.handleShowPlace.bind(this, discount.place)}
                    description={<div>
                                    {getDateFromTimestamp(discount.date)}
                                </div>}
                    size="l"
                    bottomContent={
                        <div style={{}}>
                            <img style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                src={getImageUrl(discount.picture)}/>
                            {discount.text}
                        </div>
                    }
                    multiline>
                    {discount.place ? discount.place.name : 'Где Шаверма'}
                </UI.Cell>
            )
        }
        return (
            <UI.Panel id="discountPanel" className="noPaddingFromPanel" ref={this.containerRef}>
                {lastDiscounts && (lastDiscounts.length || this.state.wasRefreshed) ?
                    <UI.PullToRefresh onRefresh={this.handleRefresh.bind(this)} isFetching={Boolean(lastDiscountsLoading)}>
                        <UI.Group className="bottomPaddingGroup">
                                <UI.List>
                                    {lastDiscounts.map(renderDiscount)}
                                    {lastDiscountsLoading ? <UI.Div><UI.Spinner size="regular" style={{ marginTop: 20 }} /></UI.Div>
                                    : null}
                                </UI.List>
                        </UI.Group>
                    </UI.PullToRefresh>
                    : <UI.ScreenSpinner/>
                }
                <Footer/>
            </UI.Panel>
        )
    }
}


DiscountsComponent.propTypes = {
    lastDiscounts: PropTypes.array,
    handleShowPlace: PropTypes.func,
    handleShowMore: PropTypes.func,
    handleRefresh: PropTypes.func,
    lastDiscountsLoading: PropTypes.bool,
    hasNoMoreLastDiscounts: PropTypes.bool
}

export default DiscountsComponent