import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as UI from '@vkontakte/vkui';

import {getDateFromTimestamp, getImageUrl} from '../helpers/placeUtils'

class ProfileComponent extends Component {
    handleShowPlace(place) {
        this.props.handleShowPlace(place)
    }
    render() {
        const {user, profile} = this.props
        if (!user) {
            return null
        }
        const regDate = profile && profile.userInfo.registrationDate

        const renderComment = (comment) => {
            return (
                <UI.Div key={"comment_profile_" + comment.id}
                        onClick={this.handleShowPlace.bind(this, comment.place)}>
                    <UI.Entity
                        photo={getImageUrl(comment.place.picture)}
                        size={64}
                        title={comment.value + " из 5"}
                        description={comment.place.name}>
                        <div>{comment.text}</div>
                    </UI.Entity>
                </UI.Div>)
        }

        const comments = profile && profile.ratingsInfo

        return (
            <UI.Panel id="profilePanel">
                <UI.Group title="Мой профиль">
                    <UI.Div>
                        <UI.Entity
                            photo={user.photo_200}
                            size={64}
                            title={`${user.first_name} ${user.last_name}`}
                            description={regDate ? `Ищет шаверму с ${getDateFromTimestamp(regDate)}` : null}>
                        </UI.Entity>
                    </UI.Div>
                </UI.Group>
                <UI.Group title="Мои оценки">
                    {comments ? comments.map(renderComment) : null}
                </UI.Group>
            </UI.Panel>
        )
    }
}

ProfileComponent.propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object,
    handleShowPlace: PropTypes.func
}

export default ProfileComponent