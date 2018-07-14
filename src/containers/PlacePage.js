import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as UI from '@vkontakte/vkui';

import {getPlaceInfo} from '../actions/places'
import {updateNavigation} from '../actions/vk'

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
    }

    componentDidMount() {
        const {getPlaceInfo, placeId} = this.props
        getPlaceInfo(placeId)
    }

    openRatingDialog = () => {
        this.setState({
            ratingDialog:
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

                      },
                      style: 'destructive'
                    }]}
                    onClose={ () => this.setState({ ratingDialog: null }) }
                >
                    <UI.FormLayout>
                        <UI.Slider
                            min={0.5}
                            max={5}
                            value={Number(this.state.ratingValue)}
                            step={0.5}
                            onChange={ratingValue => this.setState({ratingValue})}
                            top={<p>Моя оценка: <b>{this.state.ratingValue}</b></p>}
                        />
                        <UI.Textarea top="Комментарий"
                                  value={this.state.ratingComment}
                                  onChange={e => { this.setState({ratingComment: e.target.value})}}
                                  placeholder="Что понравилось, что можно улучшить" />
                    </UI.FormLayout>
                </UI.Alert>
        })
    }

    render() {
        const {place, userAvatar} = this.props;
        return (
            <UI.View id="mainView" activePanel={this.state.activePanel} popout={this.state.ratingDialog}>
                <PlaceComponent place={place}
                                id="mainPanel"
                                openRatingDialog={this.openRatingDialog}
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
    userAvatar: PropTypes.string,
    placeId: PropTypes.string.isRequired,
    getPlaceInfo: PropTypes.func.isRequired,
    updateNavigation: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        place: state.places && state.places.placeInfo,
        placeLoading: state.places && state.places.placeInfoLoading,
        placeId: ownProps.match.params.placeId,
        needBack: state.vk && state.vk.needBack,
        goBack: ownProps.history.goBack,
        userAvatar: state.auth && state.auth.vkInfo && state.auth.vkInfo.photo_200
    }
}

export default withRouter(connect(mapStateToProps, {
    getPlaceInfo, updateNavigation
})(PlacePage))