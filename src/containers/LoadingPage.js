import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import * as UI from '@vkontakte/vkui';

class LoadingPage extends Component {
    render() {
        if (this.props.hasAuth && this.props.hasLocation) {
            const { from } = this.props.location.state || {from: {pathname: "/"}};
            return <Redirect to={from}/>
        }
        return (
            <UI.View id="mainView" activePanel="loadingPanel">
                <UI.Panel id="loadingPanel">
                    <UI.ScreenSpinner />
                </UI.Panel>
            </UI.View>
        )
    }
}

LoadingPage.propTypes = {
    hasAuth: PropTypes.bool,
    hasLocation: PropTypes.bool,
    location: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    const hasAuth = state.auth.hasAuth
    const hasLocation = state.location.hasLocation
    return {hasAuth, hasLocation}
}

export default withRouter(connect(mapStateToProps, {
})(LoadingPage))