import storage from './storage'
import defaultAuth from './defaultAuth'
import {sendAuthInfo, sendVKInfo, requestUserInfoFromApi} from '../actions/auth'
import {initVK, setTitle, getUserInfo} from '../actions/vk'

const AUTH_USER_KEY = 'key_auth_user'
const VK_INFO_KEY = 'key_vk_user'

class AuthHelper {
    init(store) {
        this.store = store
        this.hasAuth = false
        this.initVkUI()

        const authInfo = storage.get(AUTH_USER_KEY)
        if (authInfo) {
            this.hasAuth = true;
            this.send(sendAuthInfo(authInfo))
            this.send(sendVKInfo(storage.get(VK_INFO_KEY)))
        } else {
            this.requestUserInfoFromVkUi()
        }
    }

    initVkUI() {
        this.send(initVK())
        this.send(setTitle())
    }

    setVkInfo(vkInfo) {
        if (!this.hasAuth) {
            storage.set(VK_INFO_KEY, vkInfo)
            this.send(requestUserInfoFromApi(vkInfo))
        }
    }

    setUserInfoFromApi(result) {
        this.hasAuth = true;
        const authInfo = this.getAuthInfoFromResult(result)
        storage.set(AUTH_USER_KEY, authInfo)
        this.send(sendAuthInfo(authInfo))
    }

    getAuthInfoFromResult(data) {
        const userId = data.result.id
        const token = data.result.device.registrationId
        return {
            userId,
            token
        }
    }

    setDefaultToken() {
        this.hasAuth = true;
        this.send(sendAuthInfo({token: defaultAuth.token}))
    }

    requestUserInfoFromVkUi() {
        this.send(getUserInfo())
    }

    send(message) {
        this.store.dispatch(message)
    }

    isTokenDefault(token) {
        return token === defaultAuth.token
    }

    hasAuthForUser() {
        return this.hasAuth;
    }
}

export default new AuthHelper()