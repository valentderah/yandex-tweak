const newTab = (url) => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({url});
    } else {
        window.open(url, '_blank');
    }
    return null
}

export default newTab;

