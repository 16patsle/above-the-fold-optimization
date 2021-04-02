import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import { ExternalLink } from '@wordpress/components';
import Tabs from '../components/Tabs';
import './TabsView.css';

class TabsView extends Component {
  render() {
    return (
      <div>
        <h1>{__('ABTF Reborn', 'abtfr')}</h1>
        <nav className="nav-tab-wrapper" style={{ position: 'relative' }}>
          <div className="ref">
            <div className="links">
              <ExternalLink href="https://github.com/16patsle/abtf-reborn">
                Github
              </ExternalLink>{' '}
              ‐{' '}
              <ExternalLink href="https://github.com/16patsle/abtf-reborn/issues">
                Report a bug
              </ExternalLink>{' '}
              {/*‐ <ExternalLink href="https://wordpress.org/support/plugin/abtfr/reviews/#new-post">Review plugin</ExternalLink>*/}
            </div>
          </div>
          <Tabs selected={this.props.location.pathname.slice(1)} />
        </nav>
      </div>
    );
  }
}

export default TabsView;
