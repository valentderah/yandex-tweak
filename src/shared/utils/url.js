/**
 * Watches for URL changes and executes a handler
 * @param {Object} options
 * @param {Function} options.handler Function to call
 * @param {Object} options.params Parameters to pass to handler
 * @param {boolean} options.runOnCall Whether to run immediately
 * @param {number} options.interval Check interval in ms
 */
export const watchUrlChanges = (
    {
        handler,
        params = {},
        runOnCall = true,
        interval = 500,
    }
) => {
    let oldUrl = window.location.href;

    if (runOnCall) {
        handler(params);
    }

    return setInterval(() => {
        const newUrl = window.location.href;

        if (newUrl !== oldUrl) {
            oldUrl = newUrl;
            handler(params);
        }
    }, interval);
};

