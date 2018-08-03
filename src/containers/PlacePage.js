import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as UI from '@vkontakte/vkui';

import {getPlaceInfo, addRating, deleteRating} from '../actions/places'
import {updateNavigation, setLocationForVK, shareVK, goBack} from '../actions/vk'

import PlaceComponent from '../components/PlaceComponent'

class PlacePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activePanel: 'loadingPanel',
            ratingDialog: null,
            ratingValue: 5,
            ratingComment: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.placeLoading && !nextProps.placeLoading) {
            this.setState({activePanel: 'mainPanel'})
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
                ratingDialog: null,
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

    render() {
        const {place, userAvatar} = this.props;
        return (
            <UI.View id="mainView" activePanel={this.state.activePanel} popout={this.state.ratingDialog}>
                <PlaceComponent place={place}
                                id="mainPanel"
                                openRatingDialog={this.openRatingDialog}
                                deleteRating={this.deleteRating}
                                goBack={this.goBack}
                                shareVK={this.shareVK}
                                userAvatar={userAvatar}/>
                <UI.Panel id="loadingPanel">
                    <UI.ScreenSpinner />
                </UI.Panel>
            </UI.View>
        )
    }
}

PlacePage.propTypes = {
    place: PropTypes.object,
    placeLoading: PropTypes.bool,
    needBack: PropTypes.bool,
    ratingUpdated: PropTypes.bool,
    userAvatar: PropTypes.string,
    placeId: PropTypes.string.isRequired,
    getPlaceInfo: PropTypes.func.isRequired,
    updateNavigation: PropTypes.func.isRequired,
    addRating: PropTypes.func.isRequired,
    deleteRating: PropTypes.func.isRequired,
    shareVK: PropTypes.func.isRequired,
    goBackVK: PropTypes.func.isRequired,
    setLocationForVK: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        place: state.places && state.places.placeInfo,
        placeLoading: state.places && state.places.placeInfoLoading,
        placeId: ownProps.match.params.placeId,
        needBack: state.vk && state.vk.needBack,
        goBack: ownProps.history.goBack,
        userAvatar: state.auth && state.auth.vkInfo && state.auth.vkInfo.photo_200,
        ratingUpdated: state.places && state.places.ratingUpdated
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
                    style: 'destructive'
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
                                    this.setState({ratingComment: e.target.value})
                                    this.props.handleRatingCommentChange(e.target.value)
                                }}
                                placeholder="Что понравилось, что можно улучшить" />
                </UI.FormLayout>
            </UI.Alert>
        );
    }
}

export default withRouter(connect(mapStateToProps, {
    getPlaceInfo, updateNavigation, addRating, deleteRating, 
    setLocationForVK, shareVK, goBackVK: goBack
})(PlacePage))