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
        throttleDelay = 250,
        wListViewV2 = Widget.create('wListView', undefined, {
            tagName: 'ul',
            
            /*** prototype ***/
            init: function() {
                var that = this;

                // hack to remove any fake data from designer
                if (!window.studio) {
                    this.node.innerHTML = '';
                } else {
                    // TODO: force render of defaultData since onChange isn't called on drop of the widget
                    this.node.innerHTML = this.template.render(this.template.defaultData.items[0]);
                }

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
                
                this._scrollInt = 0;

                this._scrolling = false;
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
                var that = this;

                jQuery(this.node).bind('scroll', function() {
                    if (!that._loading) {
                        that._scrolling = true;
                    }
                });

                // TODO: only install interval calls after first scroll
                this._scrollInt = setInterval(this.onScroll.bind(this), throttleDelay);
            },
            onScroll: function(e) {
                // since onScroll is throttled, we don't access these properties unless enough time passed since last call
                // cause they are really expensive
                //
                // NOTE: maybe height could be only calculated once and only updated on resize/orientationChange ?
                // this would save one access for each onScroll executed
                var node = this.node,
                    scrollHeight,
                    scrollTop,
                    height;

                if (this._scrolling) {
                    this._scrolling = false;

                    // throttle scroll event
                    if (!this._loading) {
                        scrollHeight = node.scrollHeight;
                        scrollTop = node.scrollTop;
                        height = node.clientHeight;

                        // TODO: if we reached the end of data we should not run fetch
                        if ((scrollTop + height) >= (scrollHeight - maxPixels)) {
                            console.log('need to fetch data');

                            this.pageSize(this.pageSize() + this._fetchSize);
                        } else {
                            console.log('did not reach end', (scrollTop + height), (scrollHeight - maxPixels));
                        }

                        // TODO: prevent more scrolling by removing event ?
                    } else {
                        console.log('onScroll() => already loading');
                    }
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
                defaultData: {
                    items: [
                        {
                            name: 'John Smith',
                            tag: 'cinema',
                            isRead: true,
                            date: 'Fri Mar 21 2014',
                            time: '12:40',
                            attachment: false,
                            avatar: 'data:image/jpeg;base64,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',
                            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                            email: 'foo@bar.de'
                        }
                    ]
                },
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
