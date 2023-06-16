import { getHud, getSetting, MODULE_ID } from './module.js'

let holding = false

export function registerKeybindings() {
    register('hold', {
        onDown: () => {
            holding = true
            if (getSetting('use-holding') !== 'none') getHud().render()
        },
        onUp: () => {
            holding = false
        },
    })

    register('filter', {
        onDown: () => {
            getHud().showFilter()
        },
        editable: [
            {
                key: 'KeyF',
                modifiers: ['Control'],
            },
        ],
    })
}

export function isHolding() {
    return holding
}

function path(bind, key) {
    return `${MODULE_ID}.keybinds.${bind}.${key}`
}

function register(name, extras = {}) {
    game.keybindings.register(MODULE_ID, name, {
        name: path(name, 'name'),
        hint: path(name, 'hint'),
        precedence: CONST.KEYBINDING_PRECEDENCE.PRIORITY,
        ...extras,
    })
}
