/**
 * Unregister Google PWA Service Worker
 *
 * @package    abtfr
 * @subpackage abtfr/public
 * @author     Optimization.Team <info@optimization.team>
 */

Abtfr[CONFIG.LOAD_MODULE](function(window, Abtfr) {


    // test availability of serviceWorker
    if (!('serviceWorker' in window.navigator)) {
        return;
    }

    // functionality is disabled, this script should not be loaded
    if (!Abtfr[CONFIG.PWA_UNREGISTER]) {
        return;
    }

    var UNREGISTER = function() {
        try {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {

                console.warn(registrations);
                if (registrations) {
                    registrations.forEach(function(registration) {
                        if (typeof registration.unregister === 'function') {

                            // verify script url
                            if (registration.active && registration.active.scriptURL) {
                                if (!registration.active.scriptURL.match(/abtfr-pwa/)) {
                                    return;
                                }
                            }

                            if (ABTFRDEBUG) {
                                console.warn('Abtfr.pwa() ➤ unregister Service Worker', registration);
                            }
                            registration.unregister();
                        }
                    });
                }
            });
        } catch (e) {

        }
    }

    window.addEventListener('load', function() {
        if (Abtfr[CONFIG.IDLE]) {
            Abtfr[CONFIG.IDLE](UNREGISTER);
        } else {
            UNREGISTER();
        }
    });

});