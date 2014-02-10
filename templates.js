WAF.define('wListView/templates', function() {
    return {
        list: [
            {
                description: 'listView 1',
                template: '<li>name = {{name}} <br /><strong>(ID = _({{ID}})</strong></li>',
            },
            {
                description: 'listView 2',
                template: '<li>{{ID}}</li>'
            },
            {
                description: 'listView 3',
                template: '<li>{{title}}</li>'
            }
        ],
        defaultData: {
            items: [
                { name: "Leon", ID: "190", logo: "/images/avatar1.png", title: 'title 1' },
                { name: "Marc", ID: "10", logo: "", title: 'title 2' }
            ]
        }
    };
});
