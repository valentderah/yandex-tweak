import React from 'react';

import useOptions from '../hooks/useOptions';
import {useSaveAnimation} from '../hooks/useSaveAnimation';

import t from '../utils/t';
import newTab from "../utils/tab";

// UI Components
import Button from '../components/Button';
import OptionsList from '../components/OptionsList';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Text from '../components/Text';
import Icon from '../components/Icon';


const App = () => {
    const {options, handleOptionChange, saveOptions} = useOptions();
    const {textClasses, triggerSave} = useSaveAnimation(saveOptions);

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
                <Button
                    id="save" text={t('save')}
                    onClick={triggerSave}
                />
                <Text
                    id="saved_text"
                    text={t('params_saved')}
                    classes={textClasses}
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