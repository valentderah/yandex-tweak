import {storage} from "./utils/storage";
import {DEFAULT_OPTIONS, FEATURES} from "./utils/constants";
import {
    initSearchAdblock,
    initRemoveAdsInMail,
    initOneTabSearch,
} from "./features";

const features = {
    [FEATURES.SEARCH_ADBLOCK]: initSearchAdblock,
    [FEATURES.REMOVE_ADS_IN_MAIL]: initRemoveAdsInMail,
    [FEATURES.ONE_TAB_SEARCH]: initOneTabSearch,
};

const run = async () => {

    const defaults = DEFAULT_OPTIONS.reduce((acc, option) => {
        acc[option.id] = option.checked;
        return acc;
    }, {});

    try {
        const options = await storage.get(defaults);
        const enabledFeatures = Object.keys(options).filter((key) => options[key]);

        enabledFeatures.forEach((key) => {
            if (features[key]) {
                features[key]();
            }
        });
    } catch (e) {
        console.error("Error initializing features:", e);
    }
};

run();
