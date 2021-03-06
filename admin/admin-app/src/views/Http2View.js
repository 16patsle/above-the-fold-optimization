import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { Button, ExternalLink } from '@wordpress/components';
import useSettings from '../utils/useSettings';
import {
  adminUrl,
  homeUrl,
  siteTitle,
  abtfrAdminNonce,
  lgCode,
  wpAbtfrUri
} from '../utils/globalVars';
import LoadingWrapper from '../components/LoadingWrapper';
import LazyJsonEditor from '../components/LazyJsonEditor';
import { http2Schema } from '../components/editorSchema';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SubmitButton from '../components/SubmitButton';
import './Http2View.css';

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
  const {
    linkOptionState,
    getOption,
    setOption,
    shouldRender,
    error
  } = useSettings();

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

  return (
    <LoadingWrapper shouldRender={shouldRender} error={error}>
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtfr_http2_update'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('HTTP/2 Optimization', 'abtfr')}>
          <Helmet>
            <title>
              {__('HTTP/2 Optimization', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
          <p>
            <ExternalLink
              href={`https://developers.google.com/web/fundamentals/performance/http2/?hl=${lgCode}`}
            >
              HTTP/2
            </ExternalLink>{' '}
            is a new version of the internet protocol originally developed by
            Google (SPDY). This plugin enables to make use of some it's
            optimization potential.
          </p>
          <Button
            isSecondary
            href={`https://tools.keycdn.com/http2-test?url=${encodeURIComponent(
              homeUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('Test your website for HTTP/2 support', 'abtfr')}
          </Button>
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                header={__('HTTP/2 Server Push', 'abtfr')}
                name="abtfr[http2_push]"
                link={linkOptionState('http2Push')}
                description={
                  <span>
                    When enabled, resources such as scripts, stylesheets and
                    images can be pushed to visitors together with the HTML (
                    <ExternalLink
                      href={`https://developers.google.com/web/fundamentals/performance/http2/?hl=${lgCode}#server_push`}
                    >
                      documentation
                    </ExternalLink>
                    ).
                  </span>
                }
              >
                <LazyJsonEditor
                  name="http2.push"
                  schema={http2Schema}
                  link={linkOptionState('http2PushConfig')}
                />
                <input
                  type="hidden"
                  name="abtfr[http2_push_config]"
                  id="http2_push_config_src"
                  value={JSON.stringify(getOption('http2PushConfig'))}
                />
                <div style={{ clear: 'both', height: 10 }}></div>
                <fieldset>
                  <legend>{__('Insert', 'abtfr')}</legend>
                  <Button
                    isSecondary
                    onClick={handleInsertClick}
                    data-http2-insert="scripts"
                  >
                    {__('WordPress scripts', 'abtfr')}
                  </Button>
                  <Button
                    isSecondary
                    onClick={handleInsertClick}
                    data-http2-insert="stylesheets"
                  >
                    {__('WordPress stylesheets', 'abtfr')}
                  </Button>
                  <Button
                    isSecondary
                    onClick={handleInsertClick}
                    data-http2-insert="images"
                  >
                    {__('HTML images', 'abtfr')}
                  </Button>
                  <Button
                    isSecondary
                    onClick={handleInsertClick}
                    data-http2-insert="custom"
                  >
                    {__('Custom resource list', 'abtfr')}
                  </Button>
                </fieldset>
                <Info color="yellow">
                  <strong>Note:</strong> When using the Progressive Web App
                  Service Worker (PWA), the service worker automatically
                  calculates a <strong>Cache Digest</strong> based on previously
                  pushed resources. This feature is based on the hash
                  calculation implementation of{' '}
                  <ExternalLink href="https://gitlab.com/sebdeckers/cache-digest-immutable/#-cache-digest-immutable">
                    Cache-Digest-Immutable
                  </ExternalLink>{' '}
                  and enables the server to only push resources that aren't
                  already available in the client. For more information, see{' '}
                  <ExternalLink href="https://calendar.perfplanet.com/2016/cache-digests-http2-server-push/">
                    this article
                  </ExternalLink>{' '}
                  on PerfPlanet.com.
                  <br />
                  <br />
                  <img
                    src={`${wpAbtfrUri}admin/images/Cache_Digest_-_Warm_Cache.png`}
                    alt="Cache-Digest"
                    style={{ width: '100%', maxWidth: 600 }}
                    title="Cache-Digest"
                  />
                  <br />
                  <br />
                  It is not possible to push resources that are not used on a
                  page. For more information, see{' '}
                  <ExternalLink href="https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/">
                    this article
                  </ExternalLink>
                </Info>
              </SettingCheckbox>
            </tbody>
          </table>
          <hr />
          <SubmitButton />
        </PageContent>
      </form>
    </LoadingWrapper>
  );
};

export default Http2View;
