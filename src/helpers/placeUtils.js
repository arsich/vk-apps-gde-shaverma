import shaOneIcon from '../assets/sha_pin_01.png'
import shaTwoIcon from '../assets/sha_pin_02.png'
import shaThreeIcon from '../assets/sha_pin_03.png'
import shaFourIcon from '../assets/sha_pin_04.png'
import shaFiveIcon from '../assets/sha_pin_05.png'
import shaGoldIcon from '../assets/sha_pin_gold.png'
import shaNewIcon from '../assets/sha_pin_new.png'

export function getIconForPlace(place) {
    if (place.status === "promoted") {
        return shaGoldIcon
    } else if (place.ratesCount < 3) {
        return shaNewIcon
    } else if (place.rate > 4) {
        return shaFiveIcon
    } else if (place.rate > 3) {
        return shaFourIcon
    } else if (place.rate > 2) {
        return shaThreeIcon
    } else if (place.rate > 1) {
        return shaTwoIcon
    } else {
        return shaOneIcon
    }
}

export function getRatingForPlace(place) {
    let rating = "" + place.rate
    if (!place.ratesCount) {
        return "Рейтинг: —"
    }
    rating = rating.substring(0, 4);
    if (rating.endsWith(".0")) {
        rating.replace(".0", "")
    }
    return "Рейтинг: " + rating.replace(".", ",") + " из 5"
}

export function getImageForPlace(place) {
    return `https://gdeshaverma.ru${place.picture}`
}

export function getDateFromTimestamp(timestamp) {
    const date = new Date()
    date.setTime(timestamp * 1000)
    return date.toLocaleDateString()
}

export function getImageUrl(url) {
    if (url.indexOf("http") >= 0) {
        return url
    } else {
        return `https://gdeshaverma.ru${url || '/api/v1/containers/images/download/default.png'}`
    }
}

export function getUrl(url) {
    if (url.indexOf("http") >= 0) {
        return url
    } else {
        return `https://${url}`
    }
}