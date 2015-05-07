(function(ListView) {

    // mobile events
    /* ListView.addEvents([{
        'name': 'rowHold',
        'description': 'Sent upon tap hold on a row',
        'category': 'List View Events'
    }, {
        'name': 'rowSwapLeft',
        'description': 'Sent upon left swipe on a row',
        'category': 'List View Events'
    }, {
        'name': 'rowSwapRight',
        'description': 'Sent upon right swipe on a row',
        'category': 'List View Events'
    }]); */

   // desktop events
    ListView.addEvents([{
        'name': 'onRowClick',
        'description': 'Sent upon clik on a row',
        'category': 'List View Events'
    }]);


    ListView.setWidth('300');
    ListView.setHeight('300');

    ListView.addStates(':hover', ':active', ':disabled');

    ListView.customizeProperty('scrollTimeAnimation', {
        title: 'scroll time animation',
        description: 'scroll time animation'
    });

    ListView.customizeProperty('rowHeight', {
        title: 'row height',
        description: 'row height'
    });

    ListView.doAfter('init', function() {
        var that = this;
        this.scrollTimeAnimation.hide();

        var intervalId;
        intervalId = window.setInterval(function() {
            if($(that.node).height()) {
                render.call(that);
                clearInterval(intervalId);
            }
        }, 100);
        this.template.onChange(function() {
            // get rowHeight for selected template
            var rowHeight = that.rowHeight();
            that.template.templates().forEach(function(template) {
                if(template.template === that.template()) {
                    rowHeight = template.rowHeight;
                }
            });
            if(rowHeight && that.rowHeight() !== rowHeight) {
                that.rowHeight(rowHeight);
            } else {
                render.call(that);
            }
        }.bind(this), this);
        this.rowHeight.onChange(render, this);
        this.subscribe('datasourceBindingChange', 'items', function() { setTimeout(render.bind(this), 0); }, this);
    });

    ListView.studioOnResize(render);

    function render(event) {
        var html = '',
            nbRow = Math.ceil($(this.node).height() / this.getRowSize());

        var attr = {};
        if(this.isHorizontalScroll()) {
            attr = { moving: 'left', size: 'width' };
        } else {
            attr = { moving: 'top', size: 'height' };
        }

        for (var i = 0; i < nbRow; i++) {
            var element = this.template.defaultData.items[0];
            element._style = attr.moving + ': ' + i * this.getRowSize() + 'px; ' +
                attr.size + ': ' + this.getRowSize() + 'px;';

            html += this.template.render(element);
        }
        this.getItems().remove();
        $(this.getScrolledNode()).append(html);
    }
});
