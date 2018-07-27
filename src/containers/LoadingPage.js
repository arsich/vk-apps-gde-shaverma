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

import './LoadingPage.css'

class LoadingPage extends Component {
    render() {
        if (this.props.hasAuth && this.props.hasLocation && this.props.introShown) {
            const { from } = this.props.location.state || {from: {pathname: "/"}};
            return <Redirect to={from}/>
        }
        const activePanel = !this.props.introShown ? "introPanel" : "loadingPanel"
        return (
            <UI.View id="mainView" activePanel={activePanel} header={false}>
                <UI.Panel id="loadingPanel">
                    <UI.ScreenSpinner />
                </UI.Panel>
                <UI.Panel id="introPanel">
                    <UI.Div style={{backgroundColor: '#ffffff', paddingTop: '20px', paddingBottom: '80px'}} 
                        className="fullHeight">
                        <UI.Gallery bullets="dark" 
                            style={{height: '100%', textAlign: 'center'}}>
                            <div>
                                <img src={introOne} className="intro_image"/>
                                <p>Найди лучшую шаверму рядом<br/> в самой большой базе точек</p>
                            </div>
                            <div>
                                <img src={introTwo} className="intro_image"/>
                                <p>Читай в отзывах, где вкусно<br/> и безопасно перекусить</p>
                            </div>
                            <div>
                                <img src={introThree} className="intro_image"/>
                                <p>Смотри рейтинг, часы работы,<br/> цены и акции в заведениях</p>
                            </div>
                        </UI.Gallery>
                    </UI.Div>
                    <UI.FixedLayout vertical="bottom">
                        <UI.Div style={{display: 'flex'}}>
                            <UI.Button level="buy" size="xl" onClick={this.props.hideIntro}>Найти шаверму</UI.Button>
                        </UI.Div>
                    </UI.FixedLayout>
                </UI.Panel>
            </UI.View>
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
    return {hasAuth, hasLocation, introShown}
}

export default withRouter(connect(mapStateToProps, {
    hideIntro
})(LoadingPage))