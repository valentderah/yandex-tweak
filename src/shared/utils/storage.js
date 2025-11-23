export const storage = {
    /**
     * Get items from chrome.storage.sync
     * @param {string|Object|Array} keys - Keys to retrieve
     * @returns {Promise<Object>} - Retrieved items
     */
    get: (keys) => {
        return new Promise((resolve, reject) => {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                chrome.storage.sync.get(keys, (items) => {
                    if (chrome.runtime.lastError) {
                        return reject(chrome.runtime.lastError);
                    }
                    resolve(items);
                });
            } else {
                resolve(keys && typeof keys === 'object' && !Array.isArray(keys) ? keys : {});
            }
        });
    },

    /**
     * Set items to chrome.storage.sync
     * @param {Object} items - Items to save
     * @returns {Promise<void>}
     */
    set: (items) => {
        return new Promise((resolve, reject) => {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                chrome.storage.sync.set(items, () => {
                    if (chrome.runtime.lastError) {
                        return reject(chrome.runtime.lastError);
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
};

