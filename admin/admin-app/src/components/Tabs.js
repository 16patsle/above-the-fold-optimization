import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { adminUrl, adminTabs } from '../utils/globalVars';

class Tabs extends Component {
  static defaultProps = {
    selected: 'intro'
  };

  render() {
    const tabElements = [];
    for (const tabKey in adminTabs) {
      if (tabKey === 'criticalcss-test' || tabKey === 'build-tool') {
        continue;
      }

      const className =
        tabKey === this.props.selected ||
        (tabKey === 'criticalcss' &&
          this.props.selected === 'criticalcss-test') ||
        (tabKey === 'intro' && this.props.selected === '')
          ? ' nav-tab-active'
          : '';
      const url = new URL(adminUrl + 'admin.php');
      url.searchParams.append('page', 'abtfr');
      url.hash += tabKey !== 'intro' ? '#/' + tabKey : '#/';
      tabElements.push(
        <a className={'nav-tab' + className} href={encodeURI(url)} key={tabKey}>
          {adminTabs[tabKey]}
        </a>
      );
    }
    return tabElements;
  }
}

Tabs.propTypes = {
  selected: PropTypes.string.isRequired
};

export default Tabs;
