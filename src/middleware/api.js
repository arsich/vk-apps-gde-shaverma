import defaultAuth from '../helpers/defaultAuth'
export const CALL_API = 'call_api'

export default store => next => action => {
    if (!action || !action[CALL_API]) {
        return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = action[CALL_API].types;
    next({...action, type: REQUEST});

    const query = action[CALL_API].query ? {...action[CALL_API].query, regId: getToken(store)} : {};
    const post = action[CALL_API].post ? {method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, body: JSON.stringify({...action[CALL_API].post, regId: getToken(store)})} : {}
    fetch(createUrl(action[CALL_API].endpoint, query), post)
        .then(response => {
            return response.json()
        })
        .then(result => {
            next({...action, result, type: SUCCESS});
        })
        .catch(error => {
            next({...action, error, type: FAILURE});
        });
}

function getToken(store) {
    const state = store.getState()
    return state.auth && state.auth.hasAuth ? state.auth.authInfo.token : defaultAuth.token
}

function createUrl(endpoint, queryObj) {
    const params = queryObj || {}
    let query = ""
    for (let key in params) {
        query += query !== "" ? "&" : "?"
        query += `${key}=${encodeURIComponent(params[key])}`
    }

    return 'https://gdeshaverma.ru/api/v1/' + endpoint + query
}