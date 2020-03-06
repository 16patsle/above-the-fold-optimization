/**
 * loadCSS (v1.2.0) improved with requestAnimationFrame following Google guidelines.
 *
 * @link https://github.com/filamentgroup/loadCSS/
 * @link https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
 *
 * @package    abtfr
 * @subpackage abtfr/public
 * @author     Optimization.Team <info@optimization.team>
 */

Abtfr[CONFIG.LOAD_MODULE](function(window, Abtfr) {

    var doc = window.document;

    // maintain correct order
    var sheetFragment;
    var sheetFragmentInserted;
    var sheetFragmentShouldMove;

    // return critical CSS element
    var CRITICAL_CSS_ELEMENT = function() {
        return document.getElementById('AbtfrCSS');
    }

    // wait for critical CSS element to be available
    var WAIT_FOR_CRITICAL_CSS = function(callback) {
        var target = CRITICAL_CSS_ELEMENT();
        if (target) {
            if (sheetFragmentShouldMove) {
                sheetFragmentShouldMove = false;
                target.parentNode.insertBefore(sheetFragment, target.nextSibling);
            }
            callback();
        } else {
            setTimeout(WAIT_FOR_CRITICAL_CSS, 0, callback);
        }
    }

    // start loadCSS
    Abtfr[CONFIG.LOADCSS] = function(href, media, callback) {

        if (ABTFRDEBUG) {
            console.info('Abtfr.css() ➤ loadCSS()[RAF] async download start', Abtfr[CONFIG.LOCALURL](href));
        }

        var el = doc.createElement("link");

        // create container to hold sheets in correct order
        if (!sheetFragment) {
            sheetFragment = document.createDocumentFragment();

            // insert after critical CSS
            if (!document.getElementById('AbtfrCSS')) {
                sheetFragmentShouldMove = true;
            }
            //target.parentNode.insertBefore(sheetFragment, target.nextSibling);
        }

        var sheets = doc.styleSheets;
        el.rel = "stylesheet";
        el.href = href;
        // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
        el.media = "only x";

        // loadCSS originally uses a callback to wait for document.body
        // this could potentially cause an invalid CSS order
        // ABTFR uses a document fragment that preserves order 
        // and it starts loading directly after the critical CSS for faster async loading in modern browsers
        /*function ready(cb) {
            if (document.getElementById('AbtfrCSS')) {
                if (!ref && !queueFragmentInserted) {
                    queueFragmentInserted = true;
                }
                return cb();
            }
            setTimeout(function() {
                ready(cb);
            });
        }*/

        /**
         * CSS rendered flag
         */
        var CSSrendered = false;

        // A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
        var onloadcss_fallback = function(cb) {

            if (CSSrendered) {
                return;
            }

            var resolvedHref = el.href;
            var i = sheets.length;
            while (i--) {
                if (CSSrendered) {
                    break;
                }
                if (sheets[i].href === resolvedHref) {
                    return cb();
                }
            }
            setTimeout(function() {
                onloadcss_fallback(cb);
            });
        };

        /**
         * Render CSS when file is loaded
         */
        function renderCSS() {

            // already rendered?
            if (CSSrendered) {
                return;
            }
            CSSrendered = true;

            if (el.addEventListener) {
                el.removeEventListener("load", renderCSS);
            }

            function render() {

                // complete rendering
                var startRender = function() {

                    /**
                     * Use animation frame to paint CSS
                     *
                     * @link https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
                     */

                    Abtfr[CONFIG.RAF](function() {

                        el.media = media || "all";
                        if (ABTFRDEBUG) {
                            console.info('Abtfr.css() ➤ loadCSS()[RAF] render', Abtfr[CONFIG.LOCALURL](href));
                        }

                        /**
                         * Callback on completion
                         */
                        if (callback) {
                            callback();
                        }
                    });
                }

                // sheet fragment should move after critical CSS
                if (sheetFragmentShouldMove) {
                    WAIT_FOR_CRITICAL_CSS(startRender);
                } else {
                    startRender();
                }
            }

            if (typeof Abtfr[CONFIG.CSS_DELAY] !== 'undefined' && parseInt(Abtfr[CONFIG.CSS_DELAY]) > 0) {

                if (ABTFRDEBUG) {
                    console.info('Abtfr.css() ➤ loadCSS()[RAF] render delay', Abtfr[CONFIG.CSS_DELAY], Abtfr[CONFIG.LOCALURL](href));
                }

                /**
                 * Delayed rendering
                 */
                setTimeout(render, Abtfr[CONFIG.CSS_DELAY]);
            } else {
                render();
            }
        }

        // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
        if (el.addEventListener) {
            el.addEventListener("load", renderCSS);
        } else {
            el.onload = renderCSS;
        }

        // add to fragment
        sheetFragment.appendChild(el);

        if (!sheetFragmentInserted) {
            (doc.head || doc.getElementsByTagName("head")[0]).appendChild(sheetFragment);
            console.log(doc.head.contains(sheetFragment));
        }


        console.log(el, 'inserted');
        console.log(sheetFragment);
        onloadcss_fallback(renderCSS);

        return el;
    }

});