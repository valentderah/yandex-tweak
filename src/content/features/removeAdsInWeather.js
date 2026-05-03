import {watchUrlChanges} from "../../shared/utils/url";
import {retryClean, clearBlocks} from "../../shared/utils/dom";

const CLASS_PREFIXES = [
    "AppForecastMoney_wrap",
    "MainPage_topBlockWithMoney",
    "AppMoneySidebar",
    "AppMoney_wrap",
];

const isWeatherPage = () => {
    const {hostname, pathname} = window.location;

    if (hostname === "yandex.com" && pathname.startsWith("/weather/")) {
        return true;
    }

    return (
        /^yandex\.(ru|by|kz)$/.test(hostname) &&
        pathname.startsWith("/pogoda/")
    );
};

const getMoneyAdBlocks = () => {
    const blocks = new Set();

    for (const prefix of CLASS_PREFIXES) {
        document
            .querySelectorAll(`[class*="${prefix}"]`)
            .forEach((el) => blocks.add(el));
    }

    return [...blocks];
};

export const initRemoveAdsInWeather = () => {
    if (!isWeatherPage()) {
        return;
    }

    watchUrlChanges({
        handler: retryClean,
        params: {
            getBlocks: getMoneyAdBlocks,
            func: clearBlocks,
        },
        runOnCall: true,
    });
};
