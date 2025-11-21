import {watchUrlChanges} from "./utils/url";
import {unTarget, clearBlocks, retryClean} from "./utils/dom";
import {storage} from "./utils/storage";
import {DEFAULT_OPTIONS} from "./utils/constants";

// --- Features ---

const features = {
    search_adblock: {
        run: () => {
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
        },
    },

    remove_ads_in_mail: {
        run: () => {
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
        },
    },

    one_tab_search: {
        run: () => {
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
        },
    },
};

// --- Initialization ---

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
                features[key].run();
            }
        });
    } catch (e) {
        console.error("Error initializing features:", e);
    }
};

run();
