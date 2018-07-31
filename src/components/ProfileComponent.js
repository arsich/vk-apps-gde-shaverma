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
                <UI.ListItem before={<UI.Avatar type="image" src={getImageUrl(comment.place.picture)} />}
                    key={"comment_profile_" + comment.id}
                    description={comment.place.name}
                    multiline
                    onClick={this.handleShowPlace.bind(this, comment.place)}><div>{comment.value + " из 5"}<br/>{comment.text}</div></UI.ListItem>
            )
        }

        const comments = profile && profile.ratingsInfo

        return (
            <UI.Panel id="profilePanel">
                <UI.Group title="Мой профиль">
                    <UI.Div>
                        <UI.List>
                            <UI.ListItem before={<UI.Avatar size={64} src={user.photo_200} />}
                                    title={`${user.first_name} ${user.last_name}`}
                                    description={regDate ? `Ищет шаверму с ${getDateFromTimestamp(regDate)}` : null}>{`${user.first_name} ${user.last_name}`}</UI.ListItem>
                        </UI.List>
                    </UI.Div>
                </UI.Group>
                <UI.Group title="Мои оценки">
                    <UI.Div>
                        {comments && comments.length ?
                            <UI.List>
                                {comments.map(renderComment)}
                            </UI.List>
                            : <div>Пока нет оценок</div>
                        }
                    </UI.Div>
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