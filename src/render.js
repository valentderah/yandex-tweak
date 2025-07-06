const Components = {
    OptionsList: function ({options = []} = {}) {
        return `
            <div class="options-list">
                ${options.map(option => Components.Option(option)).join('')}
            </div>
        `
    },
    Option: function ({id = 'id', text = 'name', checked = false} = {}) {
        return `
            <div class="option">
                <label class="checkbox">
                    <span class="checkmark"></span>
                    <input type="checkbox" class="input-checkbox" id="${id}" ${checked ? 'checked' : ''}/>
                    ${text}
                </label>
            </div>
            `
    },
    Button: function ({id = 'id', text = 'name'} = {}) {
        return `
            <button id="${id}">${text}</button>
        `
    },
    Title: function ({text = 'name'} = {}) {
        return `
            <div class="title">${text}</div>
        `
    },
    Subtitle: function ({text = 'name'} = {}) {
        return `
            <div class="subtitle">${text}</div>
        `
    },
    Text: function ({id='textId', text = 'name', hidden = false, classes = ''} = {}) {
        return `
            <div id="${id}" class="text ${classes}" ${hidden ? 'hidden' : ''}>${text}</div>
        `
    }
}

const messages = {
    // dev i18n
}

const t = (key) => {
    if (chrome.i18n.getMessage(key)) {
        return chrome.i18n.getMessage(key)
    }
    if (messages && messages[key]) {
        return messages[key].message
    }
    return key
}


const saveOptions = function () {
    let options = document.querySelectorAll(
        '.option > .checkbox > .input-checkbox'
    )
    let send = {}

    Array.from(options).map(
        option => {
            send[option.id] = option.checked
        }
    )
    const saveAnim = (
        {el = document.getElementById('saved_text')}
    ) => {
        el.classList.add('fade-in')
        el.classList.remove('opacity-0')
        setTimeout(
            () => {
                el.classList.remove('fade-in')
                el.classList.add('fade-out')
                el.classList.add('opacity-0')
            },
            3000
        )
    }
    chrome.storage.sync.set(send, ()=>{saveAnim({})})

}


const context = {
    options: [
        {
            id: 'one_tab_search',
            text: t('one_tab_search'),
            checked: true
        },
        {
            id: 'remove_ads_in_mail',
            text: t('remove_ads_in_mail'),
            checked: true
        },
        {
            id: 'remove_ads_in_search',
            text: t('remove_ads_in_search'),
            checked: true
        }
    ]
}

const getFromStorage = function (
    {key, def} = {}
) {

    if (chrome.storage) {
        return chrome.storage.sync.get({[key]: def})
    }

    return Promise.resolve({[key]: def})
}

const getContext = function () {
    return new Promise(
        (resolve, reject) => {
            let chain = Promise.resolve()

            context.options.map(
                (option) => {
                    chain = chain.then(
                        () => {
                            return Promise.resolve(
                                getFromStorage(
                                    {key: option.id, def: option.checked}
                                ).then(
                                    (item) => {
                                        option.checked = item[option.id]
                                    }
                                )
                            )
                        }
                    )
                }
            )

            chain.then(
                () => {
                    return resolve(context)
                }
            )
        }
    )
}

const App = {

    events: function () {
        document.getElementById('save').addEventListener(
            'click',
            () => {
                return saveOptions()
            }
        )
    },
    template: function ({context, components}) {
        return `
            <div id="main" class="container x-padding y-padding">
                ${components.Title({text: t('title')})}
                ${components.Subtitle({text: t('settings')})}
                ${components.OptionsList({options: context.options})}
                <div class="d-flex mt-1">
                ${components.Button({id: 'save', text: t('save')})}
                ${components.Text({id: 'saved_text', text: t('params_saved'), classes: 'ml-1 opacity-0'})}
                </div>
               
            </div>
        `
    },
    render: function () {
        getContext().then(
            (context) => {
                document.getElementById('app').innerHTML = App.template(
                    {context: context, components: Components}
                )
                App.events()
            }
        )
    }
}

document.addEventListener(
    'DOMContentLoaded',
    () => {
        App.render()
    }
)