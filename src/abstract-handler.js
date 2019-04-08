const Abstract = require('./abstract');

class AbstractHandler extends Abstract {
    constructor() {
        super();

        this._moduleDefinition.type = 'handler';
    }
}

module.exports = AbstractHandler;