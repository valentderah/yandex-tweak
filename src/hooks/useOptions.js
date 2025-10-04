import { useState, useEffect } from 'react';
import t from '../utils/t';

const useOptions = () => {
    const [options, setOptions] = useState([]);

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

    const saveOptions = (onSuccess) => {
        const optionsToSave = options.reduce((acc, option) => {
            acc[option.id] = option.checked;
            return acc;
        }, {});

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set(optionsToSave, onSuccess);
        } else {
            onSuccess?.();
        }
    };

    return { options, handleOptionChange, saveOptions };
};

export default useOptions;