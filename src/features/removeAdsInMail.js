import {retryClean, clearBlocks} from "../utils/dom";

export const initRemoveAdsInMail = () => {
    const selectors = {
        header:
            '#js-mail-layout-content-header>:not([data-react-focus-root="toolbar"]):not(:first-child)',
        content: "#js-layout-inner",
        contentTest: 'div[data-testid="page-layout_right-column_container"]',
    };

    const getMailBlocks = () => {
        const blocks = [];

        const hideTop = document.querySelectorAll(selectors.header);
        if (hideTop.length) {
            blocks.push(...hideTop);
        }

        const content = document.querySelector(selectors.content);
        if (content?.nextSibling) {
            blocks.push(content.nextSibling);
        }

        const contentTest = document.querySelector(selectors.contentTest);
        if (contentTest) {
            blocks.push(contentTest);
        }

        return blocks;
    };

    retryClean({
        func: clearBlocks,
        getBlocks: getMailBlocks,
    });
};
