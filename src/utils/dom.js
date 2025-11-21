/**
 * Removes 'target' attribute from elements
 * @param {Object} options
 * @param {HTMLElement[]} options.elements
 */
export const unTarget = ({elements}) => {
    if (!elements) return [];
    elements.forEach((el) => el.removeAttribute("target"));
    return elements;
};

/**
 * Hides elements by setting display: none
 * @param {Object} options
 * @param {HTMLElement[]} options.blocks
 */
export const clearBlocks = ({blocks = []}) => {
    blocks.forEach((block) => {
        if (block?.style) {
            block.style.display = "none";
        }
    });
    return blocks;
};

/**
 * Retries a cleaning function multiple times
 * @param {Object} options
 * @param {Function} options.func Cleaning function
 * @param {Function} options.getBlocks Function to get elements
 * @param {number} options.trys Number of retries
 * @param {number} options.current Current retry count
 * @param {number} options.timeout Timeout between retries
 */
export const retryClean = (
    {
        func,
        getBlocks,
        trys = 5,
        current = 0,
        timeout = 1500,
    }
) => {
    if (current > trys) return;

    func({blocks: getBlocks()});

    setTimeout(() => {
        retryClean({
            func,
            getBlocks,
            trys,
            current: current + 1,
            timeout,
        });
    }, timeout);
};

