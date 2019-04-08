const AbstractService = require('../abstract-service');

class Logger extends AbstractService {
    constructor() {
        super();

        this._config = {
            levels: {
                0: {
                    name: 'emergency',
                    console: true,
                    color: '#D8000C',
                },
                1: {
                    name: 'alert',
                    console: true,
                    color: '#D8000C',
                },
                2: {
                    name: 'critical',
                    console: true,
                    color: '#D8000C',
                },
                3: {
                    name: 'error',
                    console: true,
                    color: '#D8000C',
                },
                4: {
                    name: 'warning',
                    console: true,
                    color: '#9F6000',
                },
                5: {
                    name: 'notice',
                    console: true,
                    color: '#4F8A10',
                },
                6: {
                    name: 'info',
                    console: true,
                    color: '#00529B'
                },
                7: {
                    name: 'debug',
                    console: true,
                    color: '#999999'
                }
            }
        };
    }

    log(message, meta, moduleDefinition, stack, code) {

        let moduleString = ('object' === typeof moduleDefinition) ? moduleDefinition.toString() : '';

        let date = new Date();

        message = this.utils.string.cast(message);

        if ('object' !== typeof stack) {
            stack = this.utils.error.stack(new Error());
            stack.shift();
            stack.shift();
        }

        let output = '';
        output += message.trim() + ' ';
        output += '[' + moduleString + ']';

        // support browsers with console.groupCollapsed not exists
        if ('function' === typeof console.groupCollapsed) {
            console.groupCollapsed('%c ' + output, 'color:' + this._config.levels[code].color + ';');
        } else {
            console.log('%c ' + output, 'color:' + this._config.levels[code].color + ';');
        }

        console.log('type:', this._config.levels[code].name);

        if ('undefined' !== typeof meta) {
            console.log('meta:', meta);
        }

        console.log('stack:', stack);
        console.log('date:', this._dateStringFromDate(date));

        if ('function' === typeof console.groupCollapsed) {
            console.groupEnd();
        } else {
            console.log('------------------------');
        }

    }

    _stackToString(stack) {
        let outputs = [];

        for (let entry of stack) {
            outputs.push(entry.method + ':' + entry.row);
        }

        return outputs.join(' <- ');
    }

    /**
     * @param date
     * @returns {string}
     * @private
     */
    _dateStringFromDate(date) {
        return date.getFullYear()
            + '-'
            + ('0' + (date.getMonth() + 1)).slice(-2)
            + '-'
            + ('0' + date.getDate()).slice(-2)
            + ' '
            + date.toTimeString().slice(0, 8);
    }
}

module.exports = Logger;