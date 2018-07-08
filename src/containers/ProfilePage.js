import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ProfileComponent from '../components/ProfileComponent'

import {requestProfileInfo} from '../actions/auth'

class ProfilePage extends Component {
    componentDidMount() {
        if (!this.props.profile) {
            this.props.requestProfileInfo(this.props.userId)
        }
    }
    render() {
        const {user, profile, handleShowPlace} = this.props
        return (
            <ProfileComponent user={user}
                              profile={profile}
                              handleShowPlace={handleShowPlace} />
        )
    }
}

ProfilePage.propTypes = {
    user: PropTypes.object,
    userId: PropTypes.number,
    profile: PropTypes.object,
    handleShowPlace: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    const user = state.auth.vkInfo
    const userId = state.auth.authInfo.userId
    const profile = state.auth.profileInfo
    return {user, profile, userId}
}

export default withRouter(connect(mapStateToProps, {
    requestProfileInfo
})(ProfilePage))