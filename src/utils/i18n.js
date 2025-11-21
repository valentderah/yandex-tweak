const messages = {
    // dev i18n
};

export const t = (key) => {
    if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage(key)) {
        return chrome.i18n.getMessage(key);
    }
    if (messages && messages[key]) {
        return messages[key].message;
    }
    return key;
};

export default t;

