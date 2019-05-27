import shaOneIcon from '../assets/sha_pin_01.png'
import shaTwoIcon from '../assets/sha_pin_02.png'
import shaThreeIcon from '../assets/sha_pin_03.png'
import shaFourIcon from '../assets/sha_pin_04.png'
import shaFiveIcon from '../assets/sha_pin_05.png'
import shaGoldIcon from '../assets/sha_pin_gold.png'
import shaNewIcon from '../assets/sha_pin_new.png'
import shaPizzaIcon from '../assets/sha_pin_pizza.png'
import shaBurgerIcon from '../assets/sha_pin_burger.png'

export function getIconForPlace(place) {
    if (place.type === "burger") {
        return shaBurgerIcon
    } else if (place.type === "pizza") {
        return shaPizzaIcon
    } else if (place.status === "promoted") {
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

export function getRatingString(value) {
    if (!value) {
        return "—"
    }
    let rating = "" + value
    rating = rating.substring(0, 4);
    if (rating.endsWith(".0")) {
        rating.replace(".0", "")
    }
    return rating.replace(".", ",")
}

export function getImageForPlace(place) {
    if (!place) {
        return 'https://gdeshaverma.ru/api/v1/containers/images/download/default.png'
    }
    return `https://gdeshaverma.ru${place.picture}`
}

export function getDateFromTimestamp(timestamp) {
    if (!timestamp) return ''
    
    const date = new Date()
    date.setTime(timestamp * 1000)
    return date.toLocaleDateString("ru")
}

export function getImageUrl(url) {
    if (url && url.indexOf("http") >= 0) {
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