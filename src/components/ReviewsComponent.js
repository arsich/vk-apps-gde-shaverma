import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as UI from '@vkontakte/vkui'
import ReactDOM from 'react-dom'

import {getImageUrl, getImageForPlace, getRatingString, getDateFromTimestamp} from '../helpers/placeUtils'
import Footer from './Footer'

class ReviewsComponent extends Component {
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
        const {handleShowMore, hasNoMoreLastComments, lastCommentsLoading} = this.props;
        if (!hasNoMoreLastComments && !lastCommentsLoading) {
            handleShowMore()
        }
    }
    handleRefresh() {
        this.props.handleRefresh()

        this.setState({wasRefreshed: true})
    }
    handleShowPlace(place) {
        this.props.handleShowPlace(place)
    }
    render() {
        const {lastComments, lastCommentsLoading} = this.props
        const renderComment = (comment) => {
            const isIos = UI.platform() === UI.IOS
            const shadowHeight = isIos ? '57px' : '55px';
            const shadowLeft= isIos ? '96px' : '100px';
            const shadowRight= isIos ? '20px' : '24px';
            const placeNameStyle = { position: 'absolute', color: 'white', left: '105px', 
                top: '165px', right: '20px', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}
            return (
                <UI.Cell
                    key={"last_review_" + comment.id}
                    before={<UI.Avatar size={72}  src={getImageUrl(comment.user.photoSmall)} />}
                    description={<div style={{marginTop: 4}}>
                                    <div className='ratingLabel'>{getRatingString(comment.value)}</div>
                                    {getDateFromTimestamp(comment.date)}
                                </div>}
                    size="l"
                    bottomContent={
                        <div style={{}}>
                            <img style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                src={getImageForPlace(comment.place)}
                                onClick={this.handleShowPlace.bind(this, comment.place)}/>
                            <div style={{position: 'absolute', left: shadowLeft, right: shadowRight,
                             top: '162px', height: shadowHeight, borderRadius: '8px'}} className="backgroundShadow"></div>
                            <div style={placeNameStyle}>{comment.place.name}</div>
                            <div style={{...placeNameStyle, top: '185px',  
                                fontSize: '12px'}}>{comment.place.description}</div>
                            {comment.text}
                        </div>
                    }
                    multiline>
                    {comment.user.firstName + " " + comment.user.lastName}
                </UI.Cell>
            )
        }
        return (
            <UI.Panel id="reviewsPanel" className="noPaddingFromPanel" ref={this.containerRef}>
                {lastComments && (lastComments.length || this.state.wasRefreshed) ?
                    <UI.PullToRefresh onRefresh={this.handleRefresh.bind(this)} isFetching={Boolean(lastCommentsLoading)}>
                        <UI.Group className="bottomPaddingGroup">
                                <UI.List>
                                    {lastComments.map(renderComment)}
                                    {lastCommentsLoading ? <UI.Div><UI.Spinner size="regular" style={{ marginTop: 20 }} /></UI.Div>
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


ReviewsComponent.propTypes = {
    lastComments: PropTypes.array,
    handleShowPlace: PropTypes.func,
    handleShowMore: PropTypes.func,
    handleRefresh: PropTypes.func,
    lastCommentsLoading: PropTypes.bool,
    hasNoMoreLastComments: PropTypes.bool
}

export default ReviewsComponent