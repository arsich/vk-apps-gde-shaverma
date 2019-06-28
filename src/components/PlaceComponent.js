import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as UI from '@vkontakte/vkui';
import ReactDOM from 'react-dom';

import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import Icon24Phone from '@vkontakte/icons/dist/24/phone';
import Icon24Link from '@vkontakte/icons/dist/24/link';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Share from '@vkontakte/icons/dist/24/share';
import Icon24Place from '@vkontakte/icons/dist/24/place';

import './PlaceComponent.css'

import {getImageForPlace, getIconForPlace,
    getRatingForPlace, getDateFromTimestamp, getImageUrl, getUrl, getRatingString} from '../helpers/placeUtils'

import {truncateText} from '../helpers/common'

import icBeer from '../assets/ic_beer.png'
import icWC from '../assets/ic_toilet.png'
import icVeg from '../assets/ic_vegan.png'
import icCoal from '../assets/ic_fire.png'
import icSupplier from '../assets/ic_meat.png'
import icCard from '../assets/ic_card.png'
import icHyg from '../assets/ic_hygene.png'

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
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.tryToLoadMore = this.tryToLoadMore.bind(this);

        const before = props.placeComments &&  props.placeComments[0] ? props.placeComments[0].date : 0;
        this.state = {
            pageNumber: 0,
            before: before
        }
    }
    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling.bind(this));
    }
    
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling.bind(this));
    }

    trackScrolling() {
        try {
            const element = ReactDOM.findDOMNode(this.containerRef.current).firstChild;
            const isBottom = window.scrollY + window.innerHeight >= element.scrollHeight
            if (isBottom) {
                this.tryToLoadMore();
            }
        } catch (e) {

        }
    }

    tryToLoadMore() {
        const {noMoreComments, placeLoading, getCommentsForPlace} = this.props;
        const {pageNumber, before} = this.state;
        if (!placeLoading && !noMoreComments) {
            getCommentsForPlace(pageNumber, before);
            this.setState({
                pageNumber: pageNumber + 1
            })
        }
    }

    render() {
        const place = this.props.place || {};
        const hasUserInfo = Boolean(this.props.user);
        const user = this.props.user || {};
        const placeComments = this.props.placeComments || [];
        const commentsLoading = Boolean(this.props.commentsLoading);

        const renderReview = (review) => {
            const url = review.reviewer.name === "emshavermu" ? "https://vk.com/emshavermu" : review.url;
            return (
                <div key={"review_" + review.id}>
                    <UI.ListItem before={<UI.Avatar size={36} src={getImageUrl(review.reviewer.picture)} />}
                        onClick={() => {window.open(url, "_self")}}
                        description={getDateFromTimestamp(review.date)}><UI.Link>{review.reviewer.name}</UI.Link></UI.ListItem>
                    <UI.Div style={{lineHeight: 1.5, fontSize: 14, marginTop: -16}}>{review.text}</UI.Div>
                </div>)
        }

        const renderComment = (comment) => {
            return (
                <UI.Cell
                    key={"comment_" + comment.id}
                    before={<UI.Avatar size={72}  src={getImageUrl(comment.user.photoSmall)} />}
                    description={<div style={{marginTop: 4}}>
                                    <div className='ratingLabel'>{getRatingString(comment.value)}</div>
                                    {getDateFromTimestamp(comment.date)}
                                </div>}
                    size="l"
                    bottomContent={
                        <div style={{}}>
                            <div style={{lineHeight: 1.5, fontSize: 14, marginTop: -2}}>{comment.text}</div>
                            {comment.answer ? 
                                <div style={{lineHeight: 1.5, fontSize: 14, marginTop: 8, padding: 12, minWidth: 200, backgroundColor: UI.colors.backgroundBlue}}>
                                    <div style={{float: 'right', color: UI.colors.captionGray}}>{getDateFromTimestamp(comment.answerDate)}</div>
                                    <div style={{fontWeight: 'bold'}}>Ответ заведения</div>
                                    <div style={{marginTop: 8}}>{comment.answer}</div>
                                </div>
                            : null}
                        </div>
                    }
                    multiline>
                    {comment.user.firstName + " " + comment.user.lastName}
                </UI.Cell>
            )
        }

        const hasComments = placeComments && placeComments.length > 0
        const hasReviews = place.reviews && place.reviews.length > 0
        const hasSpecials = place.supplierId > 0 || place.hasVisa || place.hasFalafel || place.hasBeer || place.hasWC || place.hasOnCoal || place.hasHygiene

        const title = UI.platform() === UI.IOS ? truncateText(place.name, 18) : place.name
        const description = place.description || '—'

        return (
            <UI.Panel id={this.props.id} ref={this.containerRef}>
                <UI.PanelHeader
                    left={<UI.HeaderButton onClick={this.props.goBack}>{UI.platform() === UI.IOS ? <Icon28ChevronBack /> : <Icon24Back />}</UI.HeaderButton>}
                >{title}</UI.PanelHeader>
                <img src={getImageForPlace(place)} className="imageBig" alt={place.name} onClick={this.props.showImageInVK.bind(this, getImageForPlace(place))} />
                <UI.Group>
                    <UI.Header>{place.name}</UI.Header>
                    <UI.List className="bottomPaddingGroup">
                        <UI.ListItem before={<Icon24Info />} multiline>{description}</UI.ListItem>
                        <UI.ListItem before={<Icon24Place />} multiline onClick={this.props.openPlaceLocation}><UI.Link>Открыть на карте</UI.Link></UI.ListItem>
                        {place.workTime ? <UI.ListItem before={<Icon24Recent />}>{place.workTime}</UI.ListItem> : null }
                        {place.price ? <UI.ListItem before={<Icon24MoneyCircle />}>{place.price}</UI.ListItem> : null }
                        {place.phoneNumber ? <UI.ListItem before={<Icon24Phone />}><UI.Link href={'tel:' + place.phoneNumber} target="_blank">{place.phoneNumber}</UI.Link></UI.ListItem> : null }
                        {place.site ? <UI.ListItem before={<Icon24Link />}><UI.Link href={getUrl(place.site)} target="_blank">{place.site}</UI.Link></UI.ListItem> : null }
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
                        <UI.ListItem before={<UI.Avatar type="image" size={64} style={{backgroundColor: 'var(--background_content)'}} src={getIconForPlace(place)} />}
                            description={"Всего оценок: " + place.ratesCount}>{getRatingForPlace(place)}</UI.ListItem>
                    </UI.List>
                </UI.Group>
                {hasSpecials ?
                <UI.Group>
                    <UI.List className="paddingGroup">
                        {place.supplierId > 0 ? 
                            <UI.Cell before={<UI.Avatar src={icSupplier} type={"image"} />}>Проверенный поставщик</UI.Cell>
                        : null }
                        {place.hasVisa ? 
                            <UI.Cell before={<UI.Avatar src={icCard} type={"image"} />}>Оплата по&nbsp;карте</UI.Cell>
                        : null }
                        {place.hasFalafel ? 
                            <UI.Cell before={<UI.Avatar src={icVeg} type={"image"} />}>Вегетарианские блюда</UI.Cell>
                        : null }
                        {place.hasBeer ? 
                            <UI.Cell before={<UI.Avatar src={icBeer} type={"image"} />}>Пиво</UI.Cell>
                        : null }
                        {place.hasWC ? 
                            <UI.Cell before={<UI.Avatar src={icWC} type={"image"} />}>Туалет</UI.Cell>
                        : null }
                        {place.hasOnCoal ? 
                            <UI.Cell before={<UI.Avatar src={icCoal} type={"image"} />}>Готовят на&nbsp;углях</UI.Cell>
                        : null }
                        {place.hasHygiene ? 
                            <UI.Cell before={<UI.Avatar src={icHyg} type={"image"} />}>Гигиена на&nbsp;кухне</UI.Cell>
                        : null }
                    </UI.List>
                </UI.Group>
                : null }
                {hasReviews ?
                    <UI.Group className="bottomPaddingGroup">
                        {place.reviews.map(renderReview)}
                    </UI.Group>
                : null}
                {!place.rateByDeviceBanned && hasUserInfo ?
                    <UI.Group title="Мой отзыв">
                        <UI.Cell
                            before={<UI.Avatar size={72}  src={getImageUrl(this.props.userAvatar)} />}
                            description={place.rateByDevice ? <div style={{marginTop: 5}}><div className='ratingLabel'>{getRatingString(place.rateByDevice)}</div>{getDateFromTimestamp(place.rateByDeviceDate)}</div> 
                                : <div style={{fontWeight: 'normal', marginTop: 5}}>Вы еще не поставили оценку</div>}
                            size="l"
                            bottomContent={
                                <div style={{}}>
                                    {place.rateByDeviceText ? <div style={{lineHeight: 1.5, fontSize: 14, marginTop: -2}}>{place.rateByDeviceText}</div> : null}
                                    <UI.Button level="buy" 
                                        style={{marginTop: 16}}
                                        onClick={this.props.openRatingDialog}>{place.rateByDevice ? 'Изменить' : 'Оставить отзыв'}</UI.Button>
                                    {place.rateByDevice ? <UI.Button level="2" onClick={this.props.deleteRating} className="ratingMarginLeft">Удалить</UI.Button> : null}
                                </div>
                            }
                            multiline>
                            {`${user.first_name} ${user.last_name}`}
                        </UI.Cell>
                    </UI.Group>
                    : null
                }
                {place.lastDiscount ?
                    <UI.Group title="Акции">
                        <UI.Div style={{fontSize: 14, lineHeight: 1.5}}>
                            <img src={getImageUrl(place.lastDiscount.picture)} style={{marginBottom: 10}} className="imageBig" alt={place.name} />
                            {place.lastDiscount.text}<br/>
                            <div style={{color: UI.colors.captionGray, marginTop: 6, marginBottom: 15}}>{getDateFromTimestamp(place.lastDiscount.date)}</div>
                        </UI.Div>
                    </UI.Group>
                    : null }
                {hasComments ?
                    <UI.Group title="Отзывы" className="bottomPaddingGroup">
                        {placeComments.map(renderComment)}
                        {commentsLoading ? <UI.Div><UI.Spinner size="regular" style={{ marginTop: 20 }} /></UI.Div>
                        : null}
                    </UI.Group>
                : null}
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
    getCommentsForPlace: PropTypes.func,
    shareVK: PropTypes.func,
    goBack: PropTypes.func,
    showImageInVK: PropTypes.func,
    commentsLoading: PropTypes.bool,
    noMoreComments: PropTypes.bool,
    placeComments: PropTypes.array,
    deleteRating: PropTypes.func
}

export default PlaceComponent