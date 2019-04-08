class ModuleDefinition {

    constructor() {
        this._type = null;
        this._name = null;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        return this._type = type;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        return this._name = name;
    }

    toString() {
        let parts = [];

        if('string' === typeof this._type) {
            parts.push(this._type);
        }

        if('string' === typeof this._name) {
            parts.push(this._name);
        }

        return parts.join('/');
    }
}

module.exports = ModuleDefinition;