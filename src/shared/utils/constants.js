import {t} from './i18n';

export const FEATURES = {
    ONE_TAB_SEARCH: 'one_tab_search',
    REMOVE_ADS_IN_MAIL: 'remove_ads_in_mail',
    SEARCH_ADBLOCK: 'search_adblock'
};

export const DEFAULT_OPTIONS = [
    {id: FEATURES.ONE_TAB_SEARCH, text: t('one_tab_search'), checked: true},
    {id: FEATURES.REMOVE_ADS_IN_MAIL, text: t('remove_ads_in_mail'), checked: true},
    {id: FEATURES.SEARCH_ADBLOCK, text: t('remove_ads_in_search'), checked: true}
];
