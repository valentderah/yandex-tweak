import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Button from './components/Button';
import OptionsList from './components/OptionsList';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import Text from './components/Text';
import Icon from './components/Icon';

const messages = {
    // dev i18n
};

const t = (key) => {
    if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage(key)) {
        return chrome.i18n.getMessage(key);
    }
    if (messages && messages[key]) {
        return messages[key].message;
    }
    return key;
};

const App = () => {
    const [options, setOptions] = useState([]);
    const [savedTextClasses, setSavedTextClasses] = useState('ml-1 opacity-0');

    useEffect(() => {
        const defaultOptions = [
            { id: 'one_tab_search', text: t('one_tab_search'), checked: true },
            { id: 'remove_ads_in_mail', text: t('remove_ads_in_mail'), checked: true },
            { id: 'remove_ads_in_search', text: t('remove_ads_in_search'), checked: true }
        ];

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            Promise.all(
                defaultOptions.map(option =>
                    chrome.storage.sync.get({ [option.id]: option.checked })
                        .then(items => ({ ...option, checked: items[option.id] }))
                )
            ).then(setOptions);
        } else {
            setOptions(defaultOptions);
        }
    }, []);

    const handleOptionChange = (changedId) => {
        setOptions(options.map(option =>
            option.id === changedId ? { ...option, checked: !option.checked } : option
        ));
    };

    const saveOptions = () => {
        const optionsToSave = options.reduce((acc, option) => {
            acc[option.id] = option.checked;
            return acc;
        }, {});

        const showSaveAnimation = () => {
            setSavedTextClasses('ml-1 fade-in');
            setTimeout(() => {
                setSavedTextClasses('ml-1 fade-out opacity-0');
                // After fade out animation, reset to just hidden
                setTimeout(() => setSavedTextClasses('ml-1 opacity-0'), 1000);
            }, 3000);
        };
        
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set(optionsToSave, showSaveAnimation);
        } else {
            showSaveAnimation();
        }
    };

    const openTgLink = () => {
        const url = t('tg_link');
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({ url });
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <div id="main" className="container x-padding y-padding">
            <div className="d-flex">
                <Title text={t('title')} />
            </div>
            <Subtitle text={t('settings')} />
            <OptionsList options={options} onOptionChange={handleOptionChange} />
            <div className="d-flex mt-1">
                <Button id="save" text={t('save')} onClick={saveOptions} />
                <Text
                    id="saved_text"
                    text={t('params_saved')}
                    classes={savedTextClasses}
                />
                <Icon
                    id="tg_link"
                    classes="pr-0 pointer"
                    src="./images/icons/tg.svg"
                    width="35px"
                    onClick={openTgLink}
                />
            </div>
        </div>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
