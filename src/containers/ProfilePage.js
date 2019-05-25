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
    refresh = () => {
        this.props.requestProfileInfo(this.props.userId)
    }
    render() {
        const {user, profile, handleShowPlace, profileLoading} = this.props
        return (
            <ProfileComponent user={user}
                              profile={profile}
                              profileLoading={profileLoading}
                              handleRefresh={this.refresh}
                              handleShowPlace={handleShowPlace} />
        )
    }
}

ProfilePage.propTypes = {
    user: PropTypes.object,
    userId: PropTypes.number,
    profile: PropTypes.object,
    profileLoading: PropTypes.bool,
    handleShowPlace: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    const user = state.auth.vkInfo
    const userId = state.auth.authInfo.userId
    const profile = state.auth.profileInfo
    const profileLoading = state.auth.profileLoading
    return {user, profile, userId, profileLoading}
}

export default withRouter(connect(mapStateToProps, {
    requestProfileInfo
})(ProfilePage))