export function checkIfIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

export function notInVK() {
    var isClient = typeof window !== 'undefined';
    var androidBridge = isClient && window.AndroidBridge;
    var iosBridge = isClient && window.webkit && window.webkit.messageHandlers;
    var isDesktop = !androidBridge && !iosBridge;
    return isDesktop && !checkIfIframe();
}