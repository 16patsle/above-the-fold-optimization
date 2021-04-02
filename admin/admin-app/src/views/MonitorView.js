import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { Button, ExternalLink } from '@wordpress/components';
import useSettings from '../utils/useSettings';
import {
  homeUrl,
  adminUrl,
  siteTitle,
  abtfrAdminNonce,
  lgCode,
  utmString,
  wpAbtfrUri
} from '../utils/globalVars';
import LoadingWrapper from '../components/LoadingWrapper';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import './MonitorView.css';

const sllInstalled = new URL(homeUrl).protocol === 'https:';

const MonitorView = () => {
  const { getOption, shouldRender, error } = useSettings();

  return (
    <LoadingWrapper shouldRender={shouldRender} error={error}>
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtfr_monitor_update'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('Website Monitor', 'abtfr')}>
          <Helmet>
            <title>
              {__('Website Monitor', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
          <div style={{ float: 'right', zIndex: 9000, position: 'relative' }}>
            <ExternalLink
              href={`https://www.google.nl/webmasters/?hl=${lgCode}`}
            >
              <img
                src={wpAbtfrUri + 'admin/images/googlebot.png'}
                alt="Google Bot"
                title="Google Webmasters Monitor"
              />
            </ExternalLink>
          </div>
          <p>
            {__(
              'Google wants to provide its customers (searching users) with an optimal internet experience. Websites with a proven track record of quality and reliability will obtain a preferred position, especially for premium search terms and when Google has to (temporarily) select a website for a higher amount of traffic.',
              'abtfr'
            )}
          </p>
          <p>
            To ensure uptime and website quality it is required to monitor all
            aspects of a website that influence the availability, stability and
            performance so that you will be able to respond instantly when a
            problem occurs, preventing damage to your reputation in Google. The
            most important aspects to monitor besides basic uptime are the{' '}
            <ExternalLink
              href={`https://testmysite.thinkwithgoogle.com/?url=${homeUrl}&hl=${lgCode}`}
            >
              Google PageSpeed scores
            </ExternalLink>
            ,{' '}
            <ExternalLink
              href={`https://www.google.com/transparencyreport/safebrowsing/diagnostic/index.html?hl=${lgCode}#url=${encodeURIComponent(
                new URL(homeUrl).host.replace('www', '')
              )}`}
            >
              Google Malware registration
            </ExternalLink>
            , SSL certificate expiration and mobile usability (user experience)
            on all mobile devices.
          </p>
          <p>
            There are many free and paid monitoring services.{' '}
            <ExternalLink
              href={`https://encrypted.google.com/search?hl=${lgCode}&q=${encodeURIComponent(
                'best website monitor ' + new Date().getFullYear()
              )}`}
            >
              Search Google
            </ExternalLink>{' '}
            for the available website monitoring services.
          </p>
          <Info color="yellow">
            <strong>
              You should always register your website for{' '}
              <ExternalLink
                href={`https://www.google.com/webmasters/?hl=${lgCode}`}
              >
                Google Webmasters
              </ExternalLink>{' '}
              to get a free monitor for SEO related problems and tips to improve
              the quality of your website.
            </strong>{' '}
            Checking in regularly shows Google that you are genuinely concerned
            about the quality and findability of your website.
          </Info>
          <div style={{ float: 'right' }}>
            <ExternalLink href={`https://uptimerobot.com/?${utmString}`}>
              <img
                src={wpAbtfrUri + 'admin/images/uptimerobot.png'}
                alt="UptimeRobot.com"
                title="UptimeRobot.com - Free website monitor"
              />
            </ExternalLink>
          </div>
          <h4>UptimeRobot.com - uptime monitor</h4>
          {getOption('uptimerobotStatus') === 'not installed' ? (
            <div>
              <p>
                The plugin <strong>Uptime Robot for WordPress</strong> is not
                installed or deactivated. Activate or install the plugin to
                display an UptimeRobot.com overview.
              </p>
              <p>
                <Button isSecondary href={getOption('uptimerobotInstallLink')}>
                  Install plugin
                </Button>
              </p>
            </div>
          ) : null}
          {getOption('uptimerobotStatus') === 'not configured' ? (
            <p>
              Configure the UptimeRobot.com API key in{' '}
              <strong>Uptime Robot for WordPress</strong>.
            </p>
          ) : null}
          {getOption('uptimerobotStatus') === 'active' ? (
            <div
              className="uptime"
              dangerouslySetInnerHTML={{
                __html: getOption('uptimerobotOverview')
              }}
            ></div>
          ) : null}
          <div style={{ float: 'right' }}>
            <ExternalLink
              href={`https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html?${utmString}`}
            >
              <img
                src={wpAbtfrUri + 'admin/images/google-security.png'}
                alt="Google Security Blog"
                title="Google Security Blog"
              />
            </ExternalLink>
          </div>
          <h4>CertificateMonitor.org - SSL certificate expiry monitor</h4>
          <div className={sllInstalled ? 'ok_green' : 'warning_red'}>
            <span style={{ fontWeight: 'bold' }}>
              To secure findability in Google it is required to install a SSL
              certificate.
            </span>
            Google officially announced in 2014 that SSL secured websites are
            ranked higher in the search results and in some countries Google is
            labeling non-https websites as <code>insecure</code> in the search
            results, discouraging a visit. In the beginning of 2017 the Google
            Chrome browser will start showing an insecure warning for non SSL
            websites (
            <ExternalLink
              href={`https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html?${utmString}`}
            >
              Google blog
            </ExternalLink>
            ).
          </div>
          <p>
            Register your website for free at{' '}
            <ExternalLink href={`https://certificatemonitor.org/?${utmString}`}>
              CertificateMonitor.org
            </ExternalLink>{' '}
            to receive a notification when a SSL certificate is about the
            expire.{' '}
            <ExternalLink
              href={`https://encrypted.google.com/search?hl=${lgCode}&q=${encodeURIComponent(
                'ssl certificate monitor ' + new Date().getFullYear()
              )}`}
            >
              Search Google
            </ExternalLink>{' '}
            for other premium SSL monitoring services.
          </p>
          <h4>Professional &amp; advanced website monitoring</h4>
          <p>
            {__(
              'Consider using robot solutions that simulate real-user behaviour on your website, from multiple (mobile) devices, to monitor the physical performance and user experience of your website including details such as the functionality of a mobile menu.',
              'abtfr'
            )}
          </p>
          <p>
            One of the many solutions is{' '}
            <ExternalLink
              href={`https://www.browserstack.com/automate?${utmString}`}
            >
              BrowserStack.com Automate Pro
            </ExternalLink>
            .{' '}
            <ExternalLink
              href={`https://encrypted.google.com/search?hl=${lgCode}&q=${encodeURIComponent(
                'selenium website monitor'
              )}`}
            >
              Search Google
            </ExternalLink>{' '}
            for more automated UI test tools.
          </p>
        </PageContent>
      </form>
    </LoadingWrapper>
  );
};

export default MonitorView;
