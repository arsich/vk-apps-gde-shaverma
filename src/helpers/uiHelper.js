class UIHelper {
    setTheme(theme) {
        const newTheme = theme || this.lastTheme
        const schemeAttribute = document.createAttribute('scheme')
        schemeAttribute.value = newTheme
        document.body.attributes.setNamedItem(schemeAttribute)

        this.lastTheme = newTheme
    }
}

export default new UIHelper()