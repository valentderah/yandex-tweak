const search_result = document.getElementsByClassName("main__container")[0]
const config = {childList: true, subtree: true}

const remove_new_tabs = () => {
    const elements = document.querySelectorAll(
        '.serp-item_card .Link, .HeaderNav-Tab'
    )

    for (let el of elements) {
        el.removeAttribute('target')
    }
    console.log('event')
}

if (search_result) {
    const observer = new MutationObserver(
        remove_new_tabs
    )

    observer.observe(
        search_result,
        config
    )
}

remove_new_tabs()