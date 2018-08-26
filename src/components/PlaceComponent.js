import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as UI from '@vkontakte/vkui';

import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import Icon24Phone from '@vkontakte/icons/dist/24/phone';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Share from '@vkontakte/icons/dist/24/share';
import Icon24Place from '@vkontakte/icons/dist/24/place';

import './PlaceComponent.css'

import {getImageForPlace, getIconForPlace,
    getRatingForPlace, getDateFromTimestamp, getImageUrl, getUrl, getRatingString} from '../helpers/placeUtils'

import icBeer from '../assets/ic_beer_circle.png'
import icWC from '../assets/ic_wc_circle.png'
import icVeg from '../assets/ic_veg_circle.png'
import icCoal from '../assets/ic_coal_circle.png'
import icSupplier from '../assets/ic_supplier_circle.png'
import icCard from '../assets/ic_card_circle.png'
import icHyg from '../assets/ic_hyg_circle.png'

import Footer from './Footer'

const specialsStyle = {
    flexShrink: 0,
    width: 90,
    height: 100,
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 8,
    marginBottom: 8,
    fontSize: 14
  }

const specialsAvatarStyle = {
    marginBottom: 8,
    backgroundColor: 'white'
}

class PlaceComponent extends Component {
    render() {
        const place = this.props.place || {}
        const hasUserInfo = Boolean(this.props.user);
        const user = this.props.user || {}

        const renderComment = (comment) => {
            return (
                <UI.Div key={"comment_" + comment.id}>
                    <UI.Entity photo={getImageUrl(comment.user.photoSmall)}
                               size={64}
                               title={comment.user.firstName + " " + comment.user.lastName}
                               description={<div style={{marginTop: 5}}>
                                    <div className='ratingLabel'>{getRatingString(comment.value)}</div>
                                    {getDateFromTimestamp(comment.date)}
                                </div>}>
                        <div style={{lineHeight: 1.5, fontSize: 14, marginTop: -2}}>{comment.text}</div>
                    </UI.Entity>
                </UI.Div>)
        }

        const hasComments = place.comments && place.comments.length > 0
        const hasSpecials = place.supplierId > 0 || place.hasVisa || place.hasFalafel || place.hasBeer || place.hasWC || place.hasOnCoal || place.hasHygiene

        const isIos = UI.platform() === UI.IOS
        const appLink = isIos ? 'https://itunes.apple.com/ru/app/gde-saverma-poisk-saurmy-v/id1141097185' : 'https://play.google.com/store/apps/details?id=ru.gdeshaverma.android'

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader
                    left={<UI.HeaderButton onClick={this.props.goBack}>{UI.platform() === UI.IOS ? <Icon28ChevronBack /> : <Icon24Back />}</UI.HeaderButton>}
                >{place.name}</UI.PanelHeader>
                <img src={getImageForPlace(place)} className="imageBig" alt={place.name} />
                <UI.Group>
                    <UI.Header>{place.name}</UI.Header>
                    <UI.List className="bottomPaddingGroup">
                        <UI.ListItem before={<Icon24Info />} multiline>{place.description}</UI.ListItem>
                        <UI.ListItem before={<Icon24Place />} multiline onClick={this.props.openPlaceLocation}><UI.Link>Открыть на карте</UI.Link></UI.ListItem>
                        {place.workTime ? <UI.ListItem before={<Icon24Recent />}>{place.workTime}</UI.ListItem> : null }
                        {place.price ? <UI.ListItem before={<Icon24MoneyCircle />}>{place.price}</UI.ListItem> : null }
                        {place.phoneNumber ? <UI.ListItem before={<Icon24Phone />}><UI.Link href={'tel:' + place.phoneNumber} target="_blank">{place.phoneNumber}</UI.Link></UI.ListItem> : null }
                        {place.site ? <UI.ListItem before={<Icon24Globe />}><UI.Link href={getUrl(place.site)} target="_blank">{place.site}</UI.Link></UI.ListItem> : null }
                        <UI.ListItem before={<Icon24View />}>{place.visits}</UI.ListItem>
                    </UI.List>
                </UI.Group>
                <UI.Group>
                    <UI.List style={{paddingTop: 8, paddingBottom: 8}} >
                        <UI.ListItem before={<Icon24Share fill={UI.colors.accentBlue}/>} onClick={this.props.shareVK}><div style={{color: UI.colors.accentBlue}}>Поделиться</div></UI.ListItem>
                    </UI.List>
                </UI.Group>
                <UI.Group title="Рейтинг">
                    <UI.List className="bottomPaddingGroup">
                        <UI.ListItem before={<UI.Avatar type="image" size={64} style={{backgroundColor: 'white'}} src={getIconForPlace(place)} />}
                            description={"Всего оценок: " + place.ratesCount}>{getRatingForPlace(place)}</UI.ListItem>
                    </UI.List>
                </UI.Group>
                {hasSpecials ?
                <UI.Group title="Особенности">
                    <UI.HorizontalScroll className="bottomPaddingGroup">
                        <div style={{ display: 'flex' }}>
                        {place.supplierId > 0 ? 
                            <div style={specialsStyle}>
                                <UI.Avatar size={64} style={specialsAvatarStyle} src={icSupplier}/>
                                Проверенный поставщик
                            </div>
                        : null }
                        {place.hasVisa ? 
                            <div style={specialsStyle}>
                                <UI.Avatar size={64} style={specialsAvatarStyle} src={icCard}/>
                                 Оплата по&nbsp;карте
                            </div>
                        : null }
                        {place.hasFalafel ? 
                            <div style={specialsStyle}>
                                <UI.Avatar size={64} style={specialsAvatarStyle} src={icVeg}/>
                                 Веганские блюда
                            </div>
                        : null }
                        {place.hasBeer ? 
                            <div style={specialsStyle}>
                                <UI.Avatar size={64} style={specialsAvatarStyle} src={icBeer}/>
                                 Пиво
                            </div>
                        : null }
                        {place.hasWC ? 
                            <div style={specialsStyle}>
                                <UI.Avatar size={64} style={specialsAvatarStyle} src={icWC}/>
                                 Туалет
                            </div>
                        : null }
                        {place.hasOnCoal ? 
                            <div style={specialsStyle}>
                                <UI.Avatar size={64} style={specialsAvatarStyle} src={icCoal}/>
                                Готовят на&nbsp;углях
                            </div>
                        : null }
                        {place.hasHygiene ? 
                            <div style={specialsStyle}>
                                <UI.Avatar size={64} style={specialsAvatarStyle} src={icHyg}/>
                                Гигиена на&nbsp;кухне
                            </div>
                        : null }
                        </div>
                    </UI.HorizontalScroll>
                </UI.Group>
                : null }
                {!place.rateByDeviceBanned && hasUserInfo ?
                    <UI.Group title="Мой отзыв">
                        <UI.Div>
                            <UI.Entity
                                photo={this.props.userAvatar}
                                size={64}
                                style={{paddingBottom: 12}}
                                title={`${user.first_name} ${user.last_name}`}
                                description={place.rateByDevice ? <div style={{marginTop: 5}}><div className='ratingLabel'>{getRatingString(place.rateByDevice)}</div>{getDateFromTimestamp(place.rateByDeviceDate)}</div> 
                                : <div style={{fontWeight: 'normal', marginTop: 5}}>Вы еще не поставили оценку</div>}
                                >
                                {place.rateByDeviceText ? <div style={{lineHeight: 1.5, fontSize: 14, marginTop: -2}}>{place.rateByDeviceText}</div> : null}
                                <UI.Button level="buy" 
                                    style={{marginTop: 16}}
                                    onClick={this.props.openRatingDialog}>{place.rateByDevice ? 'Изменить' : 'Оставить отзыв'}</UI.Button>
                                {place.rateByDevice ? <UI.Button level="2" onClick={this.props.deleteRating} className="ratingMarginLeft">Удалить</UI.Button> : null}
                            </UI.Entity>
                        </UI.Div>
                    </UI.Group>
                    : null
                }
                {hasComments ?
                    <UI.Group title="Последние отзывы" className="bottomPaddingGroup">
                        {place.comments.map(renderComment)}
                        {place.commentsCount > 3 ? <UI.Div><UI.Button level="sell" size="xl" component="a" href={appLink} target="_blank">Больше отзывов в приложении</UI.Button></UI.Div> : null}
                    </UI.Group>
                : null}
                {place.lastDiscount ?
                    <UI.Group title="Акции">
                        <UI.Div style={{fontSize: 14, lineHeight: 1.5}}>
                            <img src={getImageUrl(place.lastDiscount.picture)} style={{marginBottom: 10}} className="imageBig" alt={place.name} />
                            {place.lastDiscount.text}<br/>
                            <div style={{color: UI.colors.captionGray, marginTop: 6, marginBottom: 15}}>{getDateFromTimestamp(place.lastDiscount.date)}</div>
                        </UI.Div>
                    </UI.Group>
                    : null }
                <Footer/>
            </UI.Panel>)
    }
}


PlaceComponent.propTypes = {
    place: PropTypes.object,
    user: PropTypes.object,
    userAvatar: PropTypes.string,
    openRatingDialog: PropTypes.func,
    openPlaceLocation: PropTypes.func,
    shareVK: PropTypes.func,
    goBack: PropTypes.func,
    deleteRating: PropTypes.func
}

export default PlaceComponent