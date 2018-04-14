# WordPress Page Speed Optimization for SEO

The Page Speed Optimization plugin is a toolkit for WordPress Optimization with a focus on SEO. The plugin enables to achieve a 100 score in the [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) test.

The plugin is compatible with most optimization, caching and minification plugins such as Autoptimize and W3 Total Cache. The plugin offers modular compatibility and can be extended to support any optimization plugin. ([more info](https://github.com/optimalisatie/above-the-fold-optimization/tree/master/trunk/modules/plugins/))

**This plugin is removed from WordPress.org. Read the story [here](https://github.com/o10n-x/wordpress-css-optimization/issues/4).**

## Installation

![Github Updater](https://github.com/afragen/github-updater/raw/develop/assets/GitHub_Updater_logo_small.png)

This plugin can be installed and updated using [Github Updater](https://github.com/afragen/github-updater) ([installation instructions](https://github.com/afragen/github-updater/wiki/Installation))

## New! WordPress WPO Collection

The Page Speed Optimization plugin (previously named *Above The Fold Optimization*) is very old and was originally designed for Google PageSpeed optimization. While a Google PageSpeed 100 score is still of value, websites with a high Google PageSpeed score may score very bad in Google's new [Lighthouse performance test](https://developers.google.com/web/tools/lighthouse/). 

The following scores are for the same site. It shows that a perfect Google PageSpeed score does not correlate to a high Google Lighthouse performance score.

![Perfect Google PageSpeed 100 Score](https://github.com/o10n-x/wordpress-css-optimization/blob/master/docs/images/google-pagespeed-100.png) ![Google Lighthouse Critical Performance Score](https://github.com/o10n-x/wordpress-css-optimization/blob/master/docs/images/lighthouse-performance-15.png)

We developed [new optimization plugins](https://github.com/o10n-x/) that are designed to achieve perfect Google Lighouse scores and to validate a website as [Google PWA](https://developers.google.com/web/progressive-web-apps/). The new plugins are available on our Github company profile: https://github.com/o10n-x/

The new optimization plugins include [CSS](https://github.com/o10n-x/wordpress-css-optimization), [Javascript](https://github.com/o10n-x/wordpress-javascript-optimization), [HTML](https://github.com/o10n-x/wordpress-html-optimization), [Web Font](https://github.com/o10n-x/wordpress-font-optimization), [Progressive Web App (Service Worker)](https://github.com/o10n-x/wordpress-pwa-optimization), [HTTP/2](https://github.com/o10n-x/wordpress-http2-optimization) and [Security Header](https://github.com/o10n-x/wordpress-security-header-optimization) optimization. 

### Google PageSpeed score is outdated

For the web to have a chance of survival in a mobile era it needs to compete with and win from native mobile apps. Google is dependent on the open web for it's advertising revenue. Google therefor seeks a way to secure the open web and the main objective is to rapidly enhance the quality of the open web to meet the standards of native mobile apps.

For SEO it is therefor simple: websites will need to meet the standards set by the [Google Lighthouse Test](https://developers.google.com/web/tools/lighthouse/) (or Google's future new tests). A website with perfect scores will be preferred in search over low performance websites. The officially announced [Google Speed Update](https://searchengineland.com/google-speed-update-page-speed-will-become-ranking-factor-mobile-search-289904) (July 2018) shows that Google is going as far as it can to drive people to enhance the quality to ultra high levels, to meet the quality of, and hopefully beat native mobile apps.

**The new WPO plugins are in beta release.**

https://github.com/o10n-x/

# Page Speed Optimization Description

## Critical CSS Tools

The plugin contains tools to manage Critical Path CSS. 

Some of the features:

* Conditional Critical CSS (apply tailored Critical CSS to specific pages based on WordPress conditions and filters)
* Management via text editor and FTP (critical CSS files are stored in the theme directory)
* Full CSS Extraction: selectively export CSS files of a page as a single file or as raw text for use in critical CSS generators.
* Quality Test: test the quality of Critical CSS by comparing it side-by-side with the full CSS display of a page. This tool can be used to detect a flash of unstyled content ([FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)).
* A [javascript widget](https://github.com/optimalisatie/above-the-fold-optimization/blob/master/admin/js/css-extract-widget.js) to extract simple critical CSS with a click from the WordPress admin bar.
* A live critical CSS editor.

Read more about Critical CSS in the [documentation by Google](https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent). 
[This article](https://github.com/addyosmani/critical-path-css-tools) by a Google engineer provides information about the available methods for creating critical CSS. 

## CSS Load Optimization

The plugin contains tools to optimize the delivery of CSS in the browser.

Some of the features:

* Async loading via [loadCSS](https://github.com/filamentgroup/loadCSS) (enhanced with `requestAnimationFrame` API following the [recommendations by Google](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery))
* Remove CSS files from the HTML source.
* Capture and proxy (script injected) external stylesheets to load the files locally or via a CDN with optimized cache headers. This feature enables to pass the "[Leverage browser caching](https://developers.google.com/speed/docs/insights/LeverageBrowserCaching)" rule from Google PageSpeed Insights.

**The plugin does not provide CSS code optimization, minification or concatenation.**

## Javascript Load Optimization

The plugin contains tools to optimize the loading of javascript.

Some of the features:
* Robust async script loader based on [little-loader](https://github.com/walmartlabs/little-loader) by Walmart Labs ([reference](https://formidable.com/blog/2016/01/07/the-only-correct-script-loader-ever-made/))
* HTML5 Web Worker and Fetch API based script loader with localStorage cache and fallback to little-loader for old browsers.
* jQuery Stub that enables async loading of jQuery.
* Abiding of WordPress dependency configuration while loading files asynchronously.
* Lazy Loading Javascript (e.g. Facebook or Twitter widgets) based on [jQuery Lazy Load XT](https://github.com/ressio/lazy-load-xt#widgets).
* Capture and proxy (script injected) external javascript files to load the files locally or via a CDN with optimized cache headers. This feature enables to pass the "[Leverage browser caching](https://developers.google.com/speed/docs/insights/LeverageBrowserCaching)" rule from Google PageSpeed Insights.

The HTML5 script loader offers the following advantages when configured correctly:

* 0 javascript file download during navigation
* 0 javascript file download for returning visitors (e.g. from Google search results, leading to a reduced bounce rate)
* faster script loading than browser cache, especially on mobile (according to a [proof of concept](https://addyosmani.com/basket.js/) by a Google engineer)

**The plugin does not provide Javascript code optimization, minification or concatenation.**

### Google PWA Optimization

The plugin contains tools to achieve a 100 / 100 / 100 / 100 score in the [Google Lighthouse Test](https://developers.google.com/web/tools/lighthouse/). Google has been promoting [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) (PWA) as the future of the internet: a combination of the flexability and openness of the existing web with the user experience advantages of native mobile apps. In essence: a mobile app that can be indexed by Google and that can be managed by WordPress. 

This plugin provides an advanced [HTML5 Service Worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) based solution to create a PWA with any website.

Some of the features:

* JSON based request and cache policy that includes regular expressions and numeric operator comparison for request and response headers.
* Offline availability management: default offline page, image or resource.
* Prefetch/preload resources in the Service Worker for fast access and/or offline availability.
* Event/click based offline cache (e.g. "click to read this page offline")
* HTTP HEAD based cache updates.
* Option to add `offline` class on `<body>` when the connection is offline.
* [Web App Manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) management: add website to home screen on mobile devices, track app launches and more.

## Google Web Font Optimization

The plugin contains tools to optimize [Google Web Fonts](https://fonts.google.com/). 

Some of the features:

* Load Google Web Fonts via [Google Web Font Loader](https://github.com/typekit/webfontloader).
* Auto-discovery of Google Web Fonts using:
	* Parse `<link rel="stylesheet">` in HTML source.
	* Parse `@import` links in minified CSS from minification plugins (e.g. Autoptimize).
	* Parse existing `WebFontConfig` javascript configuration.
* Remove fonts to enable local font loading.
* Upload Google Web Font Packages from [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/) to the theme directory.

## Gulp.js Critical CSS Creator

The plugin contains a tool to create Critical CSS based on [Gulp.js](https://gulpjs.com/) tasks. The tool is based on [critical](https://github.com/addyosmani/critical) (by a Google engineer).

## Maintainers

* [@optimalisatie](https://github.com/optimalisatie)

## License

(C) [www.pagespeed.pro](https://pagespeed.pro) 2014–2018, released under the MIT license
