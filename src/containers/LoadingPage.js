import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import * as UI from '@vkontakte/vkui'

import {hideIntro} from '../actions/auth'

import introOne from '../assets/intro_one.jpg'
import introTwo from '../assets/intro_two.jpg'
import introThree from '../assets/intro_three.jpg'
import authHelper from '../helpers/authHelper'
import locationHelper from '../helpers/locationHelper'

import './LoadingPage.css'

const introTextStyle={paddingBottom: 36, lineHeight: 1.5}

class LoadingPage extends Component {
    render() {
        const redirectedFromHash = Boolean(this.props.location.state && this.props.location.state.from.hash)
        if (this.props.hasAuth && (this.props.introShown || redirectedFromHash)) {
            if (redirectedFromHash) {
                authHelper.setIntroShown()
            }
            if (this.props.hasLocation) {
                const { from } = this.props.location.state || {from: {pathname: "/"}};
                return <Redirect to={from}/>
            } else {
                locationHelper.requestLocationOnStart()
            }
        }
        const activePanel = !this.props.introShown && !redirectedFromHash ? "introPanel" : "loadingPanel"
        return (
            <UI.ConfigProvider insets={this.props.insets}>
                <UI.Root activeView="mainView">
                    <UI.View id="mainView" activePanel={activePanel}>
                        <UI.Panel id="loadingPanel">
                            <UI.ScreenSpinner />
                        </UI.Panel>
                        <UI.Panel id="introPanel">
                            <UI.PanelHeader noShadow>Где Шаверма</UI.PanelHeader>
                            <div style={{backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', 
                                justifyContent: 'center', paddingBottom: '80px', paddingTop: '60px'}} 
                                className="fullHeight">
                                <UI.Gallery bullets="dark" 
                                    style={{height: 'auto', textAlign: 'center'}}>
                                    <div>
                                        <img src={introOne} className="intro_image" alt="Места рядом"/>
                                        <p style={introTextStyle}>Найди лучшую шаверму рядом<br/> в самой большой базе точек</p>
                                    </div>
                                    <div>
                                        <img src={introTwo} className="intro_image" alt="Много отзывов"/>
                                        <p style={introTextStyle}>Читай в отзывах, где вкусно<br/> и безопасно перекусить</p>
                                    </div>
                                    <div>
                                        <img src={introThree} className="intro_image" alt="Вся информация о заведениях"/>
                                        <p style={introTextStyle}>Смотри рейтинг, часы работы,<br/> цены и акции в заведениях</p>
                                    </div>
                                </UI.Gallery>
                            </div>
                            <UI.FixedLayout vertical="bottom">
                                <UI.Div style={{display: 'flex'}}>
                                    <UI.Button level="buy" size="xl" style={{height: 52}} onClick={this.props.hideIntro}>Найти шаверму</UI.Button>
                                </UI.Div>
                            </UI.FixedLayout>
                        </UI.Panel>
                    </UI.View>
                </UI.Root>
            </UI.ConfigProvider>
        )
    }
}

LoadingPage.propTypes = {
    hasAuth: PropTypes.bool,
    hasLocation: PropTypes.bool,
    introShown: PropTypes.bool,
    hideIntro: PropTypes.func.isRequired,
    location: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    const hasAuth = state.auth.hasAuth
    const introShown = state.auth.introShown
    const hasLocation = state.location.hasLocation
    const insets = state.vk.insets
    return {hasAuth, hasLocation, introShown, insets}
}

export default withRouter(connect(mapStateToProps, {
    hideIntro
})(LoadingPage))