WAF.define('wListView/templates', function() {
    return {
        list: [
            {
                description: 'EMail List',
                className: 'emailList',
                template: '<li class="emailList{{#if isRead}} read{{/if}}"><date>{{date}}</date>{{#if attachment}}<span class="attachment"></span>{{/if}}<img src="{{avatar}}" /> <h3>{{email}}</h3><button class="star"></button><p>{{text}}</p><span class="tag">{{tag}}</span></li>',
            },
            {
                description: 'Navigation',
                className: 'navList',
                template: '<li class="navList"><img class="thumb" class="thumb" src="{{avatar}}" /><a class="nav" href="#">&gt;</a><strong>{{name}}</strong><p>{{text}}</p></li>'
            },
            {
                description: 'RSS Feed',
                className: 'rssList',
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
        }
    };
});
