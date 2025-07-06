const YandexTweak = (
    function () {
        let self = this

        self.functions = {
            search_adblock: {
                name: 'search_adblock',
                load_default: true,
                func: function () {
                    let selectors = {
                        ads: '.AdvRsyaCrossPage, .AdvMastHead'
                    }

                    function getBlocks() {
                        return [...document.querySelectorAll(selectors.ads)]
                    }

                    return {
                        getBlocks: getBlocks,
                        run: function () {
                            watchUrlChanges(
                                {
                                    handler: self.retryClean,
                                    params: {
                                        getBlocks: getBlocks,
                                        func: clearBlocks
                                    },
                                    runOnCall: true
                                }
                            )
                        }
                    }
                }
            },
            remove_ads_in_mail: {
                name: 'remove_ads_in_mail',
                load_default: true,
                func: function () {
                    let selectors = {
                        header: '#js-mail-layout-content-header>:not([data-react-focus-root="toolbar"])',
                        content: '#js-layout-inner'
                    }

                    function getMailBlocks() {
                        let blocks = []

                        let hideTop = document.querySelectorAll(
                            selectors.header
                        )

                        if (hideTop.length) {
                            blocks.push(
                                ...hideTop
                            )
                        }

                        blocks.push(
                            document.querySelector(selectors.content)?.nextSibling
                        )

                        return blocks
                    }

                    return {
                        getBlocks: getMailBlocks,
                        run: function () {
                            self.retryClean(
                                {
                                    func: clearBlocks,
                                    getBlocks: getMailBlocks
                                }
                            )
                        }
                    }
                }
            },
            one_tab_search: {
                name: 'one_tab_search',
                load_default: true,
                func: function () {
                    let selectors = {
                        tabs: '.serp-item_card .Link, .HeaderNav-Tab'
                    }

                    function getBlocks() {
                        let blocks = document.querySelectorAll(selectors.tabs)
                        if (blocks.length) {
                            return [...blocks]
                        }
                        return []
                    }

                    return {
                        getBlocks: getBlocks,
                        run: function () {
                            watchUrlChanges(
                                {
                                    handler: unTarget,
                                    params: {elements: getBlocks()},
                                    runOnCall: true
                                }
                            )
                        }
                    }
                }
            }
        }

        self.retryClean = function (
            {func, getBlocks, trys = 5, current = 0}
        ) {

            if (current > trys) return
            func({blocks: getBlocks()})
            current++

            setTimeout(() => {
                    self.retryClean(
                        {
                            func: func,
                            getBlocks: getBlocks,
                            trys: trys,
                            current: current
                        }
                    )
                }, self.defaultTimeout
            )
        }

        self.run = function () {
            let toRun = {}
            for (let func in self.functions) {
                let f = self.functions[func]
                toRun[f.name] = f.load_default
            }

            chrome.storage.sync.get(
                toRun,
                function (options) {
                    let runs = Object.keys(options).filter(
                        key => options[key]
                    )
                    for (let run of runs) {
                        self.functions[run].func().run()
                    }

                }
            )
        }

        self.defaultTimeout = 1500

        return {
            functions: Object.keys(self.functions),
            run: function () {
                return self.run()
            }
        }
    }
)()


function watchUrlChanges(
    {
        handler,
        params = {},
        runOnCall = true,
        interval = 500
    }
) {
    let oldUrl = window.location.href

    if (runOnCall) {
        handler(params)
    }

    return setInterval(() => {
        const newUrl = window.location.href

        if (newUrl !== oldUrl) {
            oldUrl = newUrl
            handler(params)
        }
    }, interval)
}

function unTarget(
    {elements}
) {
    for (let el of elements) {
        el.removeAttribute('target')
    }

    return elements
}

function clearBlocks(
    {blocks = []}
) {
    blocks.forEach(block => {
        if (block && block?.style) {
            block.style.display = 'none'
        }
    })

    return blocks
}

YandexTweak.run()