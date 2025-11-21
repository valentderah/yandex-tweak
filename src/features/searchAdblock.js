import {watchUrlChanges} from "../utils/url";
import {retryClean, clearBlocks} from "../utils/dom";

export const initSearchAdblock = () => {
    const selectors = {
        ads: ".AdvRsyaCrossPage, .AdvMastHead",
    };

    const getBlocks = () => [...document.querySelectorAll(selectors.ads)];

    watchUrlChanges({
        handler: retryClean,
        params: {
            getBlocks,
            func: clearBlocks,
        },
        runOnCall: true,
    });
};
