import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {getLastDiscounts} from '../actions/places'
import DiscountsComponent from '../components/DiscountsComponent';

class DiscountsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageNumber: 0,
            before: 0
        }
    }
    componentDidMount() {
        if (this.props.lastDiscounts.length == 0) {
            this.refresh()
        } else {
            this.setState({
                pageNumber: Math.floor(this.props.lastDiscounts.length / 10),
                before: this.props.lastDiscounts[0].date
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.lastDiscounts.length && nextProps.lastDiscounts.length) {
            this.setState({
                before: nextProps.lastDiscounts[0].date
            })
        }
    }
    refresh = () => {
        this.setState({
            pageNumber: 1,
            before: 0
        })
        this.props.getLastDiscounts(0, 0)
    }
    showMore = () => {
        this.props.getLastDiscounts(this.state.pageNumber, this.state.before)
        this.setState({
            pageNumber: this.state.pageNumber + 1
        })
    }
    render() {
        const {handleShowPlace, lastDiscountsLoading, hasNoMoreLastDiscounts, lastDiscounts} = this.props
        return (
            <DiscountsComponent handleRefresh={this.refresh}
                              handleShowPlace={handleShowPlace}
                              handleShowMore={this.showMore}
                              lastDiscounts={lastDiscounts}
                              hasNoMoreLastDiscounts={hasNoMoreLastDiscounts}
                              lastDiscountsLoading={lastDiscountsLoading} />
        )
    }
}

DiscountsPage.propTypes = {
    lastDiscounts: PropTypes.array,
    handleShowPlace: PropTypes.func,
    getLastDiscounts: PropTypes.func,
    lastDiscountsLoading: PropTypes.bool,
    hasNoMoreLastDiscounts: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    const user = state.auth.vkInfo
    const lastDiscountsLoading = state.places.lastDiscountsLoading
    const hasNoMoreLastDiscounts = state.places.hasNoMoreLastDiscounts
    const lastDiscounts = state.places.lastDiscounts
    return {user, lastDiscountsLoading, hasNoMoreLastDiscounts, lastDiscounts}
}

export default withRouter(connect(mapStateToProps, {
    getLastDiscounts
})(DiscountsPage))