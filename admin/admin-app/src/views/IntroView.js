import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import {
  homeUrl,
  adminUrl,
  siteTitle,
  lgCode,
  googleIntlCode
} from '../utils/globalVars';
import Info from '../components/Info';
import PageContent from '../components/PageContent';

const baseHomeUrl = new URL(homeUrl).host.replace('www', '');

class IntroView extends Component {
  render() {
    // Google uses a different host for the US
    const thinkHost = `https://testmysite.${
      googleIntlCode === 'en-us' ? 'think' : ''
    }withgoogle.com/`;
    const thinkUrl = `${thinkHost}intl/${googleIntlCode}?url=${encodeURIComponent(
      homeUrl
    )}`;

    const monitorUrl = new URL(adminUrl + 'admin.php?page=abtfr#/monitor');

    return (
      <PageContent header={__('Introduction', 'abtfr')}>
        <Helmet>
          <title>Google PageSpeed Optimization {siteTitle}</title>
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
                <a
                  href={`https://encrypted.google.com/search?hl=${lgCode}&q=${encodeURIComponent(
                    'wordpress pagespeed optimization service'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
                <a
                  href="https://wordpress.org/support/plugin/abtfr"
                  target="_blank"
                  rel="noopener noreferrer"
                />
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
          <a
            className="button button-small"
            href={`${thinkUrl}&hl=${lgCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('Google Full Spectrum Test', 'abtfr')}
          </a>
          <a
            className="button button-small"
            href={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(
              homeUrl
            )}&hl=${lgCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('Google PageSpeed Test', 'abtfr')}
          </a>
          <a
            className="button button-small"
            href={`https://search.google.com/search-console/mobile-friendly?url=${encodeURIComponent(
              homeUrl
            )}&hl=${lgCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('Google Mobile Test', 'abtfr')}
          </a>
          <a
            className="button button-small"
            href={`https://performance.sucuri.net/domain/${encodeURIComponent(
              baseHomeUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('Sucuri Server Response Time', 'abtfr')}
          </a>
          <a
            className="button button-small"
            href={`http://www.webpagetest.org/?url=${encodeURIComponent(
              homeUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('WebPageTest.org', 'abtfr')}
          </a>
          <a
            className="button button-small"
            href={`https://gtmetrix.com/?url=${encodeURIComponent(homeUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('GTmetrix', 'abtfr')}
          </a>
          <a
            className="button button-small"
            href={`https://securityheaders.io/?q=${encodeURIComponent(
              homeUrl
            )}&hide=on&followRedirects=on`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('SecurityHeaders.io', 'abtfr')}
          </a>
          <a
            className="button button-small"
            href={`https://www.ssllabs.com/ssltest/analyze.html?d=${encodeURIComponent(
              homeUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('SSL test', 'abtfr')}
          </a>
          <a
            className="button button-small"
            href={`http://www.intodns.com/${encodeURIComponent(baseHomeUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('DNS test', 'abtfr')}
          </a>
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
              a1: (
                <a
                  href={`https://encrypted.google.com/search?hl=${lgCode}&q=${encodeURIComponent(
                    'gzip configuration'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              a2: (
                <a
                  href={`https://encrypted.google.com/search?hl=${lgCode}&q=${encodeURIComponent(
                    'http cache headers configuration'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              a3: (
                <a
                  href={`https://encrypted.google.com/search?hl=${lgCode}&q=${encodeURIComponent(
                    'best wordpress full page cache' + new Date().getFullYear()
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
                <a
                  href={`https://developers.google.com/speed/docs/insights/Server?hl=${lgCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              a2: (
                <a
                  href={`https://performance.sucuri.net/domain/${encodeURIComponent(
                    new URL(homeUrl).host.replace('www', '')
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
                <a
                  href={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(
                    homeUrl
                  )}&hl=${lgCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
