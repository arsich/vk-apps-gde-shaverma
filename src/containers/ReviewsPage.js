import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {getLastComments} from '../actions/places'
import ReviewsComponent from '../components/ReviewsComponent';

class ReviewsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageNumber: 0,
            before: 0
        }
    }
    componentDidMount() {
        if (this.props.lastComments.length == 0) {
            this.refresh()
        } else {
            this.setState({
                pageNumber: Math.floor(this.props.lastComments.length / 10),
                before: this.props.lastComments[0].date
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.lastComments.length && nextProps.lastComments.length) {
            this.setState({
                before: nextProps.lastComments[0].date
            })
        }
    }
    refresh = () => {
        this.setState({
            pageNumber: 1,
            before: 0
        })
        this.props.getLastComments(0, 0)
    }
    showMore = () => {
        this.props.getLastComments(this.state.pageNumber, this.state.before)
        this.setState({
            pageNumber: this.state.pageNumber + 1
        })
    }
    render() {
        const {handleShowPlace, lastCommentsLoading, hasNoMoreLastComments, lastComments} = this.props
        return (
            <ReviewsComponent handleRefresh={this.refresh}
                              handleShowPlace={handleShowPlace}
                              handleShowMore={this.showMore}
                              lastComments={lastComments}
                              hasNoMoreLastComments={hasNoMoreLastComments}
                              lastCommentsLoading={lastCommentsLoading} />
        )
    }
}

ReviewsPage.propTypes = {
    lastComments: PropTypes.array,
    handleShowPlace: PropTypes.func,
    getLastComments: PropTypes.func,
    lastCommentsLoading: PropTypes.bool,
    hasNoMoreLastComments: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    const user = state.auth.vkInfo
    const lastCommentsLoading = state.places.lastCommentsLoading
    const hasNoMoreLastComments = state.places.hasNoMoreLastComments
    const lastComments = state.places.lastComments
    return {user, lastCommentsLoading, hasNoMoreLastComments, lastComments}
}

export default withRouter(connect(mapStateToProps, {
    getLastComments
})(ReviewsPage))