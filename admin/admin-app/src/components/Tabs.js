import React, { Component } from 'react';
import getValueOf from '../utils/getValueOf';
import { adminUrl } from '../utils/globalVars';

const tabs = JSON.parse(getValueOf('#adminTabs', 'object'));

class Tabs extends Component {
  render() {
    const tabElements = [];
    for (const tabKey in tabs) {
      if (tabKey === 'criticalcss-test' || tabKey === 'build-tool') {
        continue;
      }

      const className =
        tabKey === this.props.selected ||
        (tabKey === 'criticalcss' && this.props.selected === 'criticalcss-test')
          ? ' nav-tab-active'
          : '';
      const url = new URL(adminUrl);
      url.searchParams.append('page', 'pagespeed');
      url.hash += tabKey !== 'intro' ? '#/' + tabKey : '#/';
      tabElements.push(
        <a className={'nav-tab' + className} href={encodeURI(url)} key={tabKey}>
          {tabs[tabKey]}
        </a>
      );
    }
    return tabElements;
  }
}

export default Tabs;
