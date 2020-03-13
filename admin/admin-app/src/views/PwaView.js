import React from 'react';
import { Helmet } from 'react-helmet';
import { __, sprintf } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../utils/useLinkState';
import {
  adminUrl,
  homeUrl,
  siteTitle,
  abtfrAdminNonce,
  wpAbtfrUri
} from '../utils/globalVars';
import JsonEditor from '../components/JsonEditor';
import {
  pwaAssetCacheSchema,
  pwaManifestSchema
} from '../components/editorSchema';
import ApiExample from '../components/ApiExample';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingSelect from '../components/SettingSelect';
import SettingTextInput from '../components/SettingTextInput';
import SettingNumberInput from '../components/SettingNumberInput';
import SettingInnerTable from '../components/SettingInnerTable';
import SettingTextarea from '../components/SettingTextarea';
import SubmitButton from '../components/SubmitButton';
import OfflinePageSelect from '../components/OfflinePageSelect';
import getSettings from '../utils/getSettings';

const PwaView = () => {
  const [options, setOption, setOptions, linkOptionState] = useLinkState();

  const getOption = option => options[option];

  const { data, error } = useSWR('settings', getSettings);

  if (error) {
    return <div>{sprintf(__('Error: $s', 'abtfr'), error)}</div>;
  }

  const loading = <div>{__('Loading...', 'abtfr')}</div>;

  if (!data) {
    return loading;
  }

  if (!options) {
    setOptions(data);
    return loading;
  }

  return (
    <form
      method="post"
      action={adminUrl + 'admin-post.php?action=abtfr_pwa_update'}
      className="clearfix"
    >
      <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
      <PageContent header={__('Progressive Web App Optimization', 'abtfr')}>
        <Helmet>
          <title>
            {__('Progressive Web App Optimization', 'abtfr')} {siteTitle}
          </title>
        </Helmet>
        <div>
          <div style={{ textAlign: 'center' }}>
            <a
              href="https://developers.google.com/web/tools/lighthouse/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${wpAbtfrUri}admin/images/google-lighthouse-pwa-validation.jpg`}
                alt="Google Bot"
                width="100%"
                style={{ maxWidth: 1141, maxHeight: 359 }}
                title="Google Lighthouse PWA Validation"
              />
            </a>
          </div>
          <p>
            Google has been promoting{' '}
            <a
              href="https://developers.google.com/web/progressive-web-apps/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Progressive Web Apps
            </a>{' '}
            (PWA) as the future of the internet: a combination of the
            flexibility and openness of the existing web with the user
            experience advantages of native mobile apps. In essence: a mobile
            app that can be indexed by Google and that can be managed by
            WordPress.
          </p>
          <p>
            Google provides an extensive test called{' '}
            <a
              href="https://developers.google.com/web/tools/lighthouse/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lighthouse
            </a>{' '}
            that tests for validity against the key qualities of a Progressive
            Web App: performance, accessibility, and more.
          </p>
          <p>
            This tool enables to score 100 / 100 / 100 / 100 in the lighthouse
            test and validate a website as Progressive Web App for improved
            mobile user experiences and findability.
          </p>
          <p>
            At the core of the features of a Progressive Web App is a{' '}
            <a
              href="https://developers.google.com/web/fundamentals/getting-started/primers/service-workers"
              target="_blank"
              rel="noopener noreferrer"
            >
              HTML5 Service Worker
            </a>
            . It's supported by every major modern browser (
            <a
              href="https://jakearchibald.github.io/isserviceworkerready/"
              target="_blank"
              rel="noopener noreferrer"
            >
              browser compatibility
            </a>
            ).
          </p>
        </div>
        <div>
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                header={__('Enable PWA', 'abtfr')}
                name="abtfr[pwa]"
                link={linkOptionState('pwa')}
                label={__('Enabled', 'abtfr')}
                description={
                  <>
                    Enable PWA functionality in browsers that support{' '}
                    <a
                      href="https://jakearchibald.github.io/isserviceworkerready/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Service Worker
                    </a>
                    .
                  </>
                }
              />
              <SettingInnerTable
                className="serviceworkeroptions"
                header={__('Service Worker Settings', 'abtfr')}
              >
                {!getOption('pwa') && (
                  <SettingCheckbox
                    name="abtfr[pwa_unregister]"
                    header={__('Unregister Service Worker', 'abtfr')}
                    link={linkOptionState('pwaUnregister')}
                    label={__('Enabled', 'abtfr')}
                    description={__(
                      'Unregister the PWA Service Worker for visitors.',
                      'abtfr'
                    )}
                  />
                )}
                {getOption('pwa') && (
                  <>
                    <SettingCheckbox
                      name="abtfr[pwa_register]"
                      header={__('Register Service Worker', 'abtfr')}
                      link={linkOptionState('pwaRegister')}
                      label={__('Enabled', 'abtfr')}
                      description={
                        <>
                          Unchecking this option enables to combine the PWA
                          Service Worker with other service workers, for example
                          for{' '}
                          <a href={getOption('pushNotificationPluginsUrl')}>
                            Push Notifications
                          </a>
                          . If you want to load the PWA Service Worker using{' '}
                          <code>importScripts</code> use the file{' '}
                          <a
                            href={`${homeUrl}/${getOption('pwaSwFilename')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={getOption('pwaSwFilename')}
                          >
                            /{getOption('pwaSwFilename')}
                          </a>
                          .
                        </>
                      }
                    />

                    <SettingTextInput
                      name="abtfr[pwa_scope]"
                      header={__('Service Worker Scope', 'abtfr')}
                      link={linkOptionState('pwaScope')}
                      placeholder="Leave blank for global scope"
                      title={`Global scope: ${getOption('pwaScopeCurrent')}`}
                      description={
                        <>
                          Enter an optional{' '}
                          <a
                            href="https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#register_a_service_worker"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            scope
                          </a>{' '}
                          for the service worker, e.g. <code>/blog/</code>. The
                          scope restricts the PWA functionality to a path.
                        </>
                      }
                    />
                    <tr valign="top">
                      <th scope="row">Push Notification API</th>
                      <td>
                        <p className="description">
                          The PWA Service Worker supports sending Push
                          Notifications (
                          <a
                            href="https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            documentation
                          </a>
                          ).
                        </p>
                        <ApiExample
                          description={
                            <>
                              The API is <code>Abtfr.push(title,options)</code>
                            </>
                          }
                        >
                          {`
/*
  ${__('You must first obtain permissions', 'abtfr')}
  https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
*/
Notification.requestPermission(function(result){
  if (result === 'granted') {
    Abtfr.push('${__('Welcome back!', 'abtfr')}',{
      body: 'Buzz! Buzz!',
      icon: '../images/touch/chrome-touch-icon-192x192.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: 'vibration-sample'
    })
    .then(function(status) {
      console.log('${__('Notification sent', 'abtfr')}', status);
    });
  }
});
                      `.trim()}
                        </ApiExample>
                      </td>
                    </tr>
                  </>
                )}
              </SettingInnerTable>
              <tr valign="top">
                <td colSpan="2" style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Info
                    color="yellow"
                    style={{ marginTop: '1em', fontSize: 14 }}
                  >
                    <strong>Tip:</strong> For debugging the Service Worker see:{' '}
                    <strong>chrome://serviceworker-internals</strong> (copy in
                    the address bar)
                  </Info>
                </td>
              </tr>
              <SettingCheckbox
                name="abtfr[pwa_cache_pages]"
                header={__('Offline Cache', 'abtfr')}
                link={linkOptionState('pwaCachePages')}
                label={__('Enabled', 'abtfr')}
                description={__(
                  'Cache HTML pages in the service worker. This option enables to make a website available offline.',
                  'abtfr'
                )}
              />
              <SettingInnerTable
                header={__('Offline Cache Settings', 'abtfr')}
                style={!getOption('pwaCachePages') ? { display: 'none' } : {}}
              >
                <SettingSelect
                  header={__('HTML Cache Strategy', 'abtfr')}
                  name="abtfr[pwa_cache_pages_strategy]"
                  link={linkOptionState('pwaCachePagesStrategy')}
                  options={[
                    {
                      value: 'network',
                      name: __('Network → Cache', 'abtfr')
                    },
                    {
                      value: 'cache',
                      name: __('Cache → Network', 'abtfr')
                    },
                    {
                      value: 'event',
                      name: __('On demand (event based)', 'abtfr')
                    }
                  ]}
                  description={__(
                    'By default HTML pages are fetched from the network with the cache as fallback when the network fails. Select the Cache First strategy to serve pages from cache with the network as backup. Select the On demand strategy to use a Cache First strategy with a manual (event based) cache storage (e.g. "click to read this page offline").',
                    'abtfr'
                  )}
                >
                  <ApiExample
                    description={
                      <>
                        The API is <code>Abtfr.offline(url);</code> which can
                        also be used for precaching.
                      </>
                    }
                  >
                    {`
Abtfr.offline(['/shop/','/shop/product1.html','/wp-content/uploads/.../product-image.jpg'])
  .then(function(status) {
    console.log('${__('Resources available offline', 'abtfr')}', status);
  });
                      `.trim()}
                  </ApiExample>
                </SettingSelect>
                <SettingTextarea
                  header={__('HTML Cache Include List', 'abtfr')}
                  textareaClass="json-array-lines"
                  name="abtfr[pwa_cache_pages_include]"
                  link={linkOptionState('pwaCacheInclude')}
                  placeholder="Leave blank to cache all pages"
                  description={
                    <>
                      Enter (parts of) page URL's to cache, e.g.{' '}
                      <code>category/</code> to match all pages in a category.
                    </>
                  }
                />
                <SettingCheckbox
                  name="abtfr[pwa_cache_assets]"
                  header={__('Cache Assets', 'abtfr')}
                  link={linkOptionState('pwaCacheAssets')}
                  label={__('Enabled', 'abtfr')}
                  description={__(
                    'Cache assets such as scripts and styles. Use a request and/or response filter to apply a cache strategy and enable or disable caching for specific assets.',
                    'abtfr'
                  )}
                />
                {getOption('pwaCacheAssets') && (
                  <tr valign="top">
                    <th scope="row">
                      {__('Asset Cache Include Policy', 'abtfr')}
                    </th>
                    <td>
                      <JsonEditor
                        name="pwa.cache.assets"
                        schema={pwaAssetCacheSchema}
                        link={linkOptionState('pwaCacheAssetsPolicy')}
                        compact="tree"
                        maxLines={50}
                      ></JsonEditor>
                      <input
                        type="hidden"
                        name="abtfr[pwa_cache_assets_policy]"
                        id="cache_assets_src"
                        value={JSON.stringify(
                          getOption('pwaCacheAssetsPolicy')
                        )}
                      />
                    </td>
                  </tr>
                )}
                <OfflinePageSelect
                  header={__('Offline Page', 'abtfr')}
                  name="abtfr[pwa_cache_pages_offline]"
                  link={linkOptionState('pwaCachePagesOffline')}
                  size={80}
                  placeholder="/path/to/offline.html"
                  description={__(
                    'Enter an URL or absolute path to a HTML page to display when the network is offline and when the requested page is not available in cache.',
                    'abtfr'
                  )}
                />
                <SettingCheckbox
                  name="abtfr[pwa_offline_class]"
                  header={__('CSS online/offline class', 'abtfr')}
                  link={linkOptionState('pwaOfflineClass')}
                  label={__('Enabled', 'abtfr')}
                  description={
                    <>
                      Add the class <code>offline</code> to{' '}
                      <code>&lt;body&gt;</code> based on{' '}
                      <a
                        href="https://developer.mozilla.org/en-US/docs/Online_and_offline_events"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        HTML5 online/offline events
                      </a>
                      . This feature enables to add a user friendly notice via
                      CSS when the connection is offline.
                    </>
                  }
                />
                {getOption('pwaCachePagesStrategy') === 'cache' && (
                  <>
                    <SettingNumberInput
                      name="abtfr[pwa_cache_pages_update_interval]"
                      header={__('Cache Update Interval', 'abtfr')}
                      link={linkOptionState('pwaCachePagesUpdateInterval')}
                      style={{ width: 120 }}
                      placeholder="Always"
                      description={__(
                        'Enter a time in seconds to update cached pages using the network. Leave blank to update the cache on each request.',
                        'abtfr'
                      )}
                    />
                    <SettingNumberInput
                      name="abtfr[pwa_cache_pages_max_age]"
                      header={__('Cache Max Age', 'abtfr')}
                      link={linkOptionState('pwaCachePagesMaxAge')}
                      style={{ width: 120 }}
                      description={__(
                        'Enter a expire time in seconds. The maximum age does not override HTTP expire headers.',
                        'abtfr'
                      )}
                    />
                    <SettingCheckbox
                      name="abtfr[pwa_cache_pages_head_update]"
                      header={__('HEAD based network update', 'abtfr')}
                      link={linkOptionState('pwaCachePagesHeadUpdate')}
                      label={__('Enabled', 'abtfr')}
                      description={
                        <>
                          Use a HTTP HEAD request and <code>etag</code> and/or{' '}
                          <code>last-modified</code> header verification to
                          update the cache. This option saves bandwidth while
                          enabling quick updates of changed content, however, it
                          adds an extra request for content that always changes.
                        </>
                      }
                    />
                    <SettingCheckbox
                      name="abtfr[pwa_cache_pages_update_notify]"
                      header={__('Client event on update', 'abtfr')}
                      link={linkOptionState('pwaCachePagesUpdateNotify')}
                      label={__('Enabled', 'abtfr')}
                      description={__(
                        'Send an event to the client when the cache is updated.',
                        'abtfr'
                      )}
                    >
                      <ApiExample
                        description={
                          <>
                            The API is{' '}
                            <code>jQuery(window).on('sw-update',fn);</code>
                          </>
                        }
                      >
                        {`
jQuery(window).on('sw-update',function(e){
  if (e.detail.url === '/my/ajax-feed.json'){
    /* the Service Worker detected new content, update view */
    updateFeedView();
  }
});
                      `.trim()}
                      </ApiExample>
                    </SettingCheckbox>
                  </>
                )}
                <SettingNumberInput
                  name="abtfr[pwa_cache_max_size]"
                  header={__('Cache Max Size', 'abtfr')}
                  link={linkOptionState('pwaCacheMaxSize')}
                  style={{ width: 80 }}
                  placeholder={1000}
                  description={__(
                    'Maximum cache entries to maintain. The default is 1000.',
                    'abtfr'
                  )}
                />
                <SettingTextInput
                  name="abtfr[pwa_cache_version]"
                  header={__('Cache Version', 'abtfr')}
                  link={linkOptionState('pwaCacheVersion')}
                  size={20}
                  description={__(
                    'Optionally enter a cache version. This feature enables to invalidate existing caches.',
                    'abtfr'
                  )}
                />
                <SettingTextarea
                  header={__('Cache Preload', 'abtfr')}
                  textareaClass="json-array-lines"
                  name="abtfr[pwa_cache_preload]"
                  link={linkOptionState('pwaCachePreload')}
                  description={
                    <>
                      Enter URLs or absolute path's to preload for offline
                      availability, e.g. <code>/path/to/page.html</code> or{' '}
                      <code>/path/to/image.jpg</code>.
                    </>
                  }
                />
                <SettingCheckbox
                  name="abtfr[pwa_cache_preload_require]"
                  header={__('Require preloading', 'abtfr')}
                  link={linkOptionState('pwaCachePreloadRequired')}
                  label={__('Enabled', 'abtfr')}
                  description={__(
                    'Require preloading to complete in Service Worker installation. This option will activate the service worker after all assets have been preloaded.',
                    'abtfr'
                  )}
                />
              </SettingInnerTable>
              <SettingCheckbox
                name="abtfr[pwa_preload_mousedown]"
                header={__('Preload on Mouse Down', 'abtfr')}
                link={linkOptionState('pwaPreloadMousedown')}
                label={__('Enabled', 'abtfr')}
                description={
                  <>
                    Start preloading navigation requests in the Service Worker
                    on mouse down. Older mobile devices including iOS8 have a{' '}
                    <a
                      href="https://encrypted.google.com/search?q=300ms+tap+delay+mobile"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      300ms click delay
                    </a>{' '}
                    which is a lot of time wasted for navigation clicks. An
                    average mouse click also has a 200-500ms delay before
                    navigation starts. This feature enables to start preloading
                    a page in the Service Worker on mouse down/touch start to
                    make use of the otherwise wasted delay.
                  </>
                }
              />
              <tr valign="top">
                <th scope="row" id="manifest">
                  Web App Manifest
                </th>
                <td>
                  <p style={{ marginBottom: '1em' }}>
                    The{' '}
                    <a
                      href="https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web App Manifest
                    </a>{' '}
                    is a JSON document that enables to control how a website app
                    appears to the user in areas where they would expect to see
                    apps. It is required to validate as Google PWA. (
                    <a
                      href="https://w3c.github.io/manifest/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      W3C documentation
                    </a>
                    )
                  </p>
                  {getOption('pwaManifestStatus') === 'not existing' && (
                    <Info color="red" style={{ marginBottom: '1em' }}>
                      <strong>{homeUrl}/manifest.json</strong> not found. Add
                      the file to the root of your WordPress installation and
                      make it writeable.
                      <div style={{ marginTop: 10 }}>
                        <button
                          type="submit"
                          name="create_manifest"
                          className="button"
                        >
                          Create manifest.json
                        </button>
                      </div>
                    </Info>
                  )}
                  {getOption('manifestStatus') === 'not writable' && (
                    <Info color="red" style={{ marginBottom: '1em' }}>
                      <strong>{homeUrl}/manifest.jsonmanifest.json</strong> is
                      not writeable. Please make the file writeable for
                      WordPress (PHP) to enable online editing and automatic{' '}
                      <code>serviceworker</code> configuration.
                    </Info>
                  )}
                  {getOption('manifestStatus') === 'good' &&
                  !Array.isArray(getOption('manifestJson')) ? (
                    <Info color="red" style={{ marginBottom: '1em' }}>
                      <strong>{homeUrl}/manifest.json</strong> does not contain
                      valid JSON. <hr />
                      <textarea
                        style={{ width: '100%', height: 70 }}
                        defaultValue={getOption('manifestJson')}
                      />
                    </Info>
                  ) : (
                    getOption('manifestStatus') === 'good' && (
                      <>
                        <JsonEditor
                          name="pwa.manifest"
                          schema={pwaManifestSchema}
                          link={linkOptionState('manifestJson')}
                          objectType="object"
                          compact="none"
                          maxLines={50}
                          mode="tree"
                        ></JsonEditor>
                        <input
                          type="hidden"
                          name="abtfr[manifest_json]"
                          id="webapp_manifest_src"
                          value={JSON.stringify(getOption('manifestJson'))}
                        />
                      </>
                    )
                  )}
                  <p>
                    There are several online tools that can help with Web App
                    Manifest creation.{' '}
                    <a
                      href="https://app-manifest.firebaseapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://app-manifest.firebaseapp.com/
                    </a>{' '}
                    is a simple one.{' '}
                    <a
                      href={`https://encrypted.google.com/search?q=${encodeURIComponent(
                        'webapp manifest creator'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Search Google
                    </a>{' '}
                    for more creators.
                  </p>
                </td>
              </tr>
              <SettingInnerTable
                header={__('Web App Manifest Settings', 'abtfr')}
              >
                <SettingCheckbox
                  name="abtfr[manifest_json_update]"
                  header={__('Update manifest.json', 'abtfr')}
                  link={linkOptionState('manifestJsonUpdate')}
                  label={__('Enabled', 'abtfr')}
                  description={__(
                    'Update manifest.json when saving settings.',
                    'abtfr'
                  )}
                />
                <SettingCheckbox
                  name="abtfr[pwa_manifest_meta]"
                  header={__('Link manifest.json in head', 'abtfr')}
                  link={linkOptionState('pwaManifestMeta')}
                  label={__('Enabled', 'abtfr')}
                  description={
                    <>
                      Add a link to manifest.json in the{' '}
                      <code>&lt;head&gt;</code> of the page.
                    </>
                  }
                />
                <SettingTextarea
                  header={__('Web App Meta Tags', 'abtfr')}
                  textareaClass="json-array-lines"
                  style={{
                    height: 200
                  }}
                  name="abtfr[pwa_meta]"
                  link={linkOptionState('pwaMeta')}
                  description={
                    <>
                      Enter Web App related meta tags to include in the{' '}
                      <code>&lt;head&gt;</code> of the page. (
                      <a
                        href="https://developers.google.com/web/ilt/pwa/lab-auditing-with-lighthouse#43_add_tags_for_other_browsers"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        documentation
                      </a>
                      ). There are many{' '}
                      <a
                        href={`https://encrypted.google.com/search?q=${encodeURIComponent(
                          'web app icon generators'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Web App Meta Generators
                      </a>{' '}
                      that enable to fine tune the settings for an optimal
                      mobile representation.
                    </>
                  }
                >
                  <Info color="yellow" style={{ marginTop: '1em' }}>
                    <strong>Tip:</strong> Use the Google Chrome{' '}
                    <strong>Application &gt; Manifest</strong> tab to debug the
                    settings and to simulate <em>Add to homescreen</em>.
                  </Info>
                </SettingTextarea>
              </SettingInnerTable>
            </tbody>
          </table>
        </div>
        <hr />
        <SubmitButton type={['primary', 'large']} name="is_submit">
          {__('Save', 'abtfr')}
        </SubmitButton>
      </PageContent>
    </form>
  );
};

export default PwaView;
