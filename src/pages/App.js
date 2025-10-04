import React, {useState} from 'react';
import useOptions from '../hooks/useOptions';
import t from '../utils/t';
import newTab from "../utils/tab";
// Components
import Button from '../components/Button';
import OptionsList from '../components/OptionsList';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Text from '../components/Text';
import Icon from '../components/Icon';


const App = () => {
    const {options, handleOptionChange} = useOptions();
    const [savedTextClasses, setSavedTextClasses] = useState('ml-1 opacity-0');

    const saveOptions = () => {
        const optionsToSave = options.reduce((acc, option) => {
            acc[option.id] = option.checked;
            return acc;
        }, {});

        const showSaveAnimation = () => {
            setSavedTextClasses('ml-1 fade-in');
            setTimeout(() => {
                setSavedTextClasses('ml-1 fade-out opacity-0');
                setTimeout(() => setSavedTextClasses('ml-1 opacity-0'), 1000);
            }, 3000);
        };

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set(optionsToSave, showSaveAnimation);
        } else {
            showSaveAnimation();
        }
    };

    const openTG = () => {
        return newTab(t('tg_link'))
    };

    return (
        <div id="main" className="container x-padding y-padding">
            <div className="d-flex">
                <Title text={t('title')}/>
            </div>
            <Subtitle text={t('settings')}/>
            <OptionsList options={options} onOptionChange={handleOptionChange}/>
            <div className="d-flex mt-1">
                <Button id="save" text={t('save')} onClick={saveOptions}/>
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
                    onClick={openTG}
                />
            </div>
        </div>
    );
};

export default App;