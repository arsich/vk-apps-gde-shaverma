import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as UI from '@vkontakte/vkui'

import {getPlaceInfo, addRating, deleteRating, getCommentsForPlace} from '../actions/places'
import {updateNavigation, setLocationForVK, shareVK, goBack, showImageInVK} from '../actions/vk'

import PlaceComponent from '../components/PlaceComponent'

import uiHelper from '../helpers/uiHelper'

class PlacePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activePanel: 'loadingPanel',
            ratingDialog: <UI.ScreenSpinner/>,
            ratingValue: 5
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.placeLoading && !nextProps.placeLoading) {
            this.setState({ratingDialog: null, activePanel: "mainPanel"})
        }
        if (!this.props.needBack && nextProps.needBack) {
            this.props.updateNavigation(false, false)
            this.props.goBack()
        }
        if (nextProps.place && nextProps.place.rateByDevice) {
            this.setState({
                ratingValue: nextProps.place.rateByDevice,
                ratingComment: nextProps.place.rateByDeviceText
            })
        } else {
            this.setState({
                ratingValue: 5,
                ratingComment: ''
            })
        }

        if (nextProps.ratingUpdated && !this.props.ratingUpdated) {
            const {getPlaceInfo, placeId} = this.props
            getPlaceInfo(placeId)
        }
    }

    componentDidMount() {
        const {getPlaceInfo, placeId, setLocationForVK} = this.props
        getPlaceInfo(placeId)
        setLocationForVK(placeId)

        uiHelper.setTheme()
    }

    shareVK = () => {
        this.props.shareVK()
    }

    goBack = () => {
        this.props.goBackVK()
    }

    updateRating = () => {
        const {placeId, addRating} = this.props
        addRating(placeId, this.state.ratingValue, this.state.ratingComment)
    }

    openRatingDialog = () => {
        this.setState({
            ratingDialog:
                <RatingDialog handleClose={ () => this.setState({ ratingDialog: null }) }
                    defaultValue={this.state.ratingValue}
                    defaultComment={this.state.ratingComment}
                    handleSave={this.updateRating}
                    handleRatingValueChange={ratingValue => this.setState({ratingValue})}
                    handleRatingCommentChange={ratingComment => { this.setState({ratingComment})}} />
        })
    }

    deleteRating = () => {
        const {placeId, deleteRating} = this.props
        deleteRating(placeId)
    }

    openPlaceLocation = () => {
        this.props.pushLocation(`/place-location/${this.props.placeId}`)
    }

    getCommentsForPlace = (pageNumber, before) => {
        this.props.getCommentsForPlace(this.props.place.id, pageNumber, before)
    }

    showImage = (link) => {
        this.props.showImageInVK(link)
    }

    render() {
        const {place, userAvatar, user, noMoreComments, commentsLoading, placeComments} = this.props;
        return (
            <UI.ConfigProvider insets={this.props.insets}>
                <UI.Root activeView="mainView">
                    <UI.View id="mainView" activePanel={this.state.activePanel} popout={this.state.ratingDialog}>
                        <PlaceComponent place={place}
                                        placeComments={placeComments}
                                        commentsLoading={commentsLoading}
                                        noMoreComments={noMoreComments}
                                        user={user}
                                        id="mainPanel"
                                        openRatingDialog={this.openRatingDialog}
                                        openPlaceLocation={this.openPlaceLocation}
                                        getCommentsForPlace={this.getCommentsForPlace}
                                        showImageInVK={this.showImage}
                                        deleteRating={this.deleteRating}
                                        goBack={this.goBack}
                                        shareVK={this.shareVK}
                                        userAvatar={userAvatar}/>
                        <UI.Panel id="loadingPanel">
                            <UI.PanelHeader/>
                        </UI.Panel>
                    </UI.View>
                </UI.Root>
            </UI.ConfigProvider>
        )
    }
}

PlacePage.propTypes = {
    place: PropTypes.object,
    placeComments: PropTypes.array,
    user: PropTypes.object,
    insets: PropTypes.object,
    placeLoading: PropTypes.bool,
    commentsLoading: PropTypes.bool,
    noMoreComments: PropTypes.bool,
    needBack: PropTypes.bool,
    ratingUpdated: PropTypes.bool,
    userAvatar: PropTypes.string,
    placeId: PropTypes.string.isRequired,
    getPlaceInfo: PropTypes.func.isRequired,
    updateNavigation: PropTypes.func.isRequired,
    addRating: PropTypes.func.isRequired,
    deleteRating: PropTypes.func.isRequired,
    getCommentsForPlace: PropTypes.func.isRequired,
    shareVK: PropTypes.func.isRequired,
    goBackVK: PropTypes.func.isRequired,
    setLocationForVK: PropTypes.func.isRequired,
    showImageInVK: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    const placeInfo = state.places && state.places.placeInfo;
    const placeComments = placeInfo ? state.places.placesComments[placeInfo.id] : [];
    const noMoreComments = placeInfo ? state.places.placesWithAllComments.includes(placeInfo.id):  false;
    return {
        place: placeInfo,
        placeLoading: state.places && state.places.placeInfoLoading,
        placeComments: placeComments,
        noMoreComments: noMoreComments,
        commentsLoading: state.places && state.places.commentsLoading,
        placeId: ownProps.match.params.placeId,
        needBack: state.vk && state.vk.needBack,
        goBack: ownProps.history.goBack,
        user: state.auth.vkInfo,
        userAvatar: state.auth && state.auth.vkInfo && state.auth.vkInfo.photo_200,
        ratingUpdated: state.places && state.places.ratingUpdated,
        insets: state.vk.insets,
        pushLocation: ownProps.history.push
    }
}

class RatingDialog extends Component {
    constructor(props) {
        super(props)

        const value = props.defaultValue || 5
        const comment = props.defaultComment || ''

        this.state = {
            ratingValue: value,
            ratingComment: comment
        }
    }

    render() {
        return (
            <UI.Alert
                actions={[{
                    title: 'Отмена',
                    autoclose: true,
                    action: ()=> {

                    },
                    style: 'cancel'
                }, {
                    title: 'Сохранить',
                    autoclose: true,
                    action: ()=> {
                        this.props.handleSave()
                    },
                    style: 'default'
                }]}
                onClose={ () => this.props.handleClose() }
            >
                <UI.FormLayout>
                    <UI.Slider
                        min={0.5}
                        max={5}
                        value={Number(this.state.ratingValue)}
                        step={0.5}
                        onChange={ratingValue => {
                            this.setState({ratingValue})
                            this.props.handleRatingValueChange(ratingValue)
                        }}
                        top={<p>Моя оценка: <b>{this.state.ratingValue}</b></p>}
                    />
                    <UI.Textarea top="Комментарий"
                                value={this.state.ratingComment}
                                onChange={e => { 
                                    const newText = e.target.value.length > 400 ? 
                                        e.target.value.substring(0, 400) : e.target.value;
                                    this.setState({ratingComment: newText})
                                    this.props.handleRatingCommentChange(newText)
                                }}
                                placeholder="Что понравилось, что можно улучшить" />
                </UI.FormLayout>
            </UI.Alert>
        );
    }
}

export default withRouter(connect(mapStateToProps, {
    getPlaceInfo, updateNavigation, addRating, deleteRating, showImageInVK,
    setLocationForVK, shareVK, goBackVK: goBack, getCommentsForPlace
})(PlacePage))