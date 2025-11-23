import React, {useCallback} from 'react';

// Hooks
import useOptions from './hooks/useOptions';
import {useSaveAnimation} from './hooks/useSaveAnimation';

// Utils
import {t} from '../shared/utils/i18n';
import {newTab} from "../shared/utils/tabs";

// UI Components
import Button from './components/Button';
import OptionsList from './components/OptionsList';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import Text from './components/Text';
import Icon from './components/Icon';

const App = () => {
    const {options, handleOptionChange, saveOptions} = useOptions();
    const {textClasses, triggerSave, onAnimationEnd} = useSaveAnimation(saveOptions);

    const openTG = useCallback(() => {
        newTab(t('tg_link'));
    }, []);

    return (
        <div id="main" className="container x-padding y-padding">
            <div className="d-flex">
                <Title text={t('title')}/>
            </div>

            <Subtitle text={t('settings')}/>

            <OptionsList
                options={options}
                onOptionChange={handleOptionChange}
            />

            <div className="d-flex mt-1">
                <Button
                    id="save"
                    text={t('save')}
                    onClick={triggerSave}
                />
                <Text
                    id="saved_text"
                    text={t('params_saved')}
                    classes={textClasses}
                    onAnimationEnd={onAnimationEnd}
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
