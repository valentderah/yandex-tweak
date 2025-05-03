function watchUrlChanges(
    {
        handler,
        runOnCall = true,
        interval = 500
    } = {}
) {
    let oldUrl = window.location.href;

    if (runOnCall) {
        handler()
    }

    return setInterval(() => {
        const newUrl = window.location.href;

        if (newUrl !== oldUrl) {
            oldUrl = newUrl;
            handler()
        }
    }, interval)

}

const yAdblock = {
    mainMailContentSelector: '#js-layout-inner',
    mainMailHeaderSelector: '#js-mail-layout-content-header',
    trys: 3,
    i: null,

    clearBlocks: function ({blocks = [], clearInterval_ = true}) {
        yAdblock.trys--

        if (clearInterval_ && yAdblock.i && yAdblock.trys <= 0) {
            clearInterval(yAdblock.i)
            yAdblock.i = null
        }

        if (!blocks) {
            return
        }

        blocks.forEach(block => {
            if (block && block?.style) {
                block.style.display = 'none'
            }
        })

    },
    getMailBlocks: function () {
        let blocks = []

        blocks.push(
            document.querySelector(
                yAdblock.mainMailHeaderSelector + '>' +
                '.message-list-banner-portal'
            )?.nextSibling
        )

        blocks.push(document.querySelector(
            yAdblock.mainMailContentSelector
        )?.nextSibling)

        return blocks
    },
    mailAdblock: function () {
        if (!window.location.href.includes('mail.yandex')) return

        return yAdblock.i = setInterval(
            () => {
                yAdblock.clearBlocks(
                    {
                        blocks: yAdblock.getMailBlocks()
                    }
                )
            }, 2000
        )
    },
    run: function () {
        setTimeout(() => {
            yAdblock.mailAdblock()
        }, 500)

    }
}
const yOneTab = {
    tabsSelector: '.serp-item_card .Link, .HeaderNav-Tab',
    i: null,
    remove_new_tabs: function () {
        let elements = document.querySelectorAll(
            yOneTab.tabsSelector
        )

        for (let el of elements) {
            el.removeAttribute('target')
        }
    },
    run: function () {
        if (yOneTab.i) {
            clearInterval(yOneTab.i)
        }

        yOneTab.i = watchUrlChanges(
            {handler: yOneTab.remove_new_tabs}
        )

        return yOneTab.i
    }
}

const yTweak = {
    context: {
        toRun: {
            one_tab_search: true,
            remove_ads_in_mail: true
        }
    },
    remove_ads_in_mail: function () {
        new yAdblock.run()
    },
    one_tab_search: function () {
        return yOneTab.run()
    },
    run: function () {
        chrome.storage.sync.get(
            yTweak.context.toRun,
            function (options) {
                let methods = Object.keys(options).filter(
                    key => options[key]
                )
                methods.forEach(
                    method => yTweak[method]()
                )
            }
        )
    }
}

yTweak.run()