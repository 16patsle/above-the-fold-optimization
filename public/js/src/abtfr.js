/**
 * ABTF Reborn Javascript
 *
 * This javascript handles the CSS delivery optimization.
 *
 * @package    abtfr
 * @subpackage abtfr/public
 * @author     Optimization.Team <info@optimization.team>
 */
(function(window, Abtfr, undefined) {

    if (ABTFRDEBUG) {
        console.warn('Abtfr', 'debug notices visible to admin only');
    };

    /**
     * DomReady
     */
    Abtfr[CONFIG.DOMREADY] = function(a, b, c) {
        b = document;
        c = 'addEventListener';
        b[c] ? b[c]('DOMContentLoaded', a) : window.attachEvent('onload', a);
    };

    // init ABTF Reborn client
    var MODULE_QUEUE = [];
    var CORE_MODULE_LOADED;
    Abtfr[CONFIG.LOAD_MODULE] = function(factory, core) {
        if (!CORE_MODULE_LOADED && !core) {
            MODULE_QUEUE.push(factory);
        } else {
            factory(window, window.Abtfr, window.document, Object);
            if (core === true) {
                if (MODULE_QUEUE.length > 0) {
                    var module = MODULE_QUEUE.shift();
                    while (module) {
                        Abtfr[CONFIG.LOAD_MODULE](module, 1);
                        module = MODULE_QUEUE.shift();
                    }
                }
                CORE_MODULE_LOADED = true;

                // load queued header init
                if (HEADER_LOAD_QUEUED) {
                    Abtfr[CONFIG.HEADER]();
                }
            }
        }
    };

    // Core factory 
    var CoreModule = function(window, Abtfr) {

        // requestAnimationFrame
        var raf = (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            });
        Abtfr[CONFIG.RAF] = function() {
            raf.apply(window, arguments);
        };

        // requestIdleCallback, run tasks in CPU idle time
        var id = (window.requestIdleCallback) ? window.requestIdleCallback : false;
        Abtfr[CONFIG.IDLE] = (id) ? function() {
            id.apply(window, arguments);
        } : false;

        if (Abtfr[CONFIG.GWF]) {
            var GWF_CONFIG = Abtfr[CONFIG.GWF];
        }

        // load Google WebFonts
        var LOAD_GWF = function() {
            if (GWF_CONFIG[CONFIG.GWF_ASYNC]) {
                Abtfr[CONFIG.ASYNC](GWF_CONFIG[CONFIG.GWF_ASYNC_URL], 'webfont');

                if (ABTFRDEBUG) {
                    console.log('Abtfr.fonts()', 'async', window.WebFontConfig);
                }

            } else if (typeof window.WebFont !== 'undefined') {

                // load WebFontConfig
                window.WebFont.load(window.WebFontConfig);

                if (ABTFRDEBUG) {
                    console.log('Abtfr.fonts()', window.WebFontConfig);
                }
            }
        }

        /**
         * Header init
         */
        Abtfr[CONFIG.HEADER] = function() {

            if (Abtfr[CONFIG.PROXY]) {
                Abtfr[CONFIG.PROXY_SETUP](Abtfr[CONFIG.PROXY]);
            }
            // load scripts in header
            if (Abtfr[CONFIG.JS] && !Abtfr[CONFIG.JS][1]) {
                Abtfr[CONFIG.LOAD_JS](Abtfr[CONFIG.JS][0]);
            }

            // Google Web Font Loader
            if (Abtfr[CONFIG.GWF]) {

                if (typeof window.WebFontConfig === 'undefined') {
                    window.WebFontConfig = {};
                }

                // apply Google Fonts
                if (GWF_CONFIG[CONFIG.GWF_GOOGLE_FONTS]) {
                    if (!window.WebFontConfig.google) {
                        window.WebFontConfig.google = {};
                    }
                    if (!window.WebFontConfig.google.families) {
                        window.WebFontConfig.google.families = [];
                    }
                    var l = GWF_CONFIG[CONFIG.GWF_GOOGLE_FONTS].length;
                    for (var i = 0; i < l; i++) {
                        window.WebFontConfig.google.families.push(GWF_CONFIG[CONFIG.GWF_GOOGLE_FONTS][i]);
                    }
                }

                if (!GWF_CONFIG[CONFIG.GWF_FOOTER]) {
                    LOAD_GWF();
                }
            }

            // load CSS
            if (Abtfr[CONFIG.LOAD_CSS] && !Abtfr[CONFIG.CSS_FOOTER]) {
                Abtfr[CONFIG.LOAD_CSS]();
            }
        };

        /**
         * Footer init
         */
        Abtfr[CONFIG.FOOTER] = function() {

            // Load CSS
            if (Abtfr[CONFIG.LOAD_CSS] && Abtfr[CONFIG.CSS_FOOTER]) {

                if (ABTFRDEBUG) {
                    console.log('Abtfr.css()', 'footer start');
                }

                Abtfr[CONFIG.LOAD_CSS]();
            }

            // load scripts in footer
            if (Abtfr[CONFIG.JS] && Abtfr[CONFIG.JS][1]) {

                if (ABTFRDEBUG) {
                    console.log('Abtfr.js()', 'footer start');
                }

                Abtfr[CONFIG.LOAD_JS](Abtfr[CONFIG.JS][0]);
            }

            // Google Web Font Loader
            if (Abtfr[CONFIG.GWF] && GWF_CONFIG[CONFIG.GWF_FOOTER]) {

                if (ABTFRDEBUG) {
                    console.log('Abtfr.fonts()', 'footer start');
                }
                LOAD_GWF();
            }
        };

        // footer load position
        Abtfr[CONFIG.DOMREADY](Abtfr[CONFIG.FOOTER]);

        /**
         * Async load script
         */
        Abtfr[CONFIG.ASYNC] = function(scriptFile, id) {
            (function(d) {
                var wf = d.createElement('script');
                wf.src = scriptFile;
                if (id) {
                    wf.id = id;
                }
                wf.async = true;
                var s = d.getElementsByTagName('script')[0];
                if (s) {
                    s.parentNode.insertBefore(wf, s);
                } else {
                    var h = document.head || document.getElementsByTagName("head")[0];
                    h.appendChild(wf);
                }
            })(document);
        }

        if (ABTFRDEBUG) {

            var SITE_URL = document.createElement('a');
            SITE_URL.href = document.location.href;
            var BASE_URL_REGEX = new RegExp('^(https?:)?//' + SITE_URL.host.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');

            /**
             * Return local url for debug notices
             */
            Abtfr[CONFIG.LOCALURL] = function(url) {
                return url.replace(BASE_URL_REGEX, '');
            }
        }
    }

    // load config
    var configParam = 'data-abtfr';
    var LOAD_CONFIG = function(script) {
        var config = script.getAttribute(configParam);
        if (config && typeof config === 'string') {
            try {
                config = JSON.parse(config);
            } catch (err) {
                if (ABTFRDEBUG) {
                    console.error('Abtfr', 'failed to parse config', config, err);
                }
            }
        }
        if (!config || !(config instanceof Array)) {
            if (ABTFRDEBUG) {
                console.error('Abtfr', 'invalid config', config);
            }
            throw new Error('invalid config');
        }
        var l = config.length;
        for (var i = 0; i < l; i++) {
            if (typeof window.Abtfr[i] !== 'undefined') {
                continue;
            }
            window.Abtfr[i] = (config[i] === -1) ? undefined : config[i];
        }

        // load core module
        Abtfr[CONFIG.LOAD_MODULE](CoreModule, true);
    }

    // detect script object
    if (document.currentScript && document.currentScript.hasAttribute(configParam)) {
        LOAD_CONFIG(document.currentScript);
    } else {

        // old browsers, IE6-9 etc
        var getCurrentScript = function() {
            return document.querySelector('script[' + configParam + ']');
        }
        var currentScript = getCurrentScript();
        if (currentScript) {
            LOAD_CONFIG(currentScript);
        } else {

            var missingError = '<script ' + configParam + '> client missing';

            // script not located, try again on domready
            if (window.console && typeof console.error !== 'undefined') {
                console.error(missingError);
            }

            Abtfr[CONFIG.DOMREADY](function() {
                currentScript = getCurrentScript();
                if (currentScript) {
                    LOAD_CONFIG(currentScript);
                } else {
                    if (ABTFRDEBUG) {
                        console.warn('Abtfr', 'client script <script ' + configParam + '> detected on domready. Make sure that the script tag is included in the header unmodified.');
                    }
                    throw new Error(missingError);
                }
            });
        }
    }

    // header load queue
    var HEADER_LOAD_QUEUED;
    Abtfr[CONFIG.HEADER_LOAD] = function() {
        if (CORE_MODULE_LOADED) {
            Abtfr[CONFIG.HEADER]();
        } else {
            HEADER_LOAD_QUEUED = true;
        }
    }

})(window, Abtfr);