import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './Footer.css'

class Footer extends Component {

    render() {
        const isIos = UI.platform() === UI.IOS
        const appLink = isIos ? 'https://itunes.apple.com/ru/app/gde-saverma-poisk-saurmy-v/id1141097185' : 'https://play.google.com/store/apps/details?id=ru.gdeshaverma.android'
        const appStore = isIos ? 'App Store' : 'Google Play'
        return (
            <div className="footer" style={{paddingBottom: 16, paddingTop: 8}}>
                <UI.Button level="3" component="a" href='https://vk.com/gdeshaverma' target="_blank">Группа</UI.Button>
                <UI.Button level="3" component="a" href={appLink} target="_blank">{appStore}</UI.Button>
            </div>
        );
    }
}

export default Footer;