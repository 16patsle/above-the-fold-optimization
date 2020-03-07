import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import Tabs from '../components/Tabs';

class TabsView extends Component {
  render() {
    return (
      <div>
        <h1>{__('ABTF Reborn', 'abtfr')}</h1>
        <nav className="nav-tab-wrapper" style={{ position: 'relative' }}>
          <div className="ref">
            <div className="links">
              <a
                href="https://github.com/16patsle/abtf-reborn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>{' '}
              ‐{' '}
              <a
                href="https://github.com/16patsle/abtf-reborn/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Report a bug
              </a>{' '}
              {/*‐ <a href="https://wordpress.org/support/plugin/abtfr/reviews/#new-post" target="_blank" rel="noopener noreferrer">Review plugin</a>*/}
            </div>
          </div>
          <Tabs
            selected={this.props.location.pathname.slice(1) || 'intro'}
          ></Tabs>
        </nav>
      </div>
    );
  }
}

export default TabsView;
