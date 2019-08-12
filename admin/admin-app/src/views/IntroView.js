import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import getValueOf from '../utils/getValueOf';
import { homeUrl, adminUrl, siteTitle } from '../utils/globalVars';
import Info from '../components/Info';
import PageContent from '../components/PageContent';

const baseHomeUrl = new URL(homeUrl).host.replace('www', '');

class IntroView extends Component {
  constructor(props) {
    super(props);

    this.lgcode = getValueOf('#lgcode');
    this.google_intlcode = getValueOf('#google_intlcode');
  }

  render() {
    // Google uses a different host for the US
    const thinkHost = `https://testmysite.${
      this.google_intlcode === 'en-us' ? 'think' : ''
    }withgoogle.com/`;
    const thinkUrl = `${thinkHost}intl/${
      this.google_intlcode
    }?url=${encodeURIComponent(homeUrl)}`;

    const monitorUrl = new URL(adminUrl);
    monitorUrl.searchParams.append('page', 'pagespeed-monitor');

    return (
      <PageContent header={__('Introduction')}>
        <Helmet>
          <title>Google PageSpeed Optimization {siteTitle}</title>
        </Helmet>
        <p>
          Take a moment to explore the abilities of this plugin. This plugin is
          not a simple <code>on/off</code> plugin so do not expect a result by
          simply activating the plugin.
        </p>
        <p>
          This plugin is intended as a toolkit to achieve <u>the best</u>{' '}
          website performance and it is focussed on Google, including the
          ability to achieve a Google PageSpeed 100 score.
        </p>
        <p>
          Every website is different and has different requirements to achieve
          the best performance. This plugin offers many configuration options
          {/* and goes a step further than many premium optimization plugins*/}.
        </p>
        <p>
          <strong>This plugin is not intended for easy usage.</strong> Please
          seek expert help if you do not understand how to use this plugin.{' '}
          <a
            href={`https://encrypted.google.com/search?hl=${
              this.lgcode
            }&q=${encodeURIComponent(
              'wordpress pagespeed optimization service'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Search Google
          </a>{' '}
          for optimization experts or contact the author of this plugin:{' '}
          <u>info@optimization.team</u>.
        </p>
        <p>
          This plugin is offered for free. Do not expect support. If you
          experience a problem or have an idea for better performance, we are
          thankful if you{' '}
          <a
            href="https://wordpress.org/support/plugin/above-the-fold-optimization"
            target="_blank"
            rel="noopener noreferrer"
          >
            report it
          </a>{' '}
          on the WordPress forums. Please do not expect free help to achieve a
          Google PageSpeed 100 score.
        </p>

        <h1 style={{ marginBottom: '10px', paddingBottom: '0px' }}>
          Roadmap to achieve a Google PageSpeed 100 score
        </h1>
        <h3
          style={{
            marginTop: '0px',
            paddingBottom: '5px',
            marginBottom: '0px',
            borderBottom: 'solid 1px #efefef'
          }}
        >
          Step 1 - check the state of your website
        </h3>
        <p>
          Before you start using this plugin: test your website for problems and
          create a priority list with the issues that need to be resolved. This
          plugin offers access to several tests from the PageSpeed menu in the
          top admin bar.
        </p>
        <p>
          <a
            className="button button-small"
            href={`${thinkUrl}&hl=${this.lgcode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Full Spectrum Test
          </a>
          <a
            className="button button-small"
            href={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(
              homeUrl
            )}&hl=${this.lgcode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google PageSpeed Test
          </a>
          <a
            className="button button-small"
            href={`https://search.google.com/search-console/mobile-friendly?url=${encodeURIComponent(
              homeUrl
            )}&hl=${this.lgcode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Mobile Test
          </a>
          <a
            className="button button-small"
            href={`https://performance.sucuri.net/domain/${encodeURIComponent(
              baseHomeUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Securi Server Response Time
          </a>
          <a
            className="button button-small"
            href={`http://www.webpagetest.org/?url=${encodeURIComponent(
              homeUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WebPageTest.org
          </a>
          <a
            className="button button-small"
            href={`https://gtmetrix.com/?url=${encodeURIComponent(homeUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GTmetrix
          </a>
          <a
            className="button button-small"
            href={`https://securityheaders.io/?q=${encodeURIComponent(
              homeUrl
            )}&hide=on&followRedirects=on`}
            target="_blank"
            rel="noopener noreferrer"
          >
            SecurityHeaders.io
          </a>
          <a
            className="button button-small"
            href={`https://www.ssllabs.com/ssltest/analyze.html?d=${encodeURIComponent(
              homeUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            SSL test
          </a>
          <a
            className="button button-small"
            href={`http://www.intodns.com/${encodeURIComponent(baseHomeUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            DNS test
          </a>
        </p>

        <Info color="yellow" style={{ marginBottom: '10px' }}>
          <p style={{ margin: '0px' }}>
            <strong>Tip:</strong> If you can resolve small issues fast, start
            with the smaller issues, it may help to resolve the larger issues.
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
          Step 2 - server optimization
        </h3>
        <p>
          Start with the fundament of your website: the server. Make sure that
          the best{' '}
          <a
            href={`https://encrypted.google.com/search?hl=${
              this.lgcode
            }&q=${encodeURIComponent('gzip configuration')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            gzip settings
          </a>{' '}
          and{' '}
          <a
            href={`https://encrypted.google.com/search?hl=${
              this.lgcode
            }&q=${encodeURIComponent('http cache headers configuration')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            HTTP cache headers
          </a>{' '}
          are installed and if the server is slow, find ways to improve the
          speed of the server by optimizing WordPress plugins or by using a{' '}
          <a
            href={`https://encrypted.google.com/search?hl=${
              this.lgcode
            }&q=${encodeURIComponent(
              'best wordpress full page cache' + new Date().getFullYear()
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            full page cache
          </a>{' '}
          solution. It may be required to choose a better hosting plan or to
          move to a different hosting provider. Hosting reliability and
          performance is a major aspect for achieving a good performance and
          stability reputation in Google. Once you lose a stable hosting
          reputation, it may cause a hidden penalty and you may not get your
          reputation back for years.
        </p>
        <p>
          Choose professional server configuration over WordPress plugins to
          achieve the best performance.
        </p>
        <p>
          Google{' '}
          <a
            href={`https://developers.google.com/speed/docs/insights/Server?hl=${this.lgcode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            officially advises
          </a>{' '}
          a maximum server response time of 0,2 seconds (200ms). Test your
          global server response times{' '}
          <a
            href={`https://performance.sucuri.net/domain/${encodeURIComponent(
              new URL(homeUrl).host.replace('www', '')
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <Info color="yellow" style={{ marginBottom: '10px' }}>
          <p style={{ margin: '0px' }}>
            <strong>Tip:</strong> Find out what exactly you need and write a
            single detailed request to your hosting provider for professional
            installation. If the server has a speed issue, simply ask your host
            to achieve a maximum server speed of 0,2 seconds (200ms) as advised
            by Google.
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
          Step 3 - Google PageSpeed optimization
        </h3>
        <p>
          Test your website at{' '}
          <a
            href={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(
              homeUrl
            )}&hl=${this.lgcode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google PageSpeed Insights
          </a>{' '}
          and start resolving the issues. Google offers detailed documentation
          for each issue and this plugin offers the tools to resolve most
          issues.
        </p>

        <h3
          style={{
            marginTop: '0px',
            paddingBottom: '5px',
            marginBottom: '0px',
            borderBottom: 'solid 1px #efefef'
          }}
        >
          Step 4 - setup a website monitor
        </h3>
        <p>
          Once the performance and quality of your website has achieved a
          perfect state, it is required to maintain it to achieve an optimal
          reliability, quality and performance reputation in Google. Go to the{' '}
          <a href={monitorUrl}>Monitor tab</a> for information about website
          monitoring tools.
        </p>
      </PageContent>
    );
  }
}

export default IntroView;
