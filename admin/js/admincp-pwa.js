jQuery(function($) {

    // JSON editors
    var editors = {};

    // load condition selectize for editor
    if (jQuery('#offline_page').length > 0) {

        /**
         * Populate selectmenu
         */
        var selectize = jQuery('#offline_page').selectize({
            options: [],
            searchField: ['name', 'value'],
            persist: true,
            maxItem: 1,
            placeholder: "Enter a URL or absolute path, e.g. /offline/",
            delimiter: '|==abtf==|',
            render: {
                option: function(item, escape) {
                    return '<div class="opt">' +
                        '<span class="title">' +
                        '<span class="name">' + escape(item.name) + '</span>' +
                        '</span>' +
                        '</div>';
                },
                item: function(item, escape) {
                    return '<div>' +
                        '<span class="name">' + escape(item.name) + '</span>' +
                        '</div>';
                }
            },
            create: function(input) {
                return {
                    'value': input,
                    'name': input
                };
            },
            load: function(query, callback) {
                if (!query.length) return callback();
                jQuery.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        action: 'abtf_page_search',
                        query: query,
                        maxresults: 10
                    },
                    error: function() {
                        callback();
                    },
                    success: function(res) {
                        if (res && document.location.host) {
                            var l = res.length;
                            for (var i = 0; i < l; i++) {
                                res[i].value = res[i].value.replace(document.location.protocol + '//' + document.location.host, '');
                            }
                        }
                        callback(res);
                    }
                });
            },
            plugins: ['remove_button']
        });

    }


});