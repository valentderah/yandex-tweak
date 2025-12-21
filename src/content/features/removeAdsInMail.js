import {retryClean, clearBlocks} from "../../shared/utils/dom";

export const initRemoveAdsInMail = () => {
    const selectors = {
        content: "#js-layout-inner",
        rightBanner: 'div[data-testid*="page-layout_right-column_container"]',
        searchBanner: '[id*="js-mail-layout-content-header"]>:not([data-react-focus-root="toolbar"]):not(:first-child)',
    };

    const getMailBlocks = () => {
        const blocks = [];

        const searchBanner = document.querySelectorAll(selectors.searchBanner);
        if (searchBanner.length) {
            blocks.push(...searchBanner);
        }

        let content = document.querySelector(selectors.content);

        while (content?.nextSibling) {
            blocks.push(content.nextSibling);
            content = content?.nextSibling;
        }

        const rightBanner = document.querySelector(selectors.rightBanner);
        if (rightBanner) {
            blocks.push(rightBanner);
        }

        return blocks;
    };

    retryClean({
        func: clearBlocks,
        getBlocks: getMailBlocks,
    });
};
