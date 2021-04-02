import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { Button } from '@wordpress/components';
import {
  homeUrl,
  adminUrl,
  siteTitle,
  lgCode,
  googleIntlCode
} from '../utils/globalVars';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import ExternalLink from '../components/ExternalLink';

const baseHomeUrl = new URL(homeUrl).host.replace('www', '');

// Google uses a different host for the US
const thinkHost = `https://testmysite.${
  googleIntlCode === 'en-us' ? 'think' : ''
}withgoogle.com/`;
const thinkUrl = `${thinkHost}intl/${googleIntlCode}?url=${encodeURIComponent(
  homeUrl
)}`;

const monitorUrl = new URL(adminUrl + 'admin.php?page=abtfr#/monitor');

const makeGoogleUrl = query =>
  `https://encrypted.google.com/search?hl=${lgCode}&q=${encodeURIComponent(
    query
  )}`;

const testButtons = [
  {
    text: __('Google Full Spectrum Test', 'abtfr'),
    href: `${thinkUrl}&hl=${lgCode}`
  },
  {
    text: __('Google PageSpeed Test', 'abtfr'),
    href: `https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(
      homeUrl
    )}&hl=${lgCode}`
  },
  {
    text: __('Google Mobile Test', 'abtfr'),
    href: `https://search.google.com/search-console/mobile-friendly?url=${encodeURIComponent(
      homeUrl
    )}&hl=${lgCode}`
  },
  {
    text: __('Sucuri Server Response Time', 'abtfr'),
    href: `https://performance.sucuri.net/domain/${encodeURIComponent(
      baseHomeUrl
    )}`
  },
  {
    text: __('WebPageTest.org', 'abtfr'),
    href: `http://www.webpagetest.org/?url=${encodeURIComponent(homeUrl)}`
  },
  {
    text: __('GTmetrix', 'abtfr'),
    href: `https://gtmetrix.com/?url=${encodeURIComponent(homeUrl)}`
  },
  {
    text: __('SecurityHeaders.io', 'abtfr'),
    href: `https://securityheaders.io/?q=${encodeURIComponent(
      homeUrl
    )}&hide=on&followRedirects=on`
  },
  {
    text: __('SSL test', 'abtfr'),
    href: `https://www.ssllabs.com/ssltest/analyze.html?d=${encodeURIComponent(
      homeUrl
    )}`
  },
  {
    text: __('DNS test', 'abtfr'),
    href: `http://www.intodns.com/${encodeURIComponent(baseHomeUrl)}`
  }
];

const currYear = new Date().getFullYear();

class IntroView extends Component {
  render() {
    return (
      <PageContent header={__('Introduction', 'abtfr')}>
        <Helmet>
          <title>{__('Google PageSpeed Optimization', 'abtfr')} {siteTitle}</title>
        </Helmet>
        <p>
          {createInterpolateElement(
            __(
              'Take a moment to explore the abilities of this plugin. This plugin is not a simple <code>on/off</code> plugin so do not expect a result by simply activating the plugin.',
              'abtfr'
            ),
            {
              code: <code />
            }
          )}
        </p>
        <p>
          {createInterpolateElement(
            __(
              'This plugin is intended as a toolkit to achieve <u>the best</u> website performance and it is focussed on Google, including the ability to achieve a Google PageSpeed 100 score.',
              'abtfr'
            ),
            {
              u: <u />
            }
          )}
        </p>
        <p>
          {__(
            'Every website is different and has different requirements to achieve the best performance. This plugin offers many configuration options.',
            'abtfr'
          )}
        </p>
        <p>
          {createInterpolateElement(
            __(
              '<strong>This plugin is not intended for easy usage.</strong> Please seek expert help if you do not understand how to use this plugin. <a>Search Google</a> for optimization experts or contact the author of this plugin: <u>info@optimization.team</u>.',
              'abtfr'
            ),
            {
              strong: <strong />,
              a: (
                <ExternalLink
                  href={makeGoogleUrl(
                    'wordpress pagespeed optimization service'
                  )}
                />
              ),
              u: <u />
            }
          )}
        </p>
        <p>
          {createInterpolateElement(
            __(
              'This plugin is offered for free. Do not expect support. If you experience a problem or have an idea for better performance, we are thankful if you <a>report it</a> on the WordPress forums. Please do not expect free help to achieve a Google PageSpeed 100 score.',
              'abtfr'
            ),
            {
              a: (
                <ExternalLink href="https://wordpress.org/support/plugin/abtfr" />
              )
            }
          )}
        </p>

        <h1 style={{ marginBottom: '10px', paddingBottom: '0px' }}>
          {__('Roadmap to achieve a Google PageSpeed 100 score', 'abtfr')}
        </h1>
        <h3
          style={{
            marginTop: '0px',
            paddingBottom: '5px',
            marginBottom: '0px',
            borderBottom: 'solid 1px #efefef'
          }}
        >
          {__('Step 1 - check the state of your website', 'abtfr')}
        </h3>
        <p>
          {__(
            'Before you start using this plugin: test your website for problems and create a priority list with the issues that need to be resolved. This plugin offers access to several tests from the PageSpeed menu in the top admin bar.',
            'abtfr'
          )}
        </p>
        <p>
          {testButtons.map(({ text, href }) => (
            <Button
              isSecondary
              isSmall
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </Button>
          ))}
        </p>

        <Info color="yellow" style={{ marginBottom: '10px' }}>
          <p style={{ margin: '0px' }}>
            {createInterpolateElement(
              __(
                '<strong>Tip:</strong> If you can resolve small issues fast, start with the smaller issues, it may help to resolve the larger issues.',
                'abtfr'
              ),
              {
                strong: <strong />
              }
            )}
          </p>
        </Info>

        <h3
          style={{
            marginTop: '0px',
            paddingBottom: '5px',
            marginBottom: '0px',
            borderBottom: 'solid 1px #efefef'
          }}
        >
          {__('Step 2 - server optimization', 'abtfr')}
        </h3>
        <p>
          {createInterpolateElement(
            __(
              'Start with the fundament of your website: the server. Make sure that the best <a1>gzip settings</a1> and <a2>HTTP cache headers</a2> are installed and if the server is slow, find ways to improve the speed of the server by optimizing WordPress plugins or by using a <a3>full page cache</a3> solution. It may be required to choose a better hosting plan or to move to a different hosting provider. Hosting reliability and performance is a major aspect for achieving a good performance and stability reputation in Google. Once you lose a stable hosting reputation, it may cause a hidden penalty and you may not get your reputation back for years.',
              'abtfr'
            ),
            {
              a1: <ExternalLink href={makeGoogleUrl('gzip configuration')} />,
              a2: (
                <ExternalLink
                  href={makeGoogleUrl('http cache headers configuration')}
                />
              ),
              a3: (
                <ExternalLink
                  href={makeGoogleUrl(
                    `best wordpress full page cache ${currYear}`
                  )}
                />
              )
            }
          )}
        </p>
        <p>
          {__(
            'Choose professional server configuration over WordPress plugins to achieve the best performance.',
            'abtfr'
          )}
        </p>
        <p>
          {createInterpolateElement(
            __(
              'Google <a1>officially advises</a1> a maximum server response time of 0,2 seconds (200ms). Test your global server response times <a2>here</a2>.',
              'abtfr'
            ),
            {
              a1: (
                <ExternalLink
                  href={`https://developers.google.com/speed/docs/insights/Server?hl=${lgCode}`}
                />
              ),
              a2: (
                <ExternalLink
                  href={`https://performance.sucuri.net/domain/${encodeURIComponent(
                    baseHomeUrl
                  )}`}
                />
              )
            }
          )}
        </p>
        <Info color="yellow" style={{ marginBottom: '10px' }}>
          <p style={{ margin: '0px' }}>
            {createInterpolateElement(
              __(
                '<strong>Tip:</strong> Find out what exactly you need and write a single detailed request to your hosting provider for professional installation. If the server has a speed issue, simply ask your host to achieve a maximum server speed of 0,2 seconds (200ms) as advised by Google.',
                'abtfr'
              ),
              {
                strong: <strong />
              }
            )}
          </p>
        </Info>

        <h3
          style={{
            marginTop: '0px',
            paddingBottom: '5px',
            marginBottom: '0px',
            borderBottom: 'solid 1px #efefef'
          }}
        >
          {__('Step 3 - Google PageSpeed optimization', 'abtfr')}
        </h3>
        <p>
          {createInterpolateElement(
            __(
              'Test your website at <a>Google PageSpeed Insights</a> and start resolving the issues. Google offers detailed documentation for each issue and this plugin offers the tools to resolve most issues.',
              'abtfr'
            ),
            {
              a: (
                <ExternalLink
                  href={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(
                    homeUrl
                  )}&hl=${lgCode}`}
                />
              )
            }
          )}
        </p>

        <h3
          style={{
            marginTop: '0px',
            paddingBottom: '5px',
            marginBottom: '0px',
            borderBottom: 'solid 1px #efefef'
          }}
        >
          {__('Step 4 - setup a website monitor', 'abtfr')}
        </h3>
        <p>
          {createInterpolateElement(
            __(
              'Once the performance and quality of your website has achieved a perfect state, it is required to maintain it to achieve an optimal reliability, quality and performance reputation in Google. Go to the <a>Monitor tab</a> for information about website monitoring tools.',
              'abtfr'
            ),
            {
              a: <a href={monitorUrl} />
            }
          )}
        </p>
      </PageContent>
    );
  }
}

export default IntroView;
