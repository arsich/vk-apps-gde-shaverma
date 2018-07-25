import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as UI from '@vkontakte/vkui';

import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import Icon24Phone from '@vkontakte/icons/dist/24/phone';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';

import './PlaceComponent.css'

import {getImageForPlace, getIconForPlace,
    getRatingForPlace, getDateFromTimestamp, getImageUrl, getUrl} from '../helpers/placeUtils'

import icBeer from '../assets/ic_beer_circle.png'
import icWC from '../assets/ic_wc_circle.png'
import icVeg from '../assets/ic_veg_circle.png'
import icCoal from '../assets/ic_coal_circle.png'
import icSupplier from '../assets/ic_supplier_circle.png'
import icCard from '../assets/ic_card_circle.png'
import icHyg from '../assets/ic_hyg_circle.png'

class PlaceComponent extends Component {
    render() {
        const place = this.props.place || {}

        const renderComment = (comment) => {
            return (
                <UI.Div  key={"comment_" + comment.id}>
                    <UI.Entity photo={getImageUrl(comment.user.photoSmall)}
                               size={64}
                               title={comment.value + " из 5"}
                               description={comment.user.firstName + " " + comment.user.lastName + " " + getDateFromTimestamp(comment.date)}>
                        <div>{comment.text}</div>
                    </UI.Entity>
                </UI.Div>)
        }

        const hasComments = place.comments.length > 0
        const hasSpecials = place.supplierId > 0 || place.hasVisa || place.hasFalafel || place.hasBeer || place.hasWC || place.hasOnCoal || place.hasHygiene

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    {place.name}
                </UI.PanelHeader>
                <img src={getImageForPlace(place)} className="imageBig" alt={place.name} />
                <UI.Group title={place.description}>
                    <UI.List>
                        <UI.ListItem before={<Icon24View />}>{place.visits}</UI.ListItem>
                        {place.workTime ? <UI.ListItem before={<Icon24Recent />}>{place.workTime}</UI.ListItem> : null }
                        {place.price ? <UI.ListItem before={<Icon24MoneyCircle />}>{place.price}</UI.ListItem> : null }
                        {place.phoneNumber ? <UI.ListItem before={<Icon24Phone />}>{place.phoneNumber}</UI.ListItem> : null }
                        {place.site ? <a href={getUrl(place.site)} target="_blank"><UI.ListItem before={<Icon24Globe />}>{place.site}</UI.ListItem></a> : null }
                    </UI.List>
                </UI.Group>
                {!place.rateByDeviceBanned ?
                    <UI.Group title="Мой отзыв">
                        <UI.Div>
                            <UI.Entity
                                photo={this.props.userAvatar}
                                size={64}
                                title={place.rateByDevice ? `Оценка ${place.rateByDevice} из 5` : 'Вы еще не поставили оценку'}
                                description={place.rateByDeviceText}>
                                <UI.Button level="buy" onClick={this.props.openRatingDialog}>{place.rateByDevice ? 'Изменить' : 'Оставить отзыв'}</UI.Button>
                                {place.rateByDevice ? <UI.Button level="2" onClick={this.props.deleteRating} className="ratingMarginLeft">Удалить</UI.Button> : null}
                            </UI.Entity>
                        </UI.Div>
                    </UI.Group>
                    : null
                }
                <UI.Group title="Рейтинг">
                    <UI.Div>
                        <UI.Entity
                            photo={getIconForPlace(place)}
                            size={64}
                            title={getRatingForPlace(place)}
                            description={"Человек оценило: " + place.ratesCount}>
                        </UI.Entity>
                    </UI.Div>
                </UI.Group>
                {hasSpecials ?
                <UI.Group title="Особенности">
                    <UI.List>
                        {place.supplierId > 0 ? <UI.ListItem before={<UI.Avatar src={icSupplier} />}>Проверенный поставщик</UI.ListItem> : null }
                        {place.hasVisa ? <UI.ListItem before={<UI.Avatar src={icCard} />}>Оплата по карте</UI.ListItem> : null }
                        {place.hasFalafel ? <UI.ListItem before={<UI.Avatar src={icVeg} />}>Вегетарианские блюда</UI.ListItem> : null }
                        {place.hasBeer ? <UI.ListItem before={<UI.Avatar src={icBeer} />}>Пиво</UI.ListItem> : null }
                        {place.hasWC ? <UI.ListItem before={<UI.Avatar src={icWC} />}>Туалет</UI.ListItem> : null }
                        {place.hasOnCoal ? <UI.ListItem before={<UI.Avatar src={icCoal} />}>Готовят на углях</UI.ListItem> : null }
                        {place.hasHygiene ? <UI.ListItem before={<UI.Avatar src={icHyg} />}>Гигиена на кухне</UI.ListItem> : null }
                    </UI.List>
                </UI.Group>
                : null }
                {hasComments ?
                    <UI.Group title="Последние отзывы">
                        {place.comments.map(renderComment)}
                    </UI.Group>
                : null}
                {place.lastDiscount ?
                    <UI.Group title="Акции">
                        <UI.Div>
                            <div>
                                {getDateFromTimestamp(place.lastDiscount.date)}
                                <img src={getImageUrl(place.lastDiscount.picture)} className="imageBig" alt={place.name} />
                                <p>{place.lastDiscount.text}</p>
                            </div>
                        </UI.Div>
                    </UI.Group>
                    : null }
            </UI.Panel>)
    }
}


PlaceComponent.propTypes = {
    place: PropTypes.object,
    userAvatar: PropTypes.string,
    openRatingDialog: PropTypes.func,
    deleteRating: PropTypes.func
}

export default PlaceComponent