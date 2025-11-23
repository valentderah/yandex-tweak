import {storage} from "../shared/utils/storage";
import {DEFAULT_OPTIONS, FEATURES} from "../shared/utils/constants";
import {
    initSearchAdblock,
    initRemoveAdsInMail,
    initOneTabSearch,
} from "./features";

class YandexTweak {
    constructor() {
        this.features = {
            [FEATURES.SEARCH_ADBLOCK]: initSearchAdblock,
            [FEATURES.REMOVE_ADS_IN_MAIL]: initRemoveAdsInMail,
            [FEATURES.ONE_TAB_SEARCH]: initOneTabSearch,
        };
    }

    async run() {
        const defaults = Object.fromEntries(
            DEFAULT_OPTIONS.map(option => [option.id, option.checked])
        );

        try {
            const options = await storage.get(defaults);
            const enabledFeatures = [];

            for (const featureKey in this.features) {
                if (options[featureKey]) {
                    this.features[featureKey]();
                    enabledFeatures.push(featureKey);
                }
            }

            this.logSuccess(enabledFeatures);
        } catch (e) {
            console.error("Error initializing features:", e);
        }
    }

    logSuccess(enabledFeatures) {
        console.log(
            '%c Yandex Tweak %c initialized successfully. Enabled features: %o',
            'background: #FFCC00; color: #333; border-radius: 3px; font-weight: bold;',
            'color: inherit;',
            enabledFeatures
        );
    }
}

const app = new YandexTweak();
app.run();
