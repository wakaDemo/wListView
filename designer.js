(function(wListView) {
    var Template = WAF.require('waf-core/template'),
        options = [];
    
    function parseTemplate(rawTemplate, options, defaultData) {
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

        defaultData.items.forEach(function(item) {
            defaultText += template.render(item);
        });
        
        return {
            attributes: JSON.stringify(attribute),
            defaultText: defaultText
        };
    }

    function updateAttributesList(tag, collectionName) {
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
    }

    function setDesignerHtml(tag, defaultText) {
        var append = false,
            options = tag.getAttributeOptions('data-variables-binding', 1);

        if (options.length === 1 && !options[0].length) {
            tag.updateTemplate('<li><strong style="color:red;">WARN: no collection set or collection not found.</strong></li>');
            append = true;
        }
        
        tag.updateTemplate(defaultText, append);
        
        tag.refresh();
        
        tag.domUpdate();
        
        setTimeout(function() { Designer.tag.refreshPanels(); }, 0);
    }

    wListView.on('Create', function(tag) {
        var templateNum = tag.getAttribute('data-template').getValue(),
            existingBinding = tag.getAttribute('data-variables-binding').getValue(),
            optionsToUpdate = tag.getAttributeOptions('data-variables-binding', 1),
            templateInfo = parseTemplate(tag.getWidget()._templates.list[templateNum].template, optionsToUpdate, tag.getWidget()._templates.defaultData),
            todo = false;

        tag.getWidget()._templates.list.forEach(function(template, i) {
            options.push({
                key: i.toString(),
                value: template.description
            });
        });
        
        // we only need to parse the template on the first creation of the widget (or when the template is changed, but this is done elsewhere)
        try{
            existingBinding = JSON.parse(existingBinding);
            if (existingBinding.length === 0) {
                todo = true;
            }
        } catch(e) {
            todo = true;
        }

        updateAttributesList(tag, tag.getAttribute('data-collection').getValue());

        if (todo === true) {
            tag.getAttribute('data-variables-binding').setValue(templateInfo.attributes);
        }
        
        setDesignerHtml(tag, templateInfo.defaultText);
    });

    wListView.on('Save', function(tag) {
        var node = tag && tag.getElementNode() || null;
        
        if (node && node._json.childNodes) {
            node._json.childNodes.length = 0;
        }
    });
    
    // add Template list
    //
    wListView.addAttribute({
        name: 'data-template',
        type: 'dropdown',
        options: options,
        defaultValue: '0',
        onchange: function(e) {
            var tag = this.data.tag,
                templateNum = this.data.value,
                templateInfo = parseTemplate(tag.getWidget()._templates.list[templateNum].template, tag.getAttributeOptions('data-variables-binding', 1), tag.getWidget()._templates.defaultData);
            
            // TODO: update with correct template
            tag.updateTemplate('Template changed');

            tag.getAttribute('data-variables-binding').setValue(templateInfo.attributes);
            
            setDesignerHtml(tag, templateInfo.defaultText);
        },
        ready: function() {
        }
    });

    wListView.addAttribute({
        name: 'data-variables-binding',
        description: 'Template Variables',
        type: 'grid',
        defaultValue: '[]',
        reloadOnChange: true,
        columns: [
            {
                title: 'Variable Name',
                name: 'variable',
                type: 'textfield',
                disabled: true
            },
            {
                title: 'Attribute',
                name: 'attribute',
                type: 'dropdown',
                options: [""]
            }
        ],
        canDeleteRow: function() {
            return false;
        },
        afterReady: function() {
            // TODO: parse template
            $('#waform-form-gridmanager-template-variables .actions button').hide();
        },
        ready: function() {
        //            $('#waform-form-gridmanager-template-variables').hide();
        }
    });

    // events
    wListView.addEvent({
        'name': 'rowHold',
        'description': 'Sent upon tap hold on a row'
    });

    wListView.addEvent({
        'name': 'rowSwapLeft',
        'description': 'Sent upon left swipe on a row'
    });
    
    wListView.addEvent({
        'name': 'rowSwapRight',
        'description': 'Sent upon right swipe on a row'
    });
    
    wListView.addEvent({
        'name': 'listUpdate',
        'description': 'Sent upon collection change'
    });
    
	wListView.addAttribute('data-collection', {
		typeValue: 'datasource',
		type: 'datasource',
        onchange: function() {
            var tag = this.data.tag,
                widget = tag.getWidget(),
                templateNum = tag.getAttribute('data-template').getValue(),
                optionsToUpdate,
                templateInfo;
            
                optionsToUpdate = tag.getAttributeOptions('data-variables-binding', 1);
                templateInfo = parseTemplate(tag.getWidget()._templates.list[templateNum].template, optionsToUpdate, tag.getWidget()._templates.defaultData);
            
            updateAttributesList(tag, this.getValue());

            tag.getAttribute('data-variables-binding').setValue(templateInfo.attributes);

            setDesignerHtml(tag, templateInfo.defaultText);

            // TODO: by default, every attribute is reseted => we have to set each variables to the first attribute found
            $('#waform-form-gridmanager-template-variables').show();
        }
	});    
});