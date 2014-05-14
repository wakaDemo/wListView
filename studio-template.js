/* This file contains helper methods that won't be needed in future version of WAF */
WAF.define('wListView/studio-template', function() {
    var Template = WAF.require('waf-core/template');

    return {
        parseTemplate: function(rawTemplate, options, defaultData) {
            var attribute = [],
              template = new Template(rawTemplate),
              variablesList = template.getVariables(),
              defaultText = '';

            variablesList.sort().forEach(function(varName) {
              attribute.push({
                  variable: varName,
                  attribute: options[0]
              });
            });

            for (var i = 0; i < 3; i++) {
                defaultData.items.forEach(function(item) {
                  defaultText += template.render(item);
                });
            }

            return {
              attributes: JSON.stringify(attribute),
              defaultText: defaultText,
              variables: variablesList
            };
        },

        updateAttributesList: function(tag, collectionName) {
            var ds = D.env.ds.catalog.getByName(collectionName),
              options = tag.getAttributeOptions('data-variables-binding', 1);

            if (ds) {
              options.length = 0;

              ds.getAttributes().forEach(function(attribute) {
                  if (attribute.scope === 'public') {
                      options.push(attribute.name);
                  }
              });
            } else {
              options.length = 0;
              options.push("");
            }
        },

        setDesignerHtml: function(tag, defaultText) {
            var append = false,
                options = tag.getAttributeOptions('data-variables-binding', 1);

            tag.updateTemplate(defaultText, append);

            tag.refresh();

            tag.domUpdate();

            setTimeout(function() { Designer.tag.refreshPanels(); }, 0);
        },

        setVariablesBinding: function(tag, options, previousOptions) {
            var widget = tag.getWidget(),
                templateNum = tag.getAttribute('data-template').getValue(),
                templateInfo = this.parseTemplate(widget._templates.list[templateNum].template, options, widget._templates.defaultData);

            tag.getAttribute('data-variables-binding').setValue(typeof previousOptions !== 'undefined' ? previousOptions : templateInfo.attributes);

            this.setDesignerHtml(tag, templateInfo.defaultText);

            // TODO: by default, every attribute is reseted => we have to set each variables to the first attribute found
            $('#waform-form-gridmanager-template-variables').show();
        },

        DSChanged: function(tag, collectionName) {
            var widget = tag.getWidget(),
                templateNum = tag.getAttribute('data-template').getValue(),
                optionsToUpdate = tag.getAttributeOptions('data-variables-binding', 1);

            // update attribute list
            this.updateAttributesList(tag, collectionName);

            // update variable binding object
            this.setVariablesBinding(tag, optionsToUpdate);
        }
    };
});
