import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as UI from '@vkontakte/vkui'

import {getDateFromTimestamp, getImageUrl, getRatingString} from '../helpers/placeUtils'

import Footer from './Footer'

import './ProfileComponent.css'

class ProfileComponent extends Component {
    handleShowPlace(place) {
        this.props.handleShowPlace(place)
    }
    handleRefresh() {
        this.props.handleRefresh()
    }
    render() {
        const {user, profile, profileLoading} = this.props
        if (!user) {
            return null
        }
        const regDate = profile && profile.userInfo.registrationDate

        const renderComment = (comment) => {
            return (
                <UI.ListItem
                    multiline
                    key={"comment_profile_" + comment.id}
                    onClick={this.handleShowPlace.bind(this, comment.place)}>
                    <UI.Entity photo={getImageUrl(comment.place.picture)}
                               avatarProps={{size: 64, type: 'image'}}
                               title={comment.place.name}
                               description={<div style={{marginTop: 5}}>
                                    <div className='ratingLabel'>{getRatingString(comment.value)}</div>
                                    {getDateFromTimestamp(comment.date)}
                                </div>}>
                        {comment.text ? 
                            <div style={{lineHeight: 1.5, fontSize: 14, marginTop: -2}}>{comment.text}</div>
                            : null
                        }
                        {comment.answer ? 
                            <div style={{lineHeight: 1.5, fontSize: 14, marginTop: 8, padding: 12, minWidth: 200, backgroundColor: UI.colors.backgroundBlue}}>
                                <div style={{float: 'right', color: UI.colors.captionGray}}>{getDateFromTimestamp(comment.answerDate)}</div>
                                <div style={{fontWeight: 'bold'}}>Ответ&nbsp;заведения</div>
                                <div style={{marginTop: 8}}>{comment.answer}</div>
                            </div>
                        : null}
                    </UI.Entity>
                </UI.ListItem>
            )
        }

        const comments = profile && profile.ratingsInfo

        return (
            <UI.Panel id="profilePanel" className="noPaddingFromPanel">
                <UI.PullToRefresh onRefresh={this.handleRefresh.bind(this)} isFetching={Boolean(profileLoading && profile)}>
                    <UI.Group title="Мой профиль">
                        <UI.List className="bottomPaddingGroup">
                            <UI.ListItem before={<UI.Avatar size={64} src={user.photo_200} />}
                                    title={`${user.first_name} ${user.last_name}`}
                                    description={regDate ? `Ищет шаверму с ${getDateFromTimestamp(regDate)}` : null}>{`${user.first_name} ${user.last_name}`}</UI.ListItem>
                        </UI.List>
                    </UI.Group>
                {comments && comments.length ?
                    <UI.Group title={'Мои оценки: ' + comments.length} className="bottomPaddingGroup">
                            <UI.List>
                                {comments.map(renderComment)}
                            </UI.List>
                    </UI.Group>
                    : !profileLoading
                    ? <UI.Group title={'Мои оценки'}><UI.Div className="bottomPaddingGroup" style={{fontSize: 14, color: UI.colors.captionGray}}>Пока нет оценок</UI.Div></UI.Group>
                    : null
                }
                </UI.PullToRefresh>
                <Footer/>
            </UI.Panel>
        )
    }
}

ProfileComponent.propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object,
    profileLoading: PropTypes.bool,
    handleShowPlace: PropTypes.func,
    handleRefresh: PropTypes.func
}

export default ProfileComponent