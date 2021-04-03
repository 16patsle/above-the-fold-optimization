import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      const url = tabKey !== 'intro' ? '/' + tabKey : '/';
      tabElements.push(
        <Link className={'nav-tab' + className} to={url} key={tabKey}>
          {adminTabs[tabKey]}
        </Link>
      );
    }
    return tabElements;
  }
}

Tabs.propTypes = {
  selected: PropTypes.string.isRequired
};

export default Tabs;
