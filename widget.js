WAF.define('wListView', ['waf-core/widget'], function(widget) {
    "use strict";

    var ListView = widget.create('wListView', {
        tagName: 'div',
        items: widget.property({
            type: 'datasource',
            pageSize: 10,
            attributes: [  ]
        }),
        template: widget.property({
            type: 'template',
            templates: [
                {
                    name: 'Text only',
                    rowHeight: 30,
                    template: '<li role="option"  style="{{_style}}"  val={{value}}>\
                                            {{List}}\
                              </li>'
                },
                {
                    name: 'Image and text',
                    rowHeight: 30,
                    template: '<li role="option"  style="{{_style}}"  val={{value}}>\
                                            <p>\
                                            <img  src="{{image}}" />\
                                            {{List}}\
                                            </p>\
                              </li>'
                },
                {
                    name: 'EMail List',
                    rowHeight: 150,
                    template: '<li class="waf-studio-donotsave emailList{{#if isRead}} read{{/if}}"  role="option"  style="{{_style}}"  val={{value}} >\
                                    <date>{{date}}</date>\
                                    {{#if attachment}}<span class="attachment">⚑</span>{{/if}}\
                                    <img src="{{avatar}}" />\
                                    <h2>{{name}}</h2>\
                                    <h3>{{email}}</h3>\
                                    <button class="star">★</button>\
                                    <p>{{text}}</p>\
                                    <span class="tag">{{tag}}</span>\
                             </li>'
                },
                {
                        name: 'Navigation',
                        rowHeight: 130,
                        template: '<li class="waf-studio-donotsave navList" role="option"  style="{{_style}}"  val={{value}} >\
                                        <img class="thumb" src="{{avatar}}" />\
                                        <a class="nav" href="#">►</a>\
                                        <strong>{{name}}</strong>\
                                        <p>{{text}}</p>\
                                  </li>'
                },
                {
                        name: 'RSS Feed',
                        rowHeight: 120,
                        template: '<li class="waf-studio-donotsave rssList" role="option"  style="{{_style}}"  val={{value}}>\
                                        <p>\
                                            <img class="thumb" src="{{image}}" />\
                                            {{text}}\
                                        </p>\
                                        <div class="links">\
                                            <a href="#">{{name}}</a>\
                                            | 3 Comments | {{date}}\
                                        </div>\
                                 </li>'
                }
            ],
            datasourceProperty: 'items',
            defaultData: {
                items: [
                    {
                        List: 'Lorem ipsum dolor sit amet, consectetur...',
                        name: 'Elena Carter',
                        tag: 'cinema',
                        isRead: true,
                        date: 'Fri Mar 21 2014',
                        time: '12:40',
                        attachment: false,
                        image:
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////4QC4RXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAAfAAAAZodpAAQAAAABAAAAhgAAAAAAAABIAAAAAQAAAEgAAAABQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAAD/2wBDAAYEBAUEBAYFBQUGBgYHCA4JCAgICBEMDQoOFBIVFRQSFBMXGSAbFxgfGBMUHCYcHyEiJCUkFhsoKycjKiAkJCP/2wBDAQYGBggHCBEJCREjFxQXIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyP/wAARCAA8ADwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6W2EgdMfSnCMA/MPpinopYDnj3rmPFHxQ8G+DNYtdH17XbewvbpN6LIrFUUnAaRwNsYJBwWIzg1u52OGEL7HROjdEOT1FcZqHjUS69Do+nwJOXuWt5J2O7DoMuUQdVX7rOSAG+UZNd+I42wUYHoQQc/jXjfw0TSr7VIrmaRFv7P7TZvIXAErRzuC2c8/NuOD65ryM2xlSjTiqbtzNK562AwtOpKTqK6SvbzPRLjSJTsVZWeVhyoiB7d/Ssy+sLuzRmuIRsH/LSI71H+8OorqItUsZATHKJS3yM0YyMjjr7VVltY2lwHkjbHBVz/KlPGcqTpy5vmSsPF6SVjjmlGMNhkPKkHII9RVCV1VyAK67VNKRoHZkAljG4kDAceuB3rmZbT5zn9a9OhXVWHMjiqU/ZyseiwZkGQeMdu1fKnx4+HfiDX/iZPLYp9un1a5EFtFgnyQkcahXHaPDM5c8YLDqK+mJdQNoFCcyM649BXmHxk8WeH/DHivQ73UdDgmnug9hqF3cQBrc2ZYb4zJ3cffCMCu1XyO4itVhBpTdm9vzLwUZTdoLU7LwvfweHvhrDb/2nJcx2dpJbWV5cSjfeJGpCyKR1BwcHuADznNfM/hfV4NHjtbeVoJpXiRb+SZPMKS5z5qH3+656kAHtzo+MrjxPeazr2tXK6hHDp939mmWaRUijUybVhhQE4UR+XyuN2Tkg5FeR6jfzpcSTQylSZCTjpnPp/SvJr06mLcqVVWi9u572HUcIlUpyvI+wPA+tCERWgZPJuZt0Bj+6RjJCnPOfX1rQsdS1O78RX1m11Ja+TJ0eMMG75Hvivjrw98QdX8OuPs11IkYl8zyWJaMHuQMgqevKkdec17D4a/aOP2+C/u/DQllRBDtt78M03YcSAHPJA5PWvAqZHjKXLTi+aKe6dtP68zqnjKFTmnbVr8T6Xgna7kjEp/2CPUd8+lc5YQG5060mXLK8QKnrlcnafxGKjtD4j8V2qDULOPwxYXCqz28U/nX00RAJRnACwZ5B27mwTgqcEdaFhjVURFREAVVC8ADgAe2K+uy/DToxftHds+axVSM37pi3h/0R5Q2WAyoPJBHvXI/Fjw/feMvBly+j29lew6nblbmG6BPkvjHmx4/jUjpx2ORjnqHXdbELg5XABrlrPxjH4Mv5LbVfk0mdstLjP2Z/wC+R/cPf06+tbYnB0cVaNSN7NNeTXU4sNXlRfu9TD1XRLbxb4S1fw4LuKx1rVbOx1a1jlbh5kCqUY9Svmw/MewcV8s67b3FjqE+nX9u9pfwOYp7dvvxsODuHf69CMEcV9RfEq6i8NePPA+pwSK+k6kt1pzTK/7tGdklhwR1Jbdg+5roNa8H6H4q8qTX9Aj1QxLtVhGu/wBsk4Jx7HNa8ieh3QxEqevRnxjpOg3OsahHZWzIrOwBZ22qgz94+1fTXw4+DXh/wZqNtqOrO+s3cSq8XlW7C2iYj72Mkt7FvrgVtn4M6INv2PTorSFX3qluMD8e/wCBr0vwzoMVpGgMasFGFOOR7fSt4xS1kTVr8ytDQs3U1nbR2zwNh5SSEU8Yx/8Aqppv8HofyritX8Rxah4kuvssgNvA32ePng7Sdx/76z+VW01FnXO4ikmcsi09+oiUZyQMcGuX8T2seqQOrAZx1xmrkMpZNpAwc5x7VRlYknPrVuJxwlqeZt4W1G78NeItDt/MupdKa31/RbUu2Q8LEXEcQAJGYypCqPvV2i/tB6Rpl5JYaloeokQhCl3ZlJYplZFdWGSG5Vh2IznmqXiNpLORbu0mltrhQdssTbWXIwcH3BIrg5dPt1VF8sEAYGecADAFZPR3PRhaS1PQ7/8AaD8NON1npPiC6lPRUiWAg/7zMKh8OfHXxheS6hbXOi2yWk0bCzkMxM9qSMDewGJPXouOmT1ri9M06284fIO1dRY28cMTFEANF2xvlS0Rc0kG2ijyxPTJ75rdivG2fLJtHoeawoBxTGvJY2KqRjNaxRhJ3P/Z',
                        avatar:            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA2MDhDODgzRDlFMzExRTRCNjg0RjU2NzkzQUMxRTRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA2MDhDODg0RDlFMzExRTRCNjg0RjU2NzkzQUMxRTRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDYwOEM4ODFEOUUzMTFFNEI2ODRGNTY3OTNBQzFFNEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDYwOEM4ODJEOUUzMTFFNEI2ODRGNTY3OTNBQzFFNEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7YUkCaAAA3IUlEQVR42mx8Z4xk6XXdqapXOVd1dXVX5zR5Zids3llymeRlFE0FBkOyBBgSLMCwIPiPDMH2LwmGAUM0YAuyBSrYkkkxiWLYJbmzO7uzyx1OnukJ3dM5d+Wcw/O536vX00u5F7XdU+HVe/e799xz7r3f0966sbTtsNv9TrsGmwXQbFY+LLDoPVit1v7DBgtfs/B/Vvmj/yOvWSzyus7funqu2+2qR7PZRKfTQbvdVg+32w2bzaY+Y+MxLOBnDo5vPOR1ecj3yG9dh/peK49tk9c1TX2HvG7pn4fON5kP+V75Lccyv7tWq6FUKh18tzzkfa1W6+Bz8lyv1zs4rrzX5XLB4/EcvMZHWeObR8wP4ZAhbDSY1coP82GziqXkpGkcWOUU+ydtVe8xfvQPnLx8ifzIFxknaVHvaXfaPLgGzWpRxzMvwqIMbzlYBHU4LpguZpWnn5zawc9hQ6nz7z8nhhKDmN+t0ciyeHa7vb8IOhwOh3qfGE0OLu+R5+Uz5oIYdrCZCxGgI1lLvJDAwUXrptfwYmyGsdR1Wwwz9S/nyRvxARsfnPATD5CV6fLEuoZn0kvVQeS4mlV5jPIweW9/5eU71Yn3DWbp8QM2HPo+wwPkwn7RYIc9TB7yPvES03PktxhGDCc/4n3ValV9Rp6Xf8tvOQ9z0fsLWtLkBYvVuHjjRHVlkl7PCD8z7Mww03nhT7zJNM6TlTA9Q9d7yqhcPK6erLTOE3TA6eQKiqEZ7mLlTrcHG/9ptRnWEC/qHfIOTbMreDi86odX3zTC4Yvrh426SPNHDCbHNL1KHvKjaTZ+jxGuco26LgvbRKttpy1s0LrGIgsEaMpqNmNFIW82lt3wId1mOJAylH7gRYZdPmiwwyF0eEXkp9FoqH+73RZ18RY+z0tRD8N75bfWx74+HvG5XpsewpOVsDUWsHdwbPN7zLAzv8805GEPlOfNEJTX5W8xlvzd6RjGE2NVqxW1oHK8Rr2uzklr2w5wTuv1zFXpW0E3PMX4Nt0wnG4YR/1n0VVoHT4h093N34aR5O/egREN4O8YS2FlMtGcXG23AnvQu+T1DvHMZjW+q2t6kbzGk+/1Q0uOLRdj4onpMRI+JgSIMUwPM39UBPG75HtMHDKM11XvleOYyUn+lve2iHPWQ06gdTv9D/fEvXWFJQqK+wYUY8qF28Ro2hN/Omycw3+bwC7ubBpKTl6AVF6zOx0IBnyw0/2zmTRKhQKqlQoK+QKzVpFGtMLJlY7FYhgdGwMzNQ0FOJziGdoBEMujwM/W6QE+n6/vue6Di5b3dfshZP6Wx+HPC46a+CzeJc9JIjCgyaa+zwxpeU4T47eJKRIaYo+DjCfGo4vq1k4/U9EYPahQMQC8n6L6WVThnumSuuF9NpuRieTYdqcbwUgUwXAU2f1NPJq/hZ3tXTQZonu7u8inM2jIRTFMO/SSQCCAM2fO4OLLFxEbHECzpcMfoDE8bhq1gsdLjwXclFft7OwiEo0gFAoiZAnB5XB9ACWMSOgdeJNxmrryKgPzrGpBTfyTN2jitTS+yuDtjmEwCQ3xIDut2xNPgnHxTLoMBeKD3lOJSGWqXj+N9w2lDqyMq0uciX3R6QN7tycG1OAmV7ETl7rtJpKbq7j27tvI7e8gub2OcqmsQqxZb/A9DjT40Tw9rEiPcTrS9Lws9vb28Su//qsYGxtBi5iy/OABrly5gv39fRUFzzz7LCYmJlDmZwTfbBbytKCF3uZVYW14FPrhZut7krGuRtLoHkSESSWUB9odysBGKPcMA1r0Nr9EFknSuF1lKrngnqUfjsoYPJhYqR+WJnE0nMiqoFqMWpdVUFTBCo/DCQdxaW9nE4/vXsP+5jI2N9Zhd/sVXWgy5HS6fLfVg0vzgFiOja1deIIhLoCT3uiCze7F/P0l7Kb/HEenRzEa9mFvbRV7+2mMTU6j2m7gJ9//Lp5/4QXMHjmOQiaHaCiKSqWksrqdXipY1ut1DLw8CASrQXZptE6n1/+3cV1iLDMJdDuSKXs8Rp+LmanYjPPDoKioBAw8gorzPq6ZxFFZi6BIT9ItDrTF8AzXgJuZhtnl+tUruH/nFj2iiFI+q5DP7vRge/UxosQZJwE+UygjWSwgmckw+ToxPJSg1xjhKV+V5vOl7D70YgrVeAyNWhlTc7OIj4whXyqgSW9489JbNKwbo+MTKBZzCISDCs9GR0YPedcTXDWv+fDDDFHBPDGwwfKNzzYaTUWFNHnB2mfPJvCZBrP2s55uMCOePFdB1z9IPvlcR9fQ4XtdXA1Nb2L13i3cu3kNKwuPlMcFQ8QRp0t5z+7ODj1JowcEkKzUUajXsJXehdfvxVNHTyGfK0HvNBAN+5HPptBuVHH+JI0TCWI/lcTk7DSmTxxnmq8hQ0P6fQEMDAxigd8VozFL5QICkRCBuqXAX7xGnMDgUZZ/Qpzlx8yu8iPJQt4ndhHKYzqQAn4zrZqp1bT6E/mAQxlOP2DrppxQBmYY2q1tVJJ5PLj5PhYJ3rVaHnGGVC5TwMKDhzyIxouKIkAGmogPkIySCBKrxNt6PLHBoB+OXgsaDeUjubZ16qjnU5gYHsJEPEKPqiIyMIAjx07i0k9/iiQxKzaYQL3RQqVaZvIII5dLM4EE+hjVU8aSDGmSV7lgOV/zWk04MTmb/FuyoklP5DNiNPE2ZSd5Uf5hcgvzTf+/HwueiNcuD6LMKem1RbGa3sa1d97B/toKgj4XwrEQDdZGudrCfjKLEC9mbGgQjnaFHtpAi0ZKJEbwcOkqIu4AZiIxZJPbmBwdRZFJKENwPzoxRA8MIT7gQwd+NCxu3Lt3H8sPF3HiyBHUu1a897Ofw+934enYBerOltKxahF7TzieGYZiPFOsa31RbkobE6cUVvW5mNPpPIAnMbpVnjh8gAMvOsyCD2lA5jlFGLuSDOgt9VoTba7syq33UN1dRSLghJfeI2BbJ39KJAYVSx+LRTHBi07EAohFIgh6PUjtbqHXqOH43AxCzJoTw3HoDLuRaAh+TcdQwIWnTswgkhjGejJNw/wMq8tLOHfyOF567hzW19ewsbHBzGVHlLwsHI3C4/d9wEPkYk2Ykd/yvGkUuXbz+k2Gb0aNeJT826w8KKVzGOQ+COxGuhVgU69LuAnN4EEkwruSaaj3bNRROw8fYHtxETF6lN/FL+y2UMyW4STYnz05jbOnTiJOIw75uULEpkgsjka5jBSpxNRIBPGwF8OJCMN0gHwrDUu3Se90YGI0juF4FD+/t4B7C8ykRI2A3YbzZ48gPhxCNpdBhNzN7fUpwB8ioIejAzAv5TD+mqEnxjH/PlwWOszwD5eYTMMrVSAWNEWrKTTN+JY0KoRM4RMxpk2S2mJa74lmJKa4ejUUth7j/o33mGYJiFIjIqBOTk1jfGQIFWaraDiEZ8mFxPo2kkXhbqlCBTZPEF6C89GpccyMxBDx2OFzAvxF7GrgxMwYThybVZzqH7/7PfhcTkwlYpgaH0ZieASFYo3Zbhznzp7HUHyY/MqqfgsV2NvbUwnlcNnGpAVmycb0IqUqJDH1gdysWgi4mzTCjDDNtKbBR3oHNEKVKmyHin4C4ww73SJVAHpcvYxSahO51XlYmnl4XBqGhgcV0RTJMiygXGG6Z4ieOXUO965exipDZvzIMfz8wQ3FoaYnxzHO9w2FPXAz7IRiTA1HMRIPEsxjaPE8FpdXafAB2OnlLiaR6bEJVOiVO3s5TE1Mw0ajBII+LBLH/IEgzjx1mvjigodhLhcunmRmO9MA2qEioulRJq0wxPUTcmqyenEeq/kmswZkClQnAV8UuFoF6jgd1gOq4CA813M72Fueh7VTQ8jN99MjxFjtXhubW+sM2TqOH5kWJcxk0MLszCw9k+5N/vDo8Qp5Vx4XTp+gN1lU6PrcXma8Oj0yjlEmggixp0BZ4xsch93hwdToMEF9gg5dQjqZQr5Qg9vppbRxIhKOEAdjeO+dd0mC94iTCXWukrTMMJN/iwGKxeIBXTA97nA2NG1gMnrT0KqQKGLRrqj9EysqYzkcalUcDqcSlKoCwdf9bg3FzB4yexvIULaIMYao3RLEFr+Aq91JHUd3p5AMBzxk8TYkUykMM3Ra5D7z9x8gEgwiEfVjOOLFyZlxBfYV0ggbvzNE/hWgVHFSA65u7ePB8hacmhvnTpzAED9j69WRIa612wLWbr7mYJJpYHJiCgkS2qvvX0W+mIc/GFDGMmUN+jUxKfRJ1BwOsQNcPoTdkv1McW2WgKwOpyalI66exheZJfjQ7ORdDk1Jhi7BWu/Jm+1K5+XS+9hfX4ZFWDnJpNvrwhDTfXxwEF6+HmJIBP0C9A50yXwbZOfF/Q1s09vIJLCTyhNzYogOBFEmR/INjsAWisMzNE66MUyRXFPYJiT37uICFja3KKEs8LoIsORgUiwUteqnQRntStJIiUeqFqdPnmEC0vFX//NrzLR76qLlmjQbr4vqQOtnPCGo4mESWkaPoKuw2ahCiLMYFQ4zU5qeZu0pQ0jsSkNA5UB0dYK6zpi1SjYg/+D7pe7UbTWwcOc6XJ0qshvLKnziQwO8yCG4/GFVEUgk4mhy9UKeAMmmjuTGGvJbS8SZPOy+MKpUy2Njo5icm0PX6UeywZUNDsI3NIZK24JUjjyMojpfaWA/l6O47qJK/lRvlGgcak+dKd8bZhw1oWS/3lW1rg4NL3TlmaeexuP5R/iPf/jv8fYbr1FgZ5XBatUG3JRXQXq1GMtMYML0DQlnUQUFqbVJgdKkEIclktWUA8aLBmOVcBNANzIjz4sHdRCAl+evI7dyB6XkJq+wg6PHT5JGaGhSTAcGhnmhBQXiIwReJ43X5QpZ+cVZYs8cgd1J4JW6VKlSpSypUgYF1Xeld7cJ3jxhvrZBD2lYXag0gVbDApfFhUjAjxD1XkdYHjNxsVhWFy+lHCGfZnGwSuCX8vSFp5/F+1d/jq9+9b/hj//kj/GD7/+AGbyLmZnpg9qamfFFJJv1LikpmQrFIKrdA6agyKnJN55kQnoSvcwumaBrlDDkQgqZJAo7K4h76NpoYvrkKfiCYa5+GXbJ93Tz1bUNVW4JkpnvU+ZoxJoGxWiDLu72U+utbqJQrqDGDKc6R3R14W0lYozLbkWFntthdoOLXqnVuFh2xAJhhAJeVTqqkxbsZ4rI1R3EuRCvSBbVqPDq/YpqPpfF9NQMZmePKEio8vte//GPMDgY5+L4D6iC6VkGS+/1DWXp869+w6SnH8i6fubUDriFQn9+UPp0VvWcVdWkxN3RLGNiKAyrv8lVHqBtPOjwNZfXr8rDkpYnx4awjzqWHs4T5A1csbs9DL0ULr39DvL1FhZXVhGLRuCgBxQKJXSbDYyS5ReyGSzevwu7yC4mBRHdHRrZ5ybIEjcLpTysrTqy5Ro8gShXWVNSSxzBRtDtCkh3xLuqxNAxZSy7U6eWnMO1Gzex+Pghhsn9vF7vByjDk0qo61DZCQf1OpNSKTIrwkYsbNSxO6qAJ9WDXke0nxzQobzFR3zi9SNb6yI8HGToAVWCsZ8q3U+v6fJCatk6WqUsKvk0stkaOkMjZNbDuDt/H4H4CEZmjqJO76kQ01LpDGqVMj/vxiuzL2Bp4SF6tQoCzIw2nu0qpUy+mIE3JHJJV2G4triLrkWojEucisCtoV8xUs1h+Wk1mqqbND4+STbvxlPnT6v63MzsNDMyoYKZWX5Exhjh1VNFQaNgYPYPLH2S2j5wJEVopbshINduNVVtSpPub9+iqhTbbRBKrNjZ3MD+XhJN0o6d3SSf14ljdgxSojSadXpSBW5m0UImhd2tDYVLquS7ua4qpw4PPdAbAbM8tlJlekgbmVQSn/7YhxBmRn14/yE/71A0wkIL3L93j96iw0e88jHMHUwYmRLDhaHt8wXh8EepTUmapdKp6J+uCpFSnJSqqd/nRyAcI3lNKVyLD0SVp8hCmQ0Kg4waISiJTiDHKIVbVZPZlElmf9FqEK+26qJIMvS7napb3LMY5QsnV9XSrmFnfQkDFLjjzGQOGk8jjxqIBLG5voq1lcdoM5xWlpawTtyiGeEORWEjV9ndTyrMCgQiygvazS7WNndJTJfw8ovPw++w4R//4Tv8PsEMG4aHhlCmAF9huPqo+Wo0+mictMQbRJKeu8kEksnsMnPWeDxZ+Taxqq7kWE8IJL2gnM9S7pCsRgfpoVtwk4+NEkel6lCjscSrnoRcTz2kxyA1BOPxpONlNjFUaafdbtCr2iShUiWkCpeuiPB1zQfaBJXsLmr763DrDYVbNYaRxhUtF5nWqyUjtumiqbVN1dA4fvos2lYH7q5sYYlsukncCw3GEBsIQNeYz/QK9FYBH33hZQK3D3/79W8qQ3mCAzhx4jgunD+P7712CVvbe4iNTGCQZPcICWcpXSDH28WOUJFciqFPYhuPI0bglv6eg9godfN2u06PtDDD0ojEz0o+h+jEBPKUYdU68TYUUrhV4YKY+GQ2YIzGhqXfxuuPL/TxTUiqJrSgzTB02z2qaSFEVNpeHen6NCtoFlJo5vbg6Daxs7qMjs1F7yInKtVV/TQ+NMxsSEqga9R2buzspxCfGkVzcR0PltbJu4YxNTUBv8eGDYZnOOjC9OjTmBiM4u+//g3EYxGcPH0GR0+cxtnj0yqV/+C11xlCYeKQjuOzJKv0hDSP62VovfLRV5BlZi4XsySwu7ygNp+PKoD3Bz2EgyoyyRzSpCBphmOEZHlmegYtevdALKaIsyl5Ds9LPMmE1gPJI0YyWbwAvKo6SPfFQeYpXRqbaod1lfK30ZO81IFo1lRlskngHGQmE2ohkzY+8ib5rITjxsYK3r9+DSvbuyhX24oxF7M5aAzv49NjCDD0vfTeOZ64YOL//cY3UCaAnTh1BkfIf8RQXqqGb3/7O7h17z4G4kO4+Pwz8Nm6itDupPZQYgiL1w4wVAciEYp38i6S0y5Tpwbj7w6N1aKw1yiLfLyYBrNjOBzF+MQkgoHAQRNWHmY2PNxRfzIYYzvoMZqlHM3BA/q8brqm0bISo9qlYyzll1wSVeq/CnlQmKRTkkCXbl4ptnkCYZUhkrtb6BLLLMyWBWHGHRvWyac0kscgOdN0nCHocRArOoozvfHePENsR1U0nv/QKxifnMbEaIIX1sHNa9fw7e9+B5PkSRcuPIsAJWunnIY/4MLGzS3cYla9vbCEOPnS5GCAJL5KwW+H180sxv8cDMcCF1aztJEYCCF8LAHNL92eGsOwQggw6JHU2Q8XBQ/X439xwMWsganSjo+ALkJaUqgmlUSRFLUylu7dQa/AVF3chtMilNDJL8wStsQlHYiFA1IzJSZI04BaDnaE/YPYIou387USxe6RiQTGh0grGjUe14KH9+bJ/lOURUGMjscxnQhjxN/FsI/q4P5tfOM7X6fxRvDiCx8h0/fi1p3bODI3BYvdhSs/v4kHBGuPJ4K9JIV0K4FIyAYfJVmQ5+6wuxXepDJlAnmV5LeJUquHQKSFWDYGJz3N4vSp6xS8+sWu9S8aySxVHTYoNSa1lttLLdpReOHgmzL724gF/fCHRrExv0XdVcN+lh7GsBFmH5ayMLnV6toqI7SqBGhyN820H4CT6bpJD82Vcvilp89gbCjKEM6QM1WwSfoxMjSIHWLGzEgIRxIB+C1VLM1fw7VbDwi+UTxL7IrS0x/cv4cSk8vEJ17GHjNqMV/EBSaPKLlbo5JHrZCEoy69SYsxXECh7yT/yhU6WE2VFLkul9YUmGs8LsgXBaTlIdCT5mKa5RuzcXHYaGZdy2TvqkBoc3hUam8x9XupWoQY+/kFvV6T5NSJENNvmSTTyyQQ4JfmyI2EhLb4hWtr6yqctre2lCHi4SHMzkxifvUxjk1P4Llz57C5+FCl/7ffex9NkjynV8MYNeMnzs/BxX9vrG6pln00noC1ypUk213dWaTx1/H8uVMYi/nx53/5f3isUyS2Y/QyNyoFG5I6+RKEVbtJGQirVAfBUBgzUyewV6fu48KXMxWsbi1ibmUX8yvbXDiCfyatFnd0dPRgqOTwFOEvtsrMnoTKiqo3Ro7gFJAnLXYThGudKurlDAYYAq3SAIRe6IUiMaqhyjTRaFQ1MfP5vDGaQwP2uh2GgoatjVWy+TI+SbLZqhQpY7K4fv2Geu/k7DEsMQF8+OwcZge82N3dM5izxaFmoqifsLe+TeOmMULK8Pz5s7j182vkThZV46ryQqXMI1zJZiHNcQT4m4SVuCt1rUKugqkEMyrDZze1idOzQ7h6w4ojY1HMjQ+rslOZYlsnDRIcMqdtDpefzdA7NMR2UCjUHJYOiahPNRlKzDiddBW9ap76za8MkKGRaAWcv3Aer//ohxiODWOI2WhtbU0dWE68lMlwVQeYbfy4e+MqPvTqK3jq+CweXbuOLWbR3VQac0dPoEisOD46jN/60q9hb+0RdLqx2xfAyvo6CsUyMjnJZpQqoxE8dfY0Nrf2mCxSlCpnVXVD3qOV63C7ImTygv5tuLjIoZCX4WZHua4z+VRxZCiBcpLc0NbCl7/wCXz6c7+ESITXyEwqAydm+UUKgaY2FM8RmmDSh8MNDNOImt9JC1LSaKQLbkuL+m6X4diDlwC7SQK4tbVNd9VwZHYGJ0+eJJseUV3lXC6n3HifeJaj9whbLpcKeOn55/BxcqEyZc/i4gNqyC4uPP8CDdWCn6H76oc/hFgkSknkJQ5ycbolId0MrTxX0oexOYano4078w+Ic/R0b5wXQ6nk8SFmD1P+dFBvW0l2udK9PDwa5YpVSktVcqgAw89OWRXC8PgclrfvwsbMmZF6j9XxTwDcFMpmKP5iPf7w7IMS26LsyegUl2nksgjT3fVGEdnNNZK7JLrMjO2uEwsPF4hfcfjJmrf3NrmqVWXM/XIH3uAwwd2HPBn9meef5gU4cZletby2BavLjzOnT5LZnzJkBhPCrfl5zJMC7JKlS/280+qScjDrkOGnkvwMQ6xLkhsIJ2B3BtHVLKoe5XD4GD7kSISFfClDDpVjhtN4fi3mZQsiXDy3y4I6qcLkyJw0RSn887h7ewEXL36M4O75J1h02IBitMPVCGM0tNfvosrikDyWiC0petDscJDksYtNgmueBqnXBfQ1VY6VkUW7w6WaCF4xaJP0gBJiN1XFzGRYzUU0yaLDkRDef+sy3r3yM7S6MnnSVG2ywWiYij+Ja++9i4fLy8xaJeJihV66h1CQPM3mUH1JH70iEEpQJEstzAKPdIK9DhkQUCWbFrFN75QZ+muoFmtw0dMdXJBqlWTT1iSeSs2KmaxGyhAcVI2WUqaILdKOI8ePmmrm0Gi65QNjCwaVsPbr8t2DSWx5i9amSs+kM6q54HfakNqUzksGaV6YTmEbYIZpMlNGImEerc0slULA40Q6V0Kt0VSeKIS2Su+YOzajyrw//ukl8CVVz/cwsybGxvm5fbz+2g/xaGGB2bepSrx2pelcOHniBL0bNEQbHmbaRgtqPswqs/nM0D01zcJQa9QVxSmTNiR3VjAyfBQTk5M0qIfh1FMlGxlk4yXz/DLwkiwPhEPYJSQkd1LKWMYEvv4BQx1u85shebh5YWpHa2Z/Czl6UoBgmNlcwPrjB8imkygVCxgkC5bOzcz0lCp5rD5eVPWmBq/mKjNch+Ebj0VVaSdLWeGgF9y7ew/rXMU9ksNUroxnnnseR4+dVO+/dvMmlleWVUVgMDZIZh5QEqQlnR1pSjCULf1GAdeJx6PcsLZVmUgyrN6jVq1lsbezwYxZIY414fM3oTnLxE9mSEcRpfIGF3uLx8yiVkrDw0zvpiKp5Isf4FCHZY4J4maT1fQwqZSaYK+yYS+/jYSXhDS1ijs/v4IBqvg2QS0Y9GFinIK4ozqG2FhfRZQh1qiV8NNLl9FjyraQBLpINR4uPEQ0MYrBoTgu/+QnKBMzCuUazp47g2MnT+Hd96/i7Svvqf7fl77ym5gcH1EtqxY9ZYDcrUMOJyxdjNSUTCUXQjogIdeWbk5XzRTyXOrEy20+ZyHXI3ZuLqNaSWJrc58h2lMd7iAXdYTURuPxoA3B5iShRBtVkmQ5rq3vUabBnjRUpbX2ZHeCamL0pxyF9YtzaeemCdpaGNff+B6lTBq71H8Fpmefw4p10oPtnX2V8s9feE6lXalnK8bLiwnRzaWwtrmdQnhkggDuU02B23ceotToUrxO4fZN0oetHRw7fpxGGlNttUcPH6lKxwx1odvpUf1EqaHXyPk6MhXYJHO22tCQZgFPWmSYjCjtMgpafF8kOkpvdnHhtmgEin13BF1m8Eatgyo5VN2dIY650cl2VUnJ7iK+FrKUOVVFb0xuZXbepV6lWLpURy2mt3WMZgjfU6/XjPagn0bJ7iWZxotwU3QWqw1l2VAgiL3NLfKoMo0URrZEj7r8Hhl2mxyxjlo9A1dwBG9fW0bN5iUHyuHST9/CJz/6Ufz4jSu4tULm3szC3vUi7GEKLjWw+OAObt++hfPnLqiqgaoh2dQ+F/RsUHKrJcNx0g/QLYppS62qy7Df2txGo8cFiowwPv2q/R8kd9Kp+WSyp9eliK8V4SKGBiiJtpYfI7e8SEZ/lOdpE3BWVdDDmw56aoCX1KErxT2bav/pPWMDhZSmpfMkrzWbJb7ugvbmGz/B+tICmfY+Xn7pBfIUGZku4unTx/GAYtrtdmCDGev+4mNVeqkzy9Q7LfIcGx7duI11xs1sxA8f8SVHILVISWZuhpJnBXkeM+A7hkw2h8crS1ihPDp15hxOPXUOrVoFN27dIXbF6f4utGmktnRTmK5bnZZqfArxlHbX+h51KT0rSDnVYai66R1e0aEynyLFvqaUZYRlk+SGqDejY3DtZeghO8ySRYZnUNXwVW3q0H4iMxxlkdodYmXPqTKgeFWj3lTf3WboV6oFONoeWJdp/Vq1gqfPnecXtrGw9Jhuy3RNPIonEgpwBwdj1H08OQ/o4jasZ3W8v1RAkoYai5Ju+HREPW6cOXlMSYnpqTEk6DkrzHzrG1skkuKZdbgCA6i0bdBphC6M3RyCSV2pVlqMnR5q9kuAVRqdxJEsyWqO2dBKT4d0iMm5pApCNU3YKKJJiKjX6jySsPNBZlgfAsTGoQEaticDwcQmlxWre+skyYsKhsz2ljHxaOu389sHwC4zpCID67Lrolyix9bQINvXJB0nEkN8sY48PUoalLOUJl6SP6fLgWQ6h2R+DeVmDzvpCu7v17CXZZxTwEop3xf0ktV70eZKfOvb38Tq+acwN3ccLz73LO7duoGFxyukFA4sL28jx4Q0zERQJTG9P/+QgN1TZLKj6/2E3v+/2gSlqVFzmR0t7qdR1Yqo2tOqimvVrWoSWs1Q0Qt6aj+OE2F6jzcQ4nmH4KDbdegl0tH2xAawkUopY506dUp5lfqsmqe1HRjJrDIoLai6yzQiFUpbYapFOuI96r0B7Gyv8QQdmDtynLgQI6BZcOm115jyb2Gf5G9lL42NJElotSu1U/6QbPKiUlJbovabeOE8xaq05Y/huZdexksvu3CDlOHdK2+oE/jKr36KwP4YH336OFL7lEsVmYJh+AlT7sgMvab6lWqOS1K1dMoJqvlSHsVsSu24kAqtzLyLPpIRgEpF2moN5YkyrZzlYveoau4/uEHNSC1nt2Fscgqf/pUv46+/+T0s0NPzlGlSNRGDVBhREoLG3pzOAYNXm66kQmrpGdtjmJSUsQbIrO08KReJnWTB119/HWPjE5Q8Ndy4fRv7JJ+lrh1dZwQ91RUqwE31TqmvvIn0SqX7Ng8+PD6Npa1d+GiUTDKPjdUl7KUyavD/N774BZyYTWBt+RE2aXTpYPMUmASaqqHqYoqXgTQpKBqNA2PzggzIBQkDE8dmYeH3Jo7OUALJjEWcsqatGhduj19N7+RKVbj5++abl/Do3m2MTU0iRk++M7+A5dUNTE9P4NatWzjOzBwhTHT6IWdyLXMnmbVf33LYHerR7I9RalOzR2ndJuzuADbuLzBLlRifedSFnNEg6fQujXAEaUqGDoXyiUQMfn7R+vYudpgp5sJ+HB2PYj+5ivXdIfztd36IXPnvCfKTeHqGuEHgvbu0gdT/+F8YjQWwk6fMoXEGohHqwigJo+wT6in2LgYUA9mtsqLibRbERyfxs9sPcPO1q+oC/OF7xDwbvPSOdrWpQu/ih57DMSaVwWAUVkoim6WD6MgIfIlJ/M23v498/n9jenYOpz77SRpsWvE5aYvp/e0sln4HWuRUz95VW/rUJiiGe4NZtNWTxfRA88lMJgVotnSP1CGAZ1+8SLBr4vb8XeUFX/y1L6DVtmBr+8f47KsvI5Ut4O6Dx5DR0S88dwrjgwEy6mU8WMkglEjRAAP0lAKuL61jyN3FU5RARZCRM/1u7iaRb2rwhEIKfKuyDYWhH7C7DGCXxq7sEbI92f0lowHHZ0+hIHBADVti6Bn7v/YPGLlMMI8PD5CMxtTwrldrYGz6GOxMOlKcDPmcXLxpPPPMM8pY5lZgY2bLGIZRW+r6AyCmbmx1jFEkaYnJvJq1Uie7rZPFkjJ84Yv/Ai+88nFmQw/mb97AS888i+fOn1O7I375M/9MlXFu3Z7niUXxr77yeXzqIxfQq6Sp3ep46eIFks5RrlZbyl8Y9Lkxd5zZ0UX+LFtDKIWigxS9Di+KxYqaCc0Vqigy9PM88UbX2NXQ7TPq9sHWXeITpdGXP/M5fOz0OZwcGscxcq2EPYiEJ4BhLnC3pWN1I43V5TVmLmZdnkA44FWNYJ/MdTFKXnj+eVUdrTeaT0ZC+5JGCpjmwJrBwT44Ny8FTwlN7e6dO5QxUdXgjITD2N5Yx6VLb9J4XWaOs2pr3csfehmXr97AW2/9DP/yK5/F3MQwT0Ljw4XkUAwVGuvYsTn87NZDVOpG9+TczIzapvJwfZtCNg8wtC8QdxzONpZ2kiiUrEgQd9xk/XaXdL1b5E02tamqLoKZq6q5rSrLaQTYIKXMM2eewu5eirq1qmruNRJRrjE2tvewkl7jIk5gdHgE0bCVC1HED9/8EcW4G37Z4eHxKgNkslnF1M0CoBioIQyev+W8lT7st+uFPghpdcIAfK1OzVQi1G6u6khvr+Mm5ckGCeXR4+eYhqMYHB7D5vw9vHbpEj712Y/R204jSt0oswP//c/+HLcfLODihz+M1dV1XL9xD0PjU2rL3KNHiyjkIigyCWzslxC0MVX3Wsx0DUoRB3WlQyWULlLEhRZ8Xjs8XHUHT7pOEhgIkgY4jZaVxy0XlFfacnx0GJVgU4WvVCXaVH7H5p7Gwsp9DAQ0REJhON06fvTmZWbcBv7zf/0vWHz4ENvJjPIOMY6MBzj6vUO1R1GaGDLCQC9rKSjoi+tDW3fVrrhsNqOmRaR3KIOywi18dLupY6cw9xTDjOz68tsU2AMxJIYjCDitGB8awFuXfkxNuIljDI3BoQQePnjEzAYsPl5TF3vi+BxDy4Y7K7tq/85nXv24yk7bJFvSbR4gafQwi4lek6GT7fVNVYHN8HygdvVrapRI6ES706Bm48Uw79rsHYK7xlUvUjHsqTq/x9bDheMn8NyFC2rLysO1Ldx8sI2hxAQ+/+tfxsT0LFbX15V3SOb3eT2KMpizs9JvlM68tNBkZqNObtfri25pJsuQRpsa03qbGXCMoJcvFwjeaZTL5D+eMI6cPosys84S037Q5cPkYBQvnD+BI6MxXPrBd1HJJvGZT3wcsYAP7/3khwzNQQprN7OTC0MxoSM61mkY4W6nZ+L45CsXcfPuGlb2Oyg2LJRLDVXLkkEQmV+PhSMIBsMkuTG4vFEaxgXZnBdh+DhkdNFqVx3nVrtEg9XgC/XUA/o+teMaudoeQ6aELg3wmPglcxuyS/b3fvs3VJe6QUPkcxkF+IItIqhlUkY2yFsEn+plVSeT97YpnKWGpstUII3XpDRrkJNpX/7ir8NL7Ll/6yrq5TIyqV1EB8Zg7dLSlBMiJWxMtYHIIJn4aaQX76oqQTgUwf5+Eql0EeNUACeZut++s0Gc8eLmnSWFJRZ/GPFBho3uxb/5T3+KVCqP0cEQKo0cspRTbRLHjowQeZ2qFuZ0utUmTfGsnpJCXfhpLE0jq+6LX1Uzpx4UAW6zW1UJWiYsbQ4rNWEAC+syGrWv+povvPA87t69jRXyvdNnz+Htd97Bq6++elBbl6xYU7cpMCaJqpWykj8y29iRoVzZaSHJoNmFi2rDOjMxhu9951vIpdM0TJlgHxa+CSvFrIv0dTAaxQAv+Oip88SwAaX1BofpCfQImdJLZ/MYImnUuXJOmx1McqDehsZMZaGSz1IuXX+cwkqWEe7y0tUrss+Y0q6GSqnCMJQxoDbZdBulWkPhV1uXE+2oko1sHNDpVVZyMCc93OH0qY2b7Y4xi2WXsUoSUR/PU6c33SLlaZL6WPt7B//ub/+OyeskFzeMve0tXL/6PpGd7L1YUNOGYiCp4Uslttuf0VIDyULUPcaeSFk80bCaDGdI5nAw7gN8UUBtZHBIDci6eSGCHfF4AjPEBMmMJYJjKBggyTuKbLXD81zH8PAoCrvraDBsRBpJtUCml3MFrhRxqesIqPZ+vVfGZnGDYG+Hi7pEavS1NsOxbYWTF18Xb+QCuQSzZMuthRlSZUnBL02xaT8NpvYOyu0PbMb9FmSkxReJY3U7iUdr20gMxpWUmp+fV2D+O7/zu/jppTfw4sWX8OYbb2CLGf/IkSOqgSLzG0LK1a7K/tY7uW2FDArLJJGTNrFQZuk94ufabga/9Jl/DocvxFSsq1p6UzZbEjMc3iAzC5mrEMhCDqsrj9V4o8xECZt+vPiYciOMMbLjjUwWLRtXwUP5QfxxklpUGgRR6QjFQlLth4UhGrzwMVgmBA+D2KOx08TIdLFEUlzgAlFalSsoER9EBlXIfwp8rSHjhrqm2uUWmzFu4OIiSOfH4QgjGBohsx9GptzGflqgo8ow9Krd/Hfv3VMOcOXKO6QVcfz2b/0mGb6OhYf3sbm2Ss8qGc0IZZC2MlyHnqbukKLZFeaKFBT6oV155z2cv3AGYRLGQiZDUR3DVnIXs4xVJyVQvrQLmc7P03Ng66hdV7NHjuHB4hIW17fw8sdeVSWMzUwZjvgQV7msGh+VBsPNI4O5cvOIKjSSQ5E+vsQUau6CEs5ObYJ4UESxmkGhkMVgh8RVzbQzI9P9uwyrumy00qnLZEd9x6oqE8K2NYZlq2OUgcXrXA43Alxw+dlh6Lu8PjWLtbK0TKy6rGiBw2ncPOijH/sE9equgX8MyXpTsl+L52LsfpO2m9VmaMNuh47Thdp4oJ2cHUetWMa1a/cxRGZ+htYfGhlkzBIAi3n+5kkzfnulFFNqBUeOP8ULHsVbf/l3WNhJ41+fnMVAT/BGxy6zSIAr4ObvFHmEjV5nobaS5gK8XpA8oZhluudJOYdIIKfnsHr/LjVXDO38Bj2NmpQEd0DmrsiVHCHyG4J/s5BmyLaYMQeYjLyK4jik7aMCkKxfxoy6cYY2c6jDj5amYyuVxmQigcsU1evrK/i9f/sHyBRq2CE9kd01MoNvlTnaZp361LiTSa+oqdeEB3ZkDJMg3yRBFnVjoVdrZ8+dwLtXr6HIMIhEg0z9Q/jIyy8QF4rIUhwnxuewwr/3t7aVVrrw8SPI7ezjjbcuMx0LzrmxPH8fOablWGSWxg2pbnVDxpkdOoljj2TSpyaG9WKRlCMNB7245wxQb+6j2aGq7/gwMHcRflsdewt36WkMI2bhIPEs1PXCabdht8pwpLcOBEKqOuHkxblUT1OykZchW8R7V9+lNzkxkRjExtqKGsCrelw4ceQ4HAyrhySnIyKw/R7kCSuCV8K7zAqDYJh4mLrFSqujGjc1QoHs17FpAWh5rlqRHvQR8qBPffKXMTs1jSuX36DF0wyltjLGaDyKvWWuIV1/aGwS3/76X+HxepMkk9mRqfrye28jMTWFSGwOV67Po8TVsriCahRIRi1tQgmkOir1+ypXavk+WslNWIJDCI4f4UkxixJv6n6K2fgU6pkk6ukdlCmTSlyogM/D0NNU1XSfoSkcSeiOR+YcIgOqd/m9H/8Eb9+4hhg9O8b3d4cT2EymeA1NhAIFZt+6EtFuXk+BhpJteF3V1PUo2qDuOMJj1hsdRY2EMkllQnBSsrAQZG2Qma/GFwrlTdVplvT52us/gs9u3NRidGwKI6MJTPKLdHIj2fLx6NEjVQCU6um3vv8a7t7egHNkghe5TKqQgs7MamnboTdFOjSJObKNTryMOi8YonpPUQAytPLUebld6E6vdFjRjselNqJ2e1nCgyjm9kgUm8iT0kgvwEkOVKL2lM5RgELZQWM9TpeQvvqAWXBLXXCYhhSt16F3VITLUSHcWdxA5RvfQoO497nP/fLBvWsEr+QhhrCoezx0D26OVmOSEGM53f7+bKlL2DzF8B4lht2FhwsP8NryQ1gdFly9t46xRFxxlXVqxTI15NlnLlKarCC9t0V9aEOV6fTGw3Ukya1Kqzvo1LLokbnD1YWjy0yi6AIzWY0sWXZkSedUbxCHwvzNcHIQF6pFkB6TgUtdvcAQjatSjYWZ2ZOYURSgsrehBkdcLgk/KM/dJUWpNWQrS83o9Vl9CNKgDnpzrlTCvmwTFEkVI/iTA25nivja1/5SYdOnP/NJhrRH3SxDTWrbbaq2Je1Jo7htVRtMPQxppxzTYVedbu3R8ha29soYH3cgtbuh7qmwt7Orbqzz+V/5AmIU0lWC3N35B/C4PNgn1aA1MDGWQIH8KJup0JMsBEFqKSnDSj+OF9Gz1lW739K/3YrUqToybkkXJ8tUHiQbADQffzPESLnQJkltyW1SBLxJO2RgpEcm7iAZrvekqlpXzRUZjzJ+6JEghaAIlzsAdK0tpGQqsNFDnYlA9w7CReriJN71+JntrU189U//FIPxGF588QUj83Ex5fo0NQFoNbKeoLwQVBrR5w2oOzJJvc26tr1h7OysFxD1MiXr6oYy+MN/97sknx5s7qVIDh3Y3k2jlk2hvL9KphbExm4BYVIELzNHqylXKkW7jnEXt7ZVuTcvV031SU/bStbt8kXI3aKw+6R7RPwq5xkmFeOkuZLWWBy6PworOZSVcsrp8yvjFGUaeXQaVgpjEOdssQlYI6O0VVTNjqFdlU29KDMBpPJMIl0nejaPrBUJcZCnYyeLceDE0aPUvxn8xV98Td0rJ0JDqv1vagOQzdjYRY+0Q6JCegKaoihSDuqS2Wsb8+/hxbNj+NArH1Z3BNlNJfGV3/oKedcYvvXt7+KLX/oifvTWT9SO1OmZSfKTTaSYxUpU4dtCGOkdNStTcJcY0FMUGDa3T24YoVpr6N8jS9agRbBXQxZcZZtsBA0EVKe5RTZOAFQ3ynCRiYuu7MquLYagMzaMJp/vSEdH+oHDR9Su/67qVjOEKYDb++SChRKs9HybtMw85Fs+J3WnU23k7PBY6eQ+TtKbpL9w5d13cf36Nbx08aLqhGtWhwpD9Lf+dpkRZcOqZncaRrIZuwtsX7l48g//6D/8kZNJAH/2N/+A5dUtZpgIvvW91zDGzDc1nsDiwzv4/Gc/g82VR1haf4x014VyT0MyX+JvKzkQV0e6DmIRepDF4VSRr+69xQuwq83dXTXrpTcMg8nmdIsxdM+VNW5yZpESrri/PCd7CaVVJjv9KxSWNHSXrzcVMPPNlCFWfmeXoaqMQyC2TswhdPwsDeQ06lKhAaGssBSSqCbXEAsG8aUvfUmJ5aXlxyoUu51OH9g76nZ5FktX6VdJdDZV8/IoBm93OJra7Jnz+IdL7+NPvvpXKLZ0nJwZww8vX8WjrSKm545hcWEBH37pRUyODOOtH30TeUqUMrPR5NxRtJdXsc4w7TZ66N9FUQ3w9toiZPlFbq6ubHfpNqDLriqepIWeKDfPMPpzLdXWUvfWI4DaaBjZ1dWjp4WOHkNoMIGdlQ3VUJV51WqReNUgTvHY3aIDVp1aVu43E/VDjw2S2liQt/d35IrAk7t/MKCk002AUR3zZRrJvG+WbMzS/YF+51u22dBQtbaabZBbxoh78RJUUlDTNH/z3Tdx5f4WZCdLnJixtJdXnRybGszQ8eD+PKyTg5Q7a4qf1Fsa8SuLyj75Ur0Em+z2FEN1jdut6GpGQFdTMdLYskjJVoQwXdpCdxf801VToqu6NBAPonfowqY7xJZQHBVrR62ulktRMJMP1ZsqU1mk+SkeLDc3FByh9LIGabAWuZyUovk+vdUzGhrSUbGKfNFU1cLGC5Z7aj2guL599y5+/w9+H6EQRT69VyNVkbJPh8fpdaX9ZVGQopqvPXMWnkZ7lKwEZBTETesKR5JeXpQpMxryUKbksLaxgRu376k7f6RrVmzmma5LBpjKnSElITR6HSUH1FBYz7gjkkgSucGYscmFD7tFTfZ1WkYtykFmrUaJGIoduzHWQ7PTs7hspAjNbBnN/T2j2Sm9O4td7Vbrqtkf6kQmgR5BXYnrllGskxa+XQzvMciw1uDiMNlYKIes9DbZsyOV2bHEEF5iCFYl44rHyP0qdNkOzM9J3YoLa1P32yL5IaTYHarGFtDKXcsO84k/oHUwPBJhNqkTdsjUIySghR2kmV0ydQt8aZK0Wg8LyQasjHEfV6ohMCW9PGauBjGsXSrLdk51cMIYv9yY1Ovf9Ud1gcALg7h9pSsoTppAc/rC6DHzMf5UdRK1jtJ8xo5eXTV35aZoajxQuteibKUYKEqh2lBpX/k1Y6YXDhIWSvyeOvRcGjKeo3cq8Eiml1vkMQJmpyfUZgLBQ3FU2e+t5rF4nCaN3WB0SFNDDCV4pfF8LTZb+f8JMABSVefM615Y+wAAAABJRU5ErkJggg==',
                        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        email: 'foo@bar.de',
                    }
                ]
            }
        }),
        scrollTimeAnimation: widget.property({
            type: 'integer',
            defaultValue: 100
        }),
        rowHeight: widget.property({
            type: 'integer',
            defaultValue: 30
        }),
        getScrolledNode: function() {
            if(!this.node.getElementsByTagName('ul')[0]) {
                $(this.node).append('<ul></ul>');
            }
            return this.node.getElementsByTagName('ul')[0];
        },
        getRowSize: function() {
            return this.rowHeight() || 30;
        },
        appendHtml: function(str, fetch) {
            this.$super('appendHtml')(str, fetch);
            var row = this.getRowItemByPosition(this.items().getPosition());
            if(row && ! $(row).hasClass('waf-state-selected')) {
                $(row).addClass('waf-state-selected');
            }
        },
        init: function() {
            var that = this;
            var scrollerNode = this.getScrollerNode();
            var scrolledNode = this.getScrolledNode();

            this.addClass('waf-listview2');
            this.getItems().remove();

            this.rowHeight.onChange(function() {
            });


            $(this.node).on('click', function(e) {
                var row = $(e.target).closest('li')[0];
                if(! row) {
                    return;
                }
                var position = that.getRowPosition(row);
                if(position !== that.items().getPosition()) {
                    that._synchronizeSubscriber.pause();
                    that.items().select(position, function() {
                        that._synchronizeSubscriber.resume();
                        $(scrolledNode.children).removeClass('waf-state-selected');
                        $(row).addClass('waf-state-selected');
                    });
                }
                that.fire('onRowClick', row);
            });

            // scroll automatically to the selected element in the datasource
            this._synchronizeSubscriber = this.items.subscribe('currentElementChange', function() {

                if($(this.node).is(':hidden'))
                    return;

                var position = this.items().getPosition();
                if(position === -1) {
                    $(scrolledNode.children).removeClass('waf-state-selected');
                    return;
                }
                //console.warn('-> list view position : ', position);
                var size, scrollType, scroller = {}, rowPosition, scrollPosition;
                if(this.isHorizontalScroll()) {
                    scrollType = 'scrollLeft';
                    size = this.width();
                } else {
                    scrollType = 'scrollTop';
                    size = this.height();
                }
                scroller[scrollType] = rowPosition = position * this.getRowSize();
                scrollPosition = $(scrollerNode)[scrollType]();
                if(rowPosition < scrollPosition
                    || rowPosition + this.getRowSize() >= scrollPosition + size) {
                    $(scrollerNode).animate(scroller, that.scrollTimeAnimation(), _selectRow);
                } else {
                    _selectRow();
                }
                function _selectRow() {
                    var row = that.getRowItemByPosition(position);
                    //console.warn('-> list view select position : ', position);
                    if(row) {
                        $(scrolledNode.children).removeClass('waf-state-selected');
                        $(row).addClass('waf-state-selected');
                    }
                }
            }, this);
        }
    });

    ListView.inherit('waf-behavior/layout/template-livescroll');
    ListView.linkTemplatePropertyToLiveScrollTemplate('template');

    return ListView;
});
