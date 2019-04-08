const AbstractEntity = require('../abstract-entity');

class Log extends AbstractEntity {

    constructor(code, date, message, meta, module, stack) {

        super();

        this._code = code;
        this._date = date;
        this._message = message;
        this._meta = meta;
        this._module = module;
        this._stack = stack;

    }

    get code() {
        return this._code;
    }

    get date() {
        return this._date;
    }

    get message() {
        return this._message;
    }

    get meta() {
        return this._meta;
    }

    get module() {
        return this._module;
    }

    get stack() {
        return this._stack;
    }

}

module.exports = Log;