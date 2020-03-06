/**
 * Load Javascript asynchronicly
 *
 * @package    abtfr
 * @subpackage abtfr/public
 * @author     Optimization.Team <info@optimization.team>
 */

Abtfr[CONFIG.LOAD_MODULE](function(window, Abtfr) {

    // active loading scripts
    var LOADING_SCRIPTS_COUNT = 0;

    // onload callback queue
    var ONLOAD_QUEUE = [];

    // queue callback to process when a script is loaded
    var ON_SCRIPT_LOAD = function(fn, args) {
        ONLOAD_QUEUE.push([fn, args]);
    };

    // script loaded, process callback queue
    var SCRIPT_LOADED = function() {
        var queue = ONLOAD_QUEUE.splice(0, ONLOAD_QUEUE.length);
        var l = queue.length;
        for (var i = 0; i < l; i++) {
            queue[i][0].apply(null, queue[i][1]);
        }
    };

    // abide WordPress dependencies
    var ABIDE_DEPENDENCIES = false;

    // dependency references
    var DEPENDENCIES = [];

    // dependency group references
    var DEPENDENCY_GROUPS = [];

    // dependency group references
    var DEPENDENCY_GROUP_REFERENCES = {};

    // dependency loaded state
    var DEPENDENCY_LOADED = {};

    if (ABTFRDEBUG) {
        var DEPENDENCY_WAIT_NOTICE = {};
    }

    // wait for dependencies to execute callback
    var WAIT_FOR_DEPENDENCIES = function(script, deps, callback) {

        // no dependencies
        if (deps === false || !(deps instanceof Array) || deps.length === 0) {
            callback();
            return;
        }

        var dependencies_ready = true;

        if (ABTFRDEBUG) {
            var wait_for = false;
            var wait_for_group = false;
        }

        var l = deps.length;
        for (var i = 0; i < l; i++) {

            // dependency group
            if (DEPENDENCY_GROUPS && DEPENDENCY_GROUPS[deps[i]]) {

                var gl = DEPENDENCY_GROUPS[deps[i]].length;
                for (var gi = 0; gi < gl; gi++) {
                    if (typeof DEPENDENCY_LOADED[DEPENDENCY_GROUPS[deps[i]][gi]] === 'undefined') {
                        dependencies_ready = false;

                        if (ABTFRDEBUG) {
                            wait_for = DEPENDENCY_GROUPS[deps[i]][gi];
                            wait_for_group = deps[i];
                        }

                        break;
                    }
                }

                if (!dependencies_ready) {
                    break;
                }

            } else {
                if (typeof DEPENDENCY_LOADED[deps[i]] === 'undefined') {
                    dependencies_ready = false;

                    if (ABTFRDEBUG) {
                        wait_for = deps[i];
                    }

                    break;
                }
            }

        }

        if (dependencies_ready === false) {

            if (LOADING_SCRIPTS_COUNT === 0) {

                // no more loading scripts, presume dependency configuration error and continue loading script

                if (ABTFRDEBUG) {

                    var depnames = [];
                    var l = deps.length;
                    for (var i = 0; i < l; i++) {
                        depnames.push((DEPENDENCIES[deps[i]] || deps[i]));
                    }

                    console.error('Abtfr.js() ➤ dependency unmet and no more scripts loading', (DEPENDENCIES[wait_for] || wait_for) + ((DEPENDENCIES[wait_for_group]) ? ' (' + DEPENDENCIES[wait_for_group] + ')' : ''), script, depnames);
                }

                callback();

            } else {

                if (ABTFRDEBUG) {
                    if (typeof DEPENDENCY_WAIT_NOTICE[script + ':' + wait_for] === 'undefined') {
                        DEPENDENCY_WAIT_NOTICE[script + ':' + wait_for] = true;

                        var depnames = [];
                        var l = deps.length;
                        for (var i = 0; i < l; i++) {
                            depnames.push((DEPENDENCIES[deps[i]] || deps[i]));
                        }

                        console.info('Abtfr.js() ➤ wait for dependency', (DEPENDENCIES[wait_for] || wait_for) + ((DEPENDENCIES[wait_for_group]) ? ' (' + DEPENDENCIES[wait_for_group] + ')' : ''), script, depnames);
                    }
                }

                /**
                 * Preload script
                 */
                if (typeof Abtfr[CONFIG.PRELOAD_CACHED_SCRIPT] !== 'undefined') {
                    Abtfr[CONFIG.PRELOAD_CACHED_SCRIPT](PARSE_URL(script));
                }

                // try again once a script is loaded
                ON_SCRIPT_LOAD(WAIT_FOR_DEPENDENCIES, [script, deps, callback]);
            }
        } else {
            callback();
        }
    }

    /**
     * Parse URL (e.g. protocol relative URL)
     */
    var PARSE_URL = function(url) {
        var parser = document.createElement('a');
        parser.href = url;
        return parser.href;
    };

    /**
     * Load script
     */
    var LOADSCRIPT = function(src, onLoad, onStart) {
        if (ABTFRDEBUG) {
            if (typeof onStart !== 'function') {
                onStart = function() {};
            }
        }

        // HTML5 cached script loader
        if (typeof Abtfr[CONFIG.LOAD_CACHED_SCRIPT] !== 'undefined') {
            Abtfr[CONFIG.LOAD_CACHED_SCRIPT](src, onLoad, onStart);
        } else {
            Abtfr[CONFIG.LOAD_SCRIPT](src, onLoad);
            if (ABTFRDEBUG) {
                onStart();
            }
        }
    };

    /**
     * Javascript processing method
     */
    Abtfr[CONFIG.LOAD_JS] = function(config) {

        if (typeof config !== 'object' || typeof config[0] === 'undefined' || !config[0]) {
            return;
        }

        /**
         * Javascript proxy enabled, mark scripts
         */
        if (typeof Abtfr[CONFIG.PROXY] !== 'undefined' && Abtfr[CONFIG.PROXY][CONFIG.PROXY_JS]) {
            Abtfr[CONFIG.LOAD_SCRIPT_MARK] = true;
        }

        var files = config[0];

        // dependencies disabled
        if (config[1] === false) {
            ABIDE_DEPENDENCIES = false;
        } else {
            ABIDE_DEPENDENCIES = true;

            // set dependency group references
            DEPENDENCY_GROUPS = (config[1] && typeof config[1] === 'object') ? config[1] : [];
        }

        if (ABTFRDEBUG) {

            // set dependency references
            DEPENDENCIES = (config[2] && config[2] instanceof Array) ? config[2] : [];

            if (DEPENDENCIES) {
                if (DEPENDENCY_GROUPS) {
                    var depgroups = [];
                    for (var group in DEPENDENCY_GROUPS) {
                        if (!DEPENDENCY_GROUPS.hasOwnProperty(group)) {
                            continue;
                        }
                        depgroups.push(DEPENDENCIES[group]);
                    }
                } else {
                    depgroups = false;
                }

                console.log('Abtfr.js() ➤ abide dependencies', DEPENDENCIES, depgroups);
            }
        }

        // target for inserting CSS
        //var target = (document.getElementById('AbtfrCSS')) ? document.getElementById('AbtfrCSS').nextSibling : false;

        // load script
        var loadScript = function(scriptPos) {
            if (typeof files[scriptPos] === 'undefined') {
                return;
            }

            if (typeof files[scriptPos] !== 'object') {
                if (ABTFRDEBUG) {
                    console.error('Abtfr.js()', 'Invalid Javascript file configuration', scriptPos, files);
                }
                return;
            }

            var scriptData = files[scriptPos];
            var script = scriptData[0];
            var async = ((scriptData[1]) ? true : false);
            var handle = ((typeof scriptData[2] !== 'undefined') ? scriptData[2] : false);
            var deps = ((scriptData[3]) ? scriptData[3] : false);

            // load script
            var startLoad = function(script, async, handle, deps, scriptPos) {

                if (ABTFRDEBUG) {
                    var depnames = [];
                    if (deps.length > 0) {
                        var l = deps.length;
                        for (var i = 0; i < l; i++) {
                            depnames.push((DEPENDENCIES[deps[i]] || deps[i]));
                        }
                    }
                }

                LOADING_SCRIPTS_COUNT++;

                // load script
                LOADSCRIPT(PARSE_URL(script), function scriptReady(cached) {

                    if (ABTFRDEBUG) {
                        if (deps.length > 0) {
                            if (cached) {
                                console.info('Abtfr.js() ➤ localStorage loaded', Abtfr[CONFIG.LOCALURL](script), (DEPENDENCIES[handle] || handle), depnames, '➤', cached);
                            } else {
                                console.info('Abtfr.js() ➤ loaded', Abtfr[CONFIG.LOCALURL](script), (DEPENDENCIES[handle] || handle), depnames);
                            }
                        } else {
                            if (cached) {
                                console.info('Abtfr.js() ➤ localStorage loaded', Abtfr[CONFIG.LOCALURL](script), '➤', cached);
                            } else {
                                console.info('Abtfr.js() ➤ loaded', Abtfr[CONFIG.LOCALURL](script));
                            }
                        }
                    }

                    LOADING_SCRIPTS_COUNT--;

                    // register dependency load state
                    if (handle !== false) {
                        DEPENDENCY_LOADED[handle] = true;
                    }

                    // trigger script loaded actions
                    SCRIPT_LOADED();

                    if (!async) {

                        // continue with next script
                        loadScript(++scriptPos);
                    }

                }, function onStart(cached) {
                    if (ABTFRDEBUG) {
                        if (deps.length > 0) {
                            if (cached) {
                                console.info('Abtfr.js() ➤ localStorage ' + ((async) ? 'async ' : '') + 'load start', Abtfr[CONFIG.LOCALURL](script), '➤', cached, (DEPENDENCIES[handle] || handle), depnames);
                            } else {
                                console.info('Abtfr.js() ➤ ' + ((async) ? 'async ' : '') + 'download start', Abtfr[CONFIG.LOCALURL](script), (DEPENDENCIES[handle] || handle), depnames);
                            }
                        } else {
                            if (cached) {
                                console.info('Abtfr.js() ➤ localStorage ' + ((async) ? 'async ' : '') + 'load start', Abtfr[CONFIG.LOCALURL](script), '➤', cached);
                            } else {
                                console.info('Abtfr.js() ➤ ' + ((async) ? 'async ' : '') + 'download start', Abtfr[CONFIG.LOCALURL](script));
                            }
                        }
                    };
                });
            };

            if (ABIDE_DEPENDENCIES && deps) {
                WAIT_FOR_DEPENDENCIES(script, deps, function callback() {
                    startLoad(script, async, handle, deps, scriptPos);
                });
            } else {
                startLoad(script, async, handle, deps, scriptPos);
            }

            if (async) {

                // continue with next script
                loadScript(++scriptPos);
            }

        };

        // start with first script
        loadScript(0);
    };

    /**
     * On script load
     */
    Abtfr[CONFIG.ON_SCRIPT_LOAD] = ON_SCRIPT_LOAD;

});