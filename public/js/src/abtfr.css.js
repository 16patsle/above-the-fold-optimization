/**
 * Load CSS asynchronicly
 *
 * @link https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
 *
 * @package    abtfr
 * @subpackage abtfr/public
 * @author     Optimization.Team <info@optimization.team>
 */

Abtfr[CONFIG.LOAD_MODULE](function(window, Abtfr) {

    // Wait for Critical CSS <style>
    var retrycount = 0;
    var retrydelay = 1;

    var timeset = false;

    Abtfr[CONFIG.LOAD_CSS] = function() {

        var m;
        var files = Abtfr[CONFIG.CSS];

        if (!files) {
            return;
        }

        if (typeof files !== 'object') {
            if (ABTFRDEBUG) {
                console.error('Abtfr.css()', 'output buffer failed to apply CSS optimization');
            }
            return;
        }

        if (ABTFRDEBUG) {
            console.log('Abtfr.css()', files);
        }

        // target for inserting CSS
        var target = (document.getElementById('AbtfrCSS')) ? document.getElementById('AbtfrCSS').nextSibling : false;

        for (i in files) {
            if (!files.hasOwnProperty(i) || typeof files[i] !== 'object') {
                if (ABTFRDEBUG) {
                    console.error('Abtfr.css()', 'Invalid CSS file configuration', i, files);
                }
                continue;
            }
            m = files[i][0].join(',');
            Abtfr[CONFIG.LOADCSS](files[i][1], m);
        }
    };

});