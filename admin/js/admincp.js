/**
 * Request animation frame
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

if (!window.requestIdleCallback) {
    window.requestIdleCallback = function (fn) {
        setTimeout(fn);
    };
}

jQuery(function ($) {

    /**
     * Compare Critical CSS menu
     */
    if (jQuery('#criticalcss-test-pages').length > 0 && typeof jQuery('#criticalcss-test-pages').selectize !== 'undefined') {

        // download button
        jQuery('#splitview').on('click', function () {

            var href = jQuery('#criticalcss-test-pages').val();

            if (href === '') {
                alert('Select a page...');
                return;
            }

            if (/\?/.test(href)) {
                href += '&';
            } else {
                href += '?';
            }
            window.open(href + 'critical-css-editor=1');
        });

        // download button
        jQuery('#editorview').on('click', function () {

            var href = jQuery('#criticalcss-test-pages').val();

            if (href === '') {
                alert('Select a page...');
                return;
            }

            if (/\?/.test(href)) {
                href += '&';
            } else {
                href += '?';
            }
            window.open(href + 'critical-css-editor=1#editor');
        });

        // print button
        jQuery('#fullview').on('click', function () {

            var href = jQuery('#criticalcss-test-pages').val();

            if (href === '') {
                alert('Select a page...');
                return;
            }

            if (/\?/.test(href)) {
                href += '&';
            } else {
                href += '?';
            }
            window.open(href + 'critical-css-view=1');
        });

    }


    // text selection
    $('.clickselect').on('click', function () {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText($(this)[0]);
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode($(this)[0]);
            window.getSelection().addRange(range);
        }
    });

    /**
     * Search/replace example
     */

    // example links
    $('[data-example]').each(function (index, el) {
        $(el).on('click', function (e) {
            var example = $('#' + $(this).data('example'));
            if (example.length > 0) {

                var original_text = example.data('example-text');
                var original_html = example.html();

                var example_html = $(this).data('example-html');
                if (typeof example_html !== 'string') {
                    example_html = JSON.stringify(example_html);
                }

                example.html(example_html);
                example.data('example-text', $(this).html());

                $(this).html(original_text);
                $(this).data('example-html', original_html);
            }
        });
    });
});