import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import Info from '../components/Info';
import PageContent from '../components/PageContent';

class MonitorView extends Component {
  constructor(props) {
    super(props);

    this.lgcode = document.querySelector('#lgcode').value;
    this.utmstring = document.querySelector('#utmstring').value;
    this.google_intlcode = document.querySelector('#google_intlcode').value;
    this.sllInstalled =
      document.querySelector('#ssl_installed').value === 'true';
    this.uptimerobotStatus = document.querySelector(
      '#uptimerobot_status'
    ).value;
    this.uptimerobotInstallLink = document.querySelector(
      '#uptimerobot_install_link'
    ).value;
    this.uptimerobotOverview = document.querySelector(
      '#uptimerobot_overview'
    ).value;
  }

  render() {
    return (
      <form
        method="post"
        action={document.querySelector('#admin_url_monitor_update').value}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: window.abtfAdminNonce }}></div>
        <PageContent header={__('Website Monitor')}>
          <Helmet>
            <title>Website Monitor {window.siteTitle}</title>
          </Helmet>
          <div style={{ float: 'right', zIndex: 9000, position: 'relative' }}>
            <a
              href={`https://www.google.nl/webmasters/?hl=${this.lgcode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={
                  document.querySelector('#wpabtf_uri').value +
                  'admin/images/googlebot.png'
                }
                alt="Google Bot"
                title="Google Webmasters Monitor"
              />
            </a>
          </div>
          <p>
            Google wants to provide its customers (searching users) with an
            optimal internet experience. Websites with a proven track record of
            quality and reliability will obtain a preferred position, especially
            for premium search terms and when Google has to (temporarily) select
            a website for a higher amount of traffic.
          </p>
          <p>
            To ensure uptime and website quality it is required to monitor all
            aspects of a website that influence the availability, stability and
            performance so that you will be able to respond instantly when a
            problem occurs, preventing damage to your reputation in Google. The
            most important aspects to monitor besides basic uptime are the{' '}
            <a
              href={`https://testmysite.thinkwithgoogle.com/?url=${window.homeUrl}&hl=${this.lgcode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google PageSpeed scores
            </a>
            ,{' '}
            <a
              href={`https://www.google.com/transparencyreport/safebrowsing/diagnostic/index.html?hl=${
                this.lgcode
              }#url=${encodeURIComponent(
                new URL(window.homeUrl).host.replace('www', '')
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Malware registration
            </a>
            , SSL certificate expiration and mobile usability (user experience)
            on all mobile devices.
          </p>
          <p>
            There are many free and paid monitoring services.{' '}
            <a
              href={`https://encrypted.google.com/search?hl=${
                this.lgcode
              }&q=${encodeURIComponent(
                'best website monitor ' + new Date().getFullYear()
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Search Google
            </a>{' '}
            for the available website monitoring services.
          </p>
          <Info color="yellow">
            <strong>
              You should always register your website for{' '}
              <a
                href={`https://www.google.com/webmasters/?hl=${this.lgcode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Webmasters
              </a>{' '}
              to get a free monitor for SEO related problems and tips to improve
              the quality of your website.
            </strong>{' '}
            Checking in regularly shows Google that you are genuinely concerned
            about the quality and findability of your website.
          </Info>
          <div style={{ float: 'right' }}>
            <a
              href={`https://uptimerobot.com/?${this.utmstring}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={
                  document.querySelector('#wpabtf_uri').value +
                  'admin/images/uptimerobot.png'
                }
                alt="UptimeRobot.com"
                title="UptimeRobot.com - Free website monitor"
              />
            </a>
          </div>
          <h4>UptimeRobot.com - uptime monitor</h4>
          {this.uptimerobotStatus === 'not installed' ? (
            <div>
              <p>
                The plugin <strong>Uptime Robot for WordPress</strong> is not
                installed or deactivated. Activate or install the plugin to
                display an UptimeRobot.com overview.
              </p>
              <p>
                <a href={this.uptimerobotInstallLink} className="button">
                  Install plugin
                </a>
              </p>
            </div>
          ) : null}
          {this.uptimerobotStatus === 'not configured' ? (
            <p>
              Configure the UptimeRobot.com API key in{' '}
              <strong>Uptime Robot for WordPress</strong>.
            </p>
          ) : null}
          {this.uptimerobotStatus === 'active' ? (
            <div
              className="uptime"
              dangerouslySetInnerHTML={{ __html: this.uptimerobotOverview }}
            ></div>
          ) : null}
          <div style={{ float: 'right' }}>
            <a
              href={`https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html?${this.utmstring}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={
                  document.querySelector('#wpabtf_uri').value +
                  'admin/images/google-security.png'
                }
                alt="Google Security Blog"
                title="Google Security Blog"
              />
            </a>
          </div>
          <h4>CertificateMonitor.org - SSL certificate expiry monitor</h4>
          <div className={this.sllInstalled ? 'ok_green' : 'warning_red'}>
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
            <a
              href={`https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html?${this.utmstring}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google blog
            </a>
            ).
          </div>
          <p>
            Register your website for free at{' '}
            <a
              href={`https://certificatemonitor.org/?${this.utmstring}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              CertificateMonitor.org
            </a>{' '}
            to receive a notification when a SSL certificate is about the
            expire.{' '}
            <a
              href={`https://encrypted.google.com/search?hl=${
                this.lgcode
              }&q=${encodeURIComponent(
                'ssl certificate monitor ' + new Date().getFullYear()
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Search Google
            </a>{' '}
            for other premium SSL monitoring services.
          </p>
          <h4>Professional &amp; advanced website monitoring</h4>
          <p>
            Consider using robot solutions that simulate real-user behaviour on
            your website, from multiple (mobile) devices, to monitor the
            physical performance and user experience of your website including
            details such as the functionality of a mobile menu.
          </p>
          <p>
            One of the many solutions is{' '}
            <a
              href={`https://www.browserstack.com/automate?${this.utmstring}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              BrowserStack.com Automate Pro
            </a>
            .{' '}
            <a
              href={`https://encrypted.google.com/search?hl=${
                this.lgcode
              }&q=${encodeURIComponent('selenium website monitor')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Search Google
            </a>{' '}
            for more automated UI test tools.
          </p>
        </PageContent>
      </form>
    );
  }
}

export default MonitorView;
