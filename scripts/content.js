YMailManager = function () {
    let self = this;

    this.main_mail_content_selector = '#js-layout-inner'
    this.main_main_header_selector = '#js-mail-layout-content-header'
    this.plans_url = 'https://360.yandex.ru/premium-plans'

    this.mail_adblock = function () {
        let is_mail = document.querySelector(
            self.main_mail_content_selector
        )

        if (is_mail) {

            let r_ads_block = document.querySelector(
                self.main_mail_content_selector
            ).nextSibling

            let t_ads_block = document.querySelector(
                self.main_main_header_selector + '>' + '.message-list-banner-portal'
            ).nextSibling

            window.onload = function () {
                if (
                    r_ads_block.innerHTML.includes(
                        self.plans_url
                    )
                ) {
                    r_ads_block.remove()
                }
                t_ads_block.remove()
            }
        }
    }

    return this
}

YSearchManager = function () {
    let self = this;

    this.one_tab_observe_config = {
        childList: true,
        subtree: true
    }

    this.tabs_selector = '.serp-item_card .Link, .HeaderNav-Tab'
    this.search_contect_selector = 'main__container'
    this.image_contect_selector = 'b-page__content'
    this.video_contect_selector = 'UniApp'

    this.remove_new_tabs = function () {
        let elements = document.querySelectorAll(
            self.tabs_selector
        )

        for (let el of elements) {
            el.removeAttribute('target')
        }
    }

    this.work_in_one_tab = function () {
        let observer = new MutationObserver(
            self.remove_new_tabs
        )
        let content = null;

        for (let s of [
            self.search_contect_selector,
            self.image_contect_selector,
            self.video_contect_selector
        ]) {
            content = document.getElementsByClassName(
                s
            )[0]
            if (content) {
                observer.observe(
                    content,
                    self.one_tab_observe_config
                );
            }
        }
    }

    return this
}

YTweakManager = function () {
    let self = this;

    this.one_tab = function () {
        return new YSearchManager().work_in_one_tab()
    }

    this.mail_adblock = function () {
        return new YMailManager().mail_adblock()
    }

    this.start = function () {
        chrome.storage.sync.get(
            {
                mail_adblock: true,
                one_tab: true
            },
            function (options) {
                let methods = Object.keys(options).filter(
                    key => options[key]
                )
                methods.forEach(
                    method => self[method]()
                )
            }
        )
    }

    return this
}

new YTweakManager().start()