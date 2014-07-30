(function(wListView) {
    wListView._studioOn('Create', function(tag) {
        var widget = tag.getWidget(),
            template = widget.template;

        // fullsize hack
        setTimeout(function() {
            Designer.env.enableModificationNotification = false;
            tag.fitToParent(true);
            Designer.env.enableModificationNotification = true;
        }, 0);

        widget.template.onChange(function() {
            var elt = $(widget.node),
                str = '',
                i = 0;

            for (i = 0; i < 3; i++) {
                template.defaultData.items.forEach(function(item) {
                    str += template.render(item);
                });
            }

            elt.html(str);
        });
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

    /* Hide not needed options from the user */
    wListView.customizeProperty('start', {
        sourceDisplay: false
    });

    wListView.customizeProperty('currentPage', {
        sourceDisplay: false,
        display: false
    });

    wListView.customizeProperty('pageSize', {
        sourceDisplay: false
    });

    wListView.customizeProperty('navigationMode', {
        sourceDisplay: false,
        display: false
    });

    wListView.customizeProperty('start', {
        display: false
    });

    /* v2 stuff */
});
