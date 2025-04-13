YTweakOptions = function () {
    let self = this

    this.y_one_tab_tag = 'y-one-tab'
    this.y_mail_adblock_tag = 'y-mail-adblock'

    this.restore_options = function () {
        chrome.storage.sync.get(
            {
                mail_adblock: true,
                one_tab: true
            }, function (items) {
                document.getElementById(
                    self.y_one_tab_tag
                ).checked = items.one_tab

                document.getElementById(
                    self.y_mail_adblock_tag
                ).checked = items.mail_adblock
            }
        )
    }

    this.save_options = function () {
        let mail_adblock = document.getElementById(
            self.y_mail_adblock_tag
        ).checked

        let one_tab = document.getElementById(
            self.y_one_tab_tag
        ).checked

        chrome.storage.sync.set(
            {
                mail_adblock: mail_adblock,
                one_tab: one_tab
            }, function () {
            }
        )
    }
    return this
}

document.addEventListener(
    'DOMContentLoaded',
    new YTweakOptions().restore_options
)

document.getElementById('save').addEventListener(
    'click',
    new YTweakOptions().save_options
)

