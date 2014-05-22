WAF.define(
'wListView',
[
    'waf-core/widget',
    'wListView/templates',
    'waf-behavior/source-navigation',
    'wListView/behavior/layout-template',
],
function(Widget, defaultTemplates, navBehavior, layoutBehavior) {
    var maxPixels = 120,
        throttleDelay = 100,
        wListViewV2 = Widget.create('wListView', undefined, {
            tagName: 'ul',
            
            /*** prototype ***/
            init: function() {
                var that = this;

                // source-nagivation configuration
                this.navigationMode('loadmore');
                this.linkParentElementToNavigation(this.node);
                this.linkDatasourcePropertyToNavigation('collection');
                
                this.bindDomEvents();

                this.subscribe('beforeFetch', this.appendLoader.bind(this));
                
                this.subscribe('afterFetch', this.removeLoader.bind(this));
                
                this.subscribe('fetchFailed', function() {
                    that.removeLoader();
                });

                this._loading = false;

                // paging stuff
                this._fetchSize = this.pageSize();
                this._startPage = 0;
                
                this._source = this.collection();
                
                this._lastScroll = 0;
            },
            initDataBinding: function() {
                this.template.onDataChange(function(rows) {
                    console.log('onDataChange');
                    if (rows && rows.length) {
                        this.appendString(rows.join(''));
                    } else  {
                        console.warn('onDataChange called with no argument or null/undefined');
                    }
                });
            },
            appendString: function(str) {
                this.removeLoader();

                if (str) {
                    this.node.innerHTML += str;
                } else {
                    console.warn('onDataChange called with no argument or null/undefined');
                }
            },
            bindDomEvents: function() {
                jQuery(this.node).scroll(this.onScroll.bind(this));
            },
            onScroll: function(e) {
                // since onScroll is throttled, we don't access these properties unless enough time passed since last call
                // cause they are really expensive
                //
                // NOTE: maybe height could be only calculated once and only updated on resize/orientationChange ?
                // this would save one access for each onScroll executed
                //
                // FIXEME: if user scrolls too fast and first scroll isn't enough, next scrollEvent can be enough,
                // but ignored
                var scrollHeight,
                    scrollTop,
                    height;

                // throttle scroll event
                if (!this._loading && (!this._lastScroll || (e.timeStamp - this._lastScroll >= throttleDelay))) {
                    this._lastScroll = e.timeStamp;

                    scrollHeight = this.node.scrollHeight;
                    scrollTop = this.node.scrollTop;
                    height = this.node.clientHeight;

                    // TODO: if we reached the end of data we should not run fetch
                    if ((scrollTop + height) >= (scrollHeight - maxPixels)) {
                        console.log('need to fetch data');

                        this.pageSize(this.pageSize() + this._fetchSize);
                    } else {
                        console.log('did not reach end', (scrollTop + height), (scrollHeight - maxPixels));
                    }
                } else {
                    console.log('not enough delay', this._loading, this._lastScroll);
                }
            },
            getElements: function(start, size) {
                this.appendLoader();
            },
            collection: Widget.property({
                type: 'datasource'
            }),
            template: Widget.property({
                type: 'template',
                templates: [
                    {
                        name: 'EMail List',
                        template: '<li class="emailList{{#if isRead}} read{{/if}}"><date>{{date}}</date>{{#if attachment}}<span class="attachment"></span>{{/if}}<img src="{{avatar}}" /> <h3>{{email}}</h3><button class="star"></button><p>{{text}}</p><span class="tag">{{tag}}</span></li>',
                    },
                    {
                        name: 'Navigation',
                        template: '<li class="navList"><img class="thumb" class="thumb" src="{{avatar}}" /><a class="nav" href="#">&gt;</a><strong>{{name}}</strong><p>{{text}}</p></li>'
                    },
                    {
                        name: 'RSS Feed',
                        template: '<li class="rssList"><p><img class="thumb" class="thumb" src="{{avatar}}" />{{text}}</p><div class="links"><a href="#">{{name}}</a> | 3 Comments | {{date}}</div></li>'
                    }
                ],
                datasourceProperty: 'collection'
            }),
            appendLoader: function() {
                this._loading = true;
                $('<li class="waf-state-loading"><div class="waf-skin-spinner">&nbsp;</div></li>').appendTo(this.node);
            },
    
            removeLoader: function() {
                this._loading = false;
                $(this.node).find('li.waf-state-loading').remove();
            },
            /****** navigation-source behavior ********/
            // method used to render an element: /* element (datasource), posElement (in collection)  */
            renderElement: function(element, position) {
                return this.template.render(element);
                // return this.renderTemplate(element);
            }
        });

//        wListView = Widget.create('wListView', undefined, {
//            tagName: 'ul',
//
//            /*** prototype ***/
//            init: function() {
//                this.navigationMode('loadmore');
//
//                this._templates = null;
//
//                this._source = null;
//
//                this._fetchSize = this.pageSize();
//
//                // startIndex of the rows
//                this._start = 0;
//
//                this.setTemplates(defaultTemplates);
//
//                this.initDataBinding();
//
//                this.bindDomEvents();
//
//                // clears anything added by the designer
//                $(this.node).empty();
//            },
//
//            setTemplates: function(templates) {
//                this._templates = templates;
//
//                this.initTemplate();
//            },
//
//            initTemplate: function() {
//                var templateNum = this.options['template'] && this.options['template'] || 0;
//
//                this.setTemplate(this._templates.list[templateNum].template);
//
//                // get variable binding and set it
//                this.getVariablesMap();
//
//                if (this._templates.list[templateNum].className) {
//                    $(this.node).addClass(this._templates.list[templateNum].className);
//                }
//            },
//
//            getVariablesMap: function() {
//                var mapping = null;
//
//                try {
//                    mapping = JSON.parse(this.options['variables-binding']);
//                } catch(e) {
//                    mapping = [];
//                }
//
//                this.setVarAttributeMapping(mapping);
//            },
//
//            initDataBinding: function() {
//                // onChange means current Collection (dataSource) has changed
//                this.collection.onChange(function() {
//                    console.warn('new source has been selected');
//                });
//
//                // onCollectionChange means current collection has been modified
//                // should be done by the behavior automatically
//                var source = sources[this.options.collection];
//
//                if (source) {
//                    this._source = source;
//                }
//
//                this.subscribe('beforeFetch', this.appendLoader.bind(this));
//
//                this.subscribe('afterFetch', this.removeLoader.bind(this));
//            },
//
//            appendLoader: function() {
//                $('<li class="waf-state-loading"><div class="waf-skin-spinner">&nbsp;</div></li>').appendTo(this.node);
//            },
//
//            removeLoader: function() {
//                $(this.node).find('li.waf-state-loading').remove();
//            },
//
//            bindDomEvents: function() {
//                var that = this;
//
//                this._openSize = -$(this.node).width() / 2;
//
//                // deal with infinite scroll here
//                jQuery(this.node).scroll(this.onScroll.bind(this));
//
//                jQuery(this.node).on('swipeleft', 'li', function(event) {
//                    that.openRow($(event.currentTarget));
//                });
//
//                jQuery(this.node).on('swiperight', 'li', function(event) {
//                    that.closeRow($(event.currentTarget));
//                });
//
//                // TODO: workaround should only happen on browsers with the bug (Chrome + HTC's browser ?)
//                if (navigator.userAgent.match(/android/i)) {
//                    this.fixAndroid();
//                }
//
//                jQuery(this.node).on(WAF.PLATFORM.isTouch ? 'hold' : 'click', 'li', this._onHold.bind(this));
//            },
//
//            fixAndroid: function() {
//                var that = this;
//
//                // TODO: should handle multiple touches
//                jQuery(this.node).on('touchstart', 'li', function(event) {
//                    that.touchStart = {
//                        clientX: event.originalEvent.touches[0].clientX,
//                        clientY: event.originalEvent.touches[0].clientY
//                    };
//                }).on('touchmove', 'li', function(event) {
//                    if (Math.abs(event.originalEvent.touches[0].clientX - that.touchStart.clientX) > 10 && Math.abs(event.originalEvent.touches[0].clientY - that.touchStart.clientY) < 25) {
//                        event.preventDefault();
//                    }
//                });
//            },
//
//            openRow: function(row) {
//                row.css('-webkit-transform', 'translate3d(' + this._openSize + 'px,0,0)').addClass('opened');
//            },
//
//            closeRow: function(row) {
//                row.css('-webkit-transform', 'translate3d(0,0,0)').removeClass('opened');
//            },
//
//            onScroll: function() {
//                var scrollHeight = this.node.scrollHeight,
//                    scrollTop = this.node.scrollTop,
//                    height = this.node.clientHeight;
//
//                if ((scrollTop + height) >= (scrollHeight - maxPixels)) {
//                    this.pageSize(this.pageSize() + this._fetchSize);
//                }
//            },
//
//            _onHold: function(event) {
//                var row = $(event.currentTarget);
//
//                this.fire('rowHold', {
//                    domElement: row,
//                    rowNum: this._start + row.index(),
//                    dataSource: this._source
//                });
//            },
//            /****** navigation-source behavior ********/
//            // node where elements will be added
//            getContainer: function() {
//                return this.node;
//            },
//            // return source property
//            getNavigationSource: function() {
//                return this.collection;
//            },
//            // method used to render an element: /* element (datasource), posElement (in collection)  */
//            renderElement: function(element, position) {
//                return this.renderTemplate(element);
//            },
//
//            /*** properties ***/
//            collection: Widget.property({
//                type: 'datasource'
//            })
//        });

    /***** Designer *****/

    // note: this will add an attribute called 'data-collection'
//	wListView.addProperty('collection', {
//		type: 'datasource'
//	});

//    wListView.inherit(layoutBehavior);
//
//    // navigation source
//    wListView.inherit(navBehavior);
    
    /***** /Designer *****/
    
    /**** V2 stuff ****/
    wListViewV2.inherit(navBehavior);
    
    return wListViewV2;
});
