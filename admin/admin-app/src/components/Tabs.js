import React, { Component } from 'react';
import { adminUrl, adminTabs } from '../utils/globalVars';

class Tabs extends Component {
  render() {
    const tabElements = [];
    for (const tabKey in adminTabs) {
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
          {adminTabs[tabKey]}
        </a>
      );
    }
    return tabElements;
  }
}

export default Tabs;
