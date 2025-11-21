import {watchUrlChanges} from "../utils/url";
import {unTarget} from "../utils/dom";

export const initOneTabSearch = () => {
    const selectors = {
        tabs: ".serp-item_card .Link, .HeaderNav-Tab",
    };

    const getBlocks = () => {
        const blocks = document.querySelectorAll(selectors.tabs);
        return blocks.length ? [...blocks] : [];
    };

    watchUrlChanges({
        handler: unTarget,
        params: {elements: getBlocks()},
        runOnCall: true,
    });
};
