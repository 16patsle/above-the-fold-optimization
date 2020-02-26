import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../utils/useLinkState';
import {
  adminUrl,
  homeUrl,
  siteTitle,
  abtfAdminNonce,
  lgCode,
  wpAbtfUri
} from '../utils/globalVars';
import JsonEditor from '../components/JsonEditor';
import { http2Schema } from '../components/editorSchema';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SubmitButton from '../components/SubmitButton';
import './Http2View.css';
import getSettings from '../utils/getSettings';

const http2Insert = {
  scripts: [
    { type: 'script', match: 'all', meta: true },
    {
      type: 'script',
      match: { pattern: '/url\\/path/', regex: true, exclude: true },
      meta: true
    }
  ],
  stylesheets: [
    { type: 'style', match: 'all', meta: true },
    {
      type: 'style',
      match: { pattern: '/url\\/path/', regex: true, exclude: true },
      meta: true
    }
  ],
  images: [
    { type: 'image', match: 'all', meta: true },
    {
      type: 'image',
      match: { pattern: '/gravatar\\.com\\//', regex: true, exclude: true },
      meta: true
    }
  ],
  custom: [
    {
      type: 'custom',
      resources: [
        { file: 'https://url.to/file.jpg', type: 'image' },
        { file: '/path/to/font.woff2', type: 'font', mime: 'font/woff2' }
      ],
      meta: true
    }
  ]
};

const Http2View = () => {
  const [options, setOption, setOptions, linkOptionState] = useLinkState();

  const getOption = option => options[option];

  const { data, error } = useSWR('settings', getSettings);

  const handleInsertClick = e => {
    var json = getOption('http2PushConfig');

    if (json instanceof Array) {
      var insertJson = http2Insert[e.target.dataset.http2Insert];

      if (!(insertJson instanceof Array)) {
        insertJson = [insertJson];
      }
      for (var i = 0; i < insertJson.length; i++) {
        json.push(insertJson[i]);
      }
      setOption('http2PushConfig', json);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const loading = <div>Loading...</div>;

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
      action={adminUrl + 'admin-post.php?action=abtf_http2_update'}
      className="clearfix"
    >
      <div dangerouslySetInnerHTML={{ __html: abtfAdminNonce }}></div>
      <PageContent header={__('HTTP/2 Optimization')}>
        <Helmet>
          <title>HTTP/2 Optimization {siteTitle}</title>
        </Helmet>
        <p>
          <a
            href={`https://developers.google.com/web/fundamentals/performance/http2/?hl=${lgCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            HTTP/2
          </a>{' '}
          is a new version of the internet protocol originally developed by
          Google (SPDY). This plugin enables to make use of some it's
          optimization potential.
        </p>
        <a
          href={`https://tools.keycdn.com/http2-test?url=${encodeURIComponent(
            homeUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Test your website for HTTP/2 support
        </a>
        <table className="form-table">
          <tbody>
            <SettingCheckbox
              header="HTTP/2 Server Push"
              name="abovethefold[http2_push]"
              link={linkOptionState('http2Push')}
              label="Enabled"
              description={
                <span>
                  When enabled, resources such as scripts, stylesheets and
                  images can be pushed to visitors together with the HTML (
                  <a
                    href={`https://developers.google.com/web/fundamentals/performance/http2/?hl=${lgCode}#server_push`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    documentation
                  </a>
                  ).
                </span>
              }
            >
              <JsonEditor
                name="http2.push"
                schema={http2Schema}
                link={linkOptionState('http2PushConfig')}
              ></JsonEditor>
              <input
                type="hidden"
                name="abovethefold[http2_push_config]"
                id="http2_push_config_src"
                value={JSON.stringify(getOption('http2PushConfig'))}
              />
              <div style={{ clear: 'both', height: 10 }}></div>
              <fieldset>
                <legend>Insert</legend>
                <button
                  type="button"
                  onClick={handleInsertClick}
                  className="button"
                  data-http2-insert="scripts"
                >
                  WordPress scripts
                </button>
                <button
                  type="button"
                  onClick={handleInsertClick}
                  className="button"
                  data-http2-insert="stylesheets"
                >
                  WordPress stylesheets
                </button>
                <button
                  type="button"
                  onClick={handleInsertClick}
                  className="button"
                  data-http2-insert="images"
                >
                  HTML images
                </button>
                <button
                  type="button"
                  onClick={handleInsertClick}
                  className="button"
                  data-http2-insert="custom"
                >
                  Custom resource list
                </button>
              </fieldset>
              <Info color="yellow">
                <strong>Note:</strong> When using the Progressive Web App
                Service Worker (PWA), the service worker automatically
                calculates a <strong>Cache Digest</strong> based on previously
                pushed resources. This feature is based on the hash calculation
                implementation of{' '}
                <a
                  href="https://gitlab.com/sebdeckers/cache-digest-immutable/#-cache-digest-immutable"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cache-Digest-Immutable
                </a>{' '}
                and enables the server to only push resources that aren't
                already available in the client. For more information, see{' '}
                <a
                  href="https://calendar.perfplanet.com/2016/cache-digests-http2-server-push/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this article
                </a>{' '}
                on PerfPlanet.com.
                <br />
                <br />
                <img
                  src={`${wpAbtfUri}admin/images/Cache_Digest_-_Warm_Cache.png`}
                  alt="Cache-Digest"
                  style={{ width: '100%', maxWidth: 600 }}
                  title="Cache-Digest"
                />
                <br />
                <br />
                It is not possible to push resources that are not used on a
                page. For more information, see{' '}
                <a
                  href="https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this article
                </a>
              </Info>
            </SettingCheckbox>
          </tbody>
        </table>
        <hr />
        <SubmitButton type={['primary', 'large']} name="is_submit">
          {__('Save')}
        </SubmitButton>
      </PageContent>
    </form>
  );
};

export default Http2View;
