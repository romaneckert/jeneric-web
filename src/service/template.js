const AbstractService = require('../abstract-service');

class TemplateService extends AbstractService {

    constructor() {
        super();

        this._templates = {};

        $('template').each(function(t, template) {

            let $template = $(template);
            let id = $template.attr('id');

            this._templates[id] = $template;
        }.bind(this));
    }

    getTemplate(id, entity) {

        if('undefined' === typeof this._templates[id]) throw new Error('template with id ' + id + ' does not exist.');

        let $template = $(this._templates[id].html());

        $template.find('[data-attribute]').each(function(i, elem) {

            let $elem = $(elem);
            let attributeName = $elem.attr('data-attribute');
            let attributeMapping = $elem.attr('data-attribute-mapping');

            if(entity[attributeName]) {

                let value = entity[attributeName];

                if('string' === typeof attributeMapping && attributeMapping.length > 0) {

                    let defaultAttribute = $elem.attr(attributeMapping);

                    if('href' === attributeMapping && 'string' === typeof defaultAttribute && -1 !== defaultAttribute.indexOf('#')) {
                        $elem.attr('href', value + defaultAttribute);
                    } else {
                        $elem.attr(attributeMapping, value);
                    }

                } else {
                    $elem.html(value);
                }
            }

        });

        return $template;
    }
}

module.exports = TemplateService;