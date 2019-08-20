import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { getOption, setOption } from '../utils/optionUtils';
import { linkOptionState } from '../utils/linkState';
import {
  adminUrl,
  homeUrl,
  siteTitle,
  abtfAdminNonce,
  wpAbtfUri,
  pwaSettings
} from '../utils/globalVars';
import newlineArrayString from '../utils/newLineArrayString';
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

class PwaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: pwaSettings
    };

    this.state.options.cacheInclude = newlineArrayString(
      this.state.options.cacheInclude
    );
    this.state.options.cachePreload = newlineArrayString(
      this.state.options.cachePreload
    );

    this.getOption = getOption.bind(this);
    this.setOption = setOption.bind(this);
    this.linkOptionState = linkOptionState.bind(this);
  }

  render() {
    return (
      <form
        method="post"
        action={adminUrl + '?action=abtf_pwa_update'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfAdminNonce }}></div>
        <PageContent header={__('Progressive Web App Optimization')}>
          <Helmet>
            <title>Progressive Web App Optimization {siteTitle}</title>
          </Helmet>
          <div>
            <div style={{ textAlign: 'center' }}>
              <a
                href="https://developers.google.com/web/tools/lighthouse/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${wpAbtfUri}admin/images/google-lighthouse-pwa-validation.jpg`}
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
                  header="Enable PWA"
                  name="abovethefold[pwa]"
                  link={this.linkOptionState('serviceWorker')}
                  label="Enabled"
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
                  header="Service Worker Settings"
                >
                  {!this.getOption('serviceWorker') && (
                    <SettingCheckbox
                      name="abovethefold[pwa_unregister]"
                      header="Unregister Service Worker"
                      link={this.linkOptionState('swUnregister')}
                      label="Enabled"
                      description="Unregister the PWA Service Worker for visitors."
                    />
                  )}
                  {this.getOption('serviceWorker') && (
                    <>
                      <SettingCheckbox
                        name="abovethefold[pwa_register]"
                        header="Register Service Worker"
                        link={this.linkOptionState('swRegister')}
                        label="Enabled"
                        description={
                          <>
                            Unchecking this option enables to combine the PWA
                            Service Worker with other service workers, for
                            example for{' '}
                            <a
                              href={this.getOption(
                                'pushNotificationPluginsUrl'
                              )}
                            >
                              Push Notifications
                            </a>
                            . If you want to load the PWA Service Worker using{' '}
                            <code>importScripts</code> use the file{' '}
                            <a
                              href={`${homeUrl}/${this.getOption(
                                'swFilename'
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={this.getOption('swFilename')}
                            >
                              /{this.getOption('swFilename')}
                            </a>
                            .
                          </>
                        }
                      />

                      <SettingTextInput
                        name="abovethefold[pwa_scope]"
                        header="Service Worker Scope"
                        link={this.linkOptionState('swScope')}
                        placeholder="Leave blank for global scope"
                        title={`Global scope: ${this.getOption(
                          'swScopeCurrent'
                        )}`}
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
                            for the service worker, e.g. <code>/blog/</code>.
                            The scope restricts the PWA functionality to a path.
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
                                The API is <code>Abtf.push(title,options)</code>
                              </>
                            }
                          >
                            {`
/*
  You must first obtain permissions
  https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
*/
Notification.requestPermission(function(result){
  if (result === 'granted') {
    Abtf.push('Welcome back!',{
      body: 'Buzz! Buzz!',
      icon: '../images/touch/chrome-touch-icon-192x192.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: 'vibration-sample'
    })
    .then(function(status) {
      console.log('Notification sent', status);
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
                      <strong>Tip:</strong> For debugging the Service Worker
                      see: <strong>chrome://serviceworker-internals</strong>{' '}
                      (copy in the address bar)
                    </Info>
                  </td>
                </tr>
                <SettingCheckbox
                  name="abovethefold[pwa_cache_pages]"
                  header="Offline Cache"
                  link={this.linkOptionState('cachePages')}
                  label="Enabled"
                  description="Cache HTML pages in the service worker. This option enables to make a website available offline."
                />
                <SettingInnerTable
                  header="Offline Cache Settings"
                  style={
                    !this.getOption('cachePages') ? { display: 'none' } : {}
                  }
                >
                  <SettingSelect
                    header="HTML Cache Strategy"
                    name="abovethefold[pwa_cache_pages_strategy]"
                    link={this.linkOptionState('cacheStrategy')}
                    options={[
                      {
                        value: 'network',
                        name: 'Network → Cache'
                      },
                      {
                        value: 'cache',
                        name: 'Cache → Network'
                      },
                      {
                        value: 'event',
                        name: 'On demand (event based)'
                      }
                    ]}
                    description={
                      <>
                        By default HTML pages are fetched from the network with
                        the cache as fallback when the network fails. Select the
                        Cache First strategy to serve pages from cache with the
                        network as backup. Select the On demand strategy to use
                        a Cache First strategy with a manual (event based) cache
                        storage (e.g. "click to read this page offline").
                      </>
                    }
                  >
                    <ApiExample
                      description={
                        <>
                          The API is <code>Abtf.offline(url);</code> which can
                          also be used for precaching.
                        </>
                      }
                    >
                      {`
Abtf.offline(['/shop/','/shop/product1.html','/wp-content/uploads/.../product-image.jpg'])
  .then(function(status) {
    console.log('Resources available offline', status);
  });
                      `.trim()}
                    </ApiExample>
                  </SettingSelect>
                  <SettingTextarea
                    header="HTML Cache Include List"
                    textareaClass="json-array-lines"
                    name="abovethefold[pwa_cache_pages_include]"
                    link={this.linkOptionState('cacheInclude')}
                    placeholder="Leave blank to cache all pages"
                    description={
                      <>
                        Enter (parts of) page URL's to cache, e.g.{' '}
                        <code>category/</code> to match all pages in a category.
                      </>
                    }
                  />
                  <SettingCheckbox
                    name="abovethefold[pwa_cache_assets]"
                    header="Cache Assets"
                    link={this.linkOptionState('cacheAssets')}
                    label="Enabled"
                    description="Cache assets such as scripts and styles. Use a request and/or response filter to apply a cache strategy and enable or disable caching for specific assets."
                  />
                  {this.getOption('cacheAssets') && (
                    <tr valign="top">
                      <th scope="row">Asset Cache Include Policy</th>
                      <td>
                        <JsonEditor
                          name="pwa.cache.assets"
                          schema={pwaAssetCacheSchema}
                          link={this.linkOptionState('cacheAssetsPolicy')}
                          compact="tree"
                          maxLines={50}
                        ></JsonEditor>
                        <input
                          type="hidden"
                          name="abovethefold[pwa_cache_assets_policy]"
                          id="cache_assets_src"
                          value={JSON.stringify(
                            this.getOption('cacheAssetsPolicy')
                          )}
                        />
                        <div style={{ clear: 'both', height: 10 }} />
                        <div style={{ float: 'right' }}>
                          <a
                            href="https://github.com/josdejong/jsoneditor"
                            className="ref"
                            style={{ position: 'relative', top: '-5px' }}
                          >
                            JSON editor
                          </a>
                        </div>
                      </td>
                    </tr>
                  )}
                  <SettingSelect
                    header="Offline Page"
                    name="abovethefold[pwa_cache_pages_offline]"
                    link={this.linkOptionState('offlinePage')}
                    size={80}
                    placeholder="/path/to/offline.html"
                    options={[
                      {
                        value: this.getOption('offlinePage'),
                        name: this.getOption('offlinePageName')
                      }
                    ]}
                    description={
                      <>
                        Enter an URL or absolute path to a HTML page to display
                        when the network is offline and when the requested page
                        is not available in cache.
                      </>
                    }
                  />
                  <SettingCheckbox
                    name="abovethefold[pwa_offline_class]"
                    header="CSS online/offline class"
                    link={this.linkOptionState('offlineClass')}
                    label="Enabled"
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
                  {this.getOption('cacheStrategy') === 'cache' && (
                    <>
                      <SettingNumberInput
                        name="abovethefold[pwa_cache_pages_update_interval]"
                        header="Cache Update Interval"
                        link={this.linkOptionState('cacheUpdateInterval')}
                        style={{ width: 120 }}
                        placeholder="Always"
                        description="Enter a time in seconds to update cached pages using the network. Leave blank to update the cache on each request."
                      />
                      <SettingNumberInput
                        name="abovethefold[pwa_cache_pages_max_age]"
                        header="Cache Max Age"
                        link={this.linkOptionState('cacheMaxAge')}
                        style={{ width: 120 }}
                        description="Enter a expire time in seconds. The maximum age does not override HTTP expire headers."
                      />
                      <SettingCheckbox
                        name="abovethefold[pwa_cache_pages_head_update]"
                        header="HEAD based network update"
                        link={this.linkOptionState('cacheHeadUpdate')}
                        label="Enabled"
                        description={
                          <>
                            Use a HTTP HEAD request and <code>etag</code> and/or{' '}
                            <code>last-modified</code> header verification to
                            update the cache. This option saves bandwidth while
                            enabling quick updates of changed content, however,
                            it adds an extra request for content that always
                            changes.
                          </>
                        }
                      />
                      <SettingCheckbox
                        name="abovethefold[pwa_cache_pages_update_notify]"
                        header="Client event on update"
                        link={this.linkOptionState('cacheUpdateEvent')}
                        label="Enabled"
                        description="Send an event to the client when the cache is updated."
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
                    name="abovethefold[pwa_cache_max_size]"
                    header="Cache Max Size"
                    link={this.linkOptionState('cacheMaxSize')}
                    style={{ width: 80 }}
                    placeholder={1000}
                    description="Maximum cache entries to maintain. The default is 1000."
                  />
                  <SettingTextInput
                    name="abovethefold[pwa_cache_version]"
                    header="Cache Version"
                    link={this.linkOptionState('cacheVersion')}
                    size={20}
                    description="Optionally enter a cache version. This feature enables to invalidate existing caches."
                  />
                  <SettingTextarea
                    header="Cache Preload"
                    textareaClass="json-array-lines"
                    name="abovethefold[pwa_cache_preload]"
                    link={this.linkOptionState('cachePreload')}
                    description={
                      <>
                        Enter URLs or absolute path's to preload for offline
                        availability, e.g. <code>/path/to/page.html</code> or{' '}
                        <code>/path/to/image.jpg</code>.
                      </>
                    }
                  />
                  <SettingCheckbox
                    name="abovethefold[pwa_cache_preload_require]"
                    header="Require preloading"
                    link={this.linkOptionState('cachePreloadRequired')}
                    label="Enabled"
                    description={
                      <>
                        Require preloading to complete in Service Worker
                        installation. This option will activate the service
                        worker after all assets have been preloaded.
                      </>
                    }
                  />
                </SettingInnerTable>
                <SettingCheckbox
                  name="abovethefold[pwa_preload_mousedown]"
                  header="Preload on Mouse Down"
                  link={this.linkOptionState('preloadMousedown')}
                  label="Enabled"
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
                      navigation starts. This feature enables to start
                      preloading a page in the Service Worker on mouse
                      down/touch start to make use of the otherwise wasted
                      delay.
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
                      is a JSON document that enables to control how a website
                      app appears to the user in areas where they would expect
                      to see apps. It is required to validate as Google PWA. (
                      <a
                        href="https://w3c.github.io/manifest/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        W3C documentation
                      </a>
                      )
                    </p>
                    {this.getOption('manifestStatus') === 'not existing' && (
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
                    {this.getOption('manifestStatus') === 'not writable' && (
                      <Info color="red" style={{ marginBottom: '1em' }}>
                        <strong>{homeUrl}/manifest.jsonmanifest.json</strong> is
                        not writeable. Please make the file writeable for
                        WordPress (PHP) to enable online editing and automatic{' '}
                        <code>serviceworker</code> configuration.
                      </Info>
                    )}
                    {this.getOption('manifestStatus') === 'good' &&
                    !Array.isArray(this.getOption('manifestJson')) ? (
                      <Info color="red" style={{ marginBottom: '1em' }}>
                        <strong>{homeUrl}/manifest.json</strong> does not
                        contain valid JSON. <hr />
                        <textarea
                          style={{ width: '100%', height: 70 }}
                          defaultValue={this.getOption('manifestJson')}
                        />
                      </Info>
                    ) : (
                      this.getOption('manifestStatus') === 'good' && (
                        <>
                          <JsonEditor
                            name="pwa.manifest"
                            schema={pwaManifestSchema}
                            link={this.linkOptionState('manifestJson')}
                            objectType="object"
                            compact="none"
                            maxLines={50}
                            mode="tree"
                          ></JsonEditor>
                          <input
                            type="hidden"
                            name="abovethefold[manifest_json]"
                            id="webapp_manifest_src"
                            value={JSON.stringify(
                              this.getOption('manifestJson')
                            )}
                          />
                        </>
                      )
                    )}
                    <div style={{ clear: 'both', height: 10 }} />
                    <div style={{ float: 'right' }}>
                      <a
                        href="https://github.com/josdejong/jsoneditor"
                        className="ref"
                        style={{ position: 'relative', top: '-5px' }}
                      >
                        JSON editor
                      </a>
                    </div>
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
                <SettingInnerTable header="Web App Manifest Settings">
                  <SettingCheckbox
                    name="abovethefold[manifest_json_update]"
                    header="Update manifest.json"
                    link={this.linkOptionState('manifestUpdate')}
                    label="Enabled"
                    description="Update manifest.json when saving settings."
                  />
                  <SettingCheckbox
                    name="abovethefold[pwa_manifest_meta]"
                    header="Link manifest.json in head"
                    link={this.linkOptionState('manifestLink')}
                    label="Enabled"
                    description={
                      <>
                        Add a link to manifest.json in the{' '}
                        <code>&lt;head&gt;</code> of the page.
                      </>
                    }
                  />
                  <SettingTextarea
                    header="Web App Meta Tags"
                    textareaClass="json-array-lines"
                    style={{
                      height: 200
                    }}
                    name="abovethefold[pwa_meta]"
                    link={this.linkOptionState('metaTags')}
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
                      <strong>Application &gt; Manifest</strong> tab to debug
                      the settings and to simulate <em>Add to homescreen</em>.
                    </Info>
                  </SettingTextarea>
                </SettingInnerTable>
              </tbody>
            </table>
          </div>
          <hr />
          <SubmitButton type={['primary', 'large']} name="is_submit">
            {__('Save')}
          </SubmitButton>
        </PageContent>
      </form>
    );
  }
}

export default PwaView;
