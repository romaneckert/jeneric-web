module.exports = {
    entities: {
        log: {
            class: require('../entity/log')
        }
    },
    handler: {
        window: {
            error: {
                class: require('../handler/window/error')
            }
        }
    },
    services: {
        logger: {
            class: require('../service/logger')
        },
        template: {
            class: require('../service/template')
        }
    },
    utils: {
        error: {
            class: require('../util/error')
        },
        object: {
            class: require('../util/object')
        },
        string: {
            class: require('../util/string')
        }
    }
};