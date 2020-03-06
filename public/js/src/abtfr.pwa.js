/**
 * Google PWA + Service Worker caching and offline availability
 *
 * @link https://developers.google.com/web/tools/lighthouse/
 * @link https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
 *
 * @package    abtfr
 * @subpackage abtfr/public
 * @author     Optimization.Team <info@optimization.team>
 */

Abtfr[CONFIG.LOAD_MODULE](function(window, Abtfr) {

    // public method for browsers that do not support Service Worker or Promise
    Abtfr.offline = function() {
        return {
            then: function() {}
        }
    }; // do nothing

    // test availability of serviceWorker
    if (!('serviceWorker' in window.navigator)) {
        return;
    }

    if (!Abtfr[CONFIG.PWA] || !Abtfr[CONFIG.PWA][CONFIG.PWA_PATH]) {
        return;
    }

    var document = window.document;

    // Google PWA config
    var PWA_CONFIG = Abtfr[CONFIG.PWA];

    // service worker ready state
    var READY = false;

    /**
     * Mark online/offline status by CSS class on <body>
     */
    if (PWA_CONFIG[CONFIG.PWA_OFFLINE_CLASS]) {

        var ONLINE;
        var UPDATE_ONLINE_STATUS = function() {
            Abtfr[CONFIG.RAF](function() {
                if (ONLINE === navigator.onLine || !document.body) {
                    return;
                }

                // update class
                if (navigator.onLine) {
                    if (typeof ONLINE === 'undefined') {
                        return;
                    }

                    if (ABTFRDEBUG) {
                        console.info('Abtfr.offline() ➤ connection restored');
                    }
                    document.body.classList.remove('offline');
                } else {

                    if (ABTFRDEBUG) {
                        console.warn('Abtfr.offline() ➤ connection offline');
                    }

                    document.body.classList.add('offline');
                }
                ONLINE = (navigator.onLine) ? true : false;
            });
        };
        window.addEventListener('online', UPDATE_ONLINE_STATUS);
        window.addEventListener('offline', UPDATE_ONLINE_STATUS);
        UPDATE_ONLINE_STATUS();
    }

    /**
     * Post config to service worker
     */
    var POST_CONFIG = function() {
        navigator.serviceWorker.controller.postMessage([1,
            PWA_CONFIG[CONFIG.PWA_POLICY],
            PWA_CONFIG[CONFIG.PWA_VERSION],
            PWA_CONFIG[CONFIG.PWA_MAX_SIZE]
        ]);
    }

    /**
     * Wait for Service Worker controller
     */
    navigator.serviceWorker.ready.then(function() {
        if (navigator.serviceWorker.controller) {
            POST_CONFIG();
        } else {
            navigator.serviceWorker.addEventListener('controllerchange', function() {
                POST_CONFIG();
            });
        }
        if (ABTFRDEBUG) {
            console.info('Abtfr.pwa() ➤ service worker ready');
        }
    });

    /**
     * Register Service Worker
     */
    if (PWA_CONFIG[CONFIG.PWA_REGISTER]) {
        navigator.serviceWorker.register(PWA_CONFIG[CONFIG.PWA_PATH], {
                scope: PWA_CONFIG[CONFIG.PWA_SCOPE]
            })
            .then(function waitUntilInstalled(registration) {
                return new Promise(function(resolve, reject) {
                    if (registration.installing) {
                        registration.installing.addEventListener('statechange', function(e) {

                            if (e.target.state == 'installed') {
                                if (ABTFRDEBUG) {
                                    console.info('Abtfr.pwa() ➤ service worker loaded');
                                }
                                resolve();
                            } else {

                                if (ABTFRDEBUG) {
                                    console.warn('Abtfr.pwa() ➤ service worker', e.target.state);
                                }

                                if (e.target.state == 'redundant') {
                                    reject();
                                }
                            }
                        });
                    } else {
                        if (ABTFRDEBUG) {
                            console.info('Abtfr.pwa() ➤ service worker loaded');
                        }
                        resolve();
                    }
                });
            })
            .catch(function(error) {
                throw error;
            });
    }

    /**
     * Listen for messages from Service Worker
     */
    navigator.serviceWorker.addEventListener('message', function(event) {

        // command data from PWA SW
        if (event && event.data && event.data instanceof Array) {

            // asset updated
            if (event.data[0] === 2) {
                if (!document.body) {
                    return;
                }

                var event = new CustomEvent('sw-update', {
                    detail: {
                        url: event.data[1]
                    }
                });
                window.dispatchEvent(event);
            }
        }

    });

    // on controller
    var ON_CONTROLLER = function(fn, params) {
        if (navigator.serviceWorker.controller) {
            fn.apply(window, params);
        } else {
            navigator.serviceWorker.ready.then(function() {
                fn.apply(window, params);
            });
        }
    }

    // send message with callback to service worker
    var SEND_MESSAGE = function(type, data) {

        return new Promise(function(resolve, reject) {

            // start message channel for callback
            var messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = function(event) {
                if (event.data && event.data.error) {
                    if (ABTFRDEBUG) {
                        console.info('Abtfr.' + type + '() ➤ error', event.data.error);
                    }
                } else {
                    resolve(event.data);
                }
            };

            navigator.serviceWorker.controller.postMessage(data, [messageChannel.port2]);
        });
    }

    /**
     * Install offline
     */
    var OFFLINE = function(urls, resolve) {
        ON_CONTROLLER(function(urls) {
            SEND_MESSAGE('offline', [2, urls]).then(function(data) {
                resolve(data.status);
            });
        }, [urls, resolve]);
    }

    /**
     * Custom Push Notification
     */
    var PUSH = function(title, options, resolve) {
        ON_CONTROLLER(function(title, options) {
            SEND_MESSAGE('push', [3, title, options]).then(function(data) {
                resolve(data.status);
            });
        }, [title, options]);
    }

    // public method
    Abtfr.offline = function(urls) {
        return new Promise(function(resolve) {
            OFFLINE(urls, resolve);
        }).catch(function(err) {
            if (ABTFRDEBUG) {
                console.info('Abtfr.offline() ➤ error', err, urls);
            }
        });
    }

    // custom push notification
    Abtfr.push = function(title, options) {
        return new Promise(function(resolve) {
            PUSH(title, options, resolve);
        }).catch(function(err) {
            if (ABTFRDEBUG) {
                console.info('Abtfr.push() ➤ error', err, title, options);
            }
        });
    }

    /**
     * Preload in service worker on mousedown
     */
    if (PWA_CONFIG[CONFIG.PWA_PRELOAD_MOUSEDOWN]) {

        var MOUSEDOWN_PRELOAD_ENABLED = true;

        // initiate preload
        var INIT_PRELOAD = function() {
            if (MOUSEDOWN_PRELOAD_ENABLED) {
                var href = this.getAttribute('href');
                if (href) {
                    OFFLINE(href, function() {});
                }
            }
        }

        // domready
        Abtfr[CONFIG.DOMREADY](function() {
            if (window.jQuery) {
                window.jQuery(function($) {
                    $('body').on('mousedown', 'a', INIT_PRELOAD);
                });
            } else {
                var links = Array.prototype.slice.call(
                    document.getElementsByTagName('a')
                );

                var count = links.length;
                for (var i = 0; i < count; i++) {
                    links[i].onmousedown = INIT_PRELOAD;
                }
            }
        });

        // public method to enable/disable functionality
        Abtfr.mousedown = function(state) {
            MOUSEDOWN_PRELOAD_ENABLED = (state) ? true : false;
        }
    }

});