import React, { Component } from 'react';

const tabs = JSON.parse(document.querySelector('#adminTabs').value);
const tab = JSON.parse(document.querySelector('#currentAdminTab').value);

class Tabs extends Component {

    render() {
        const tabElements = [];
        for (const tabKey in tabs) {
            if (tabKey === 'criticalcss-test' || tabKey === 'build-tool') {
                continue;
            }

            const className = (tabKey == tab || (tabKey === 'criticalcss' && tab == 'criticalcss-test')) ? ' nav-tab-active' : '';
            const url = new URL(window.adminUrl)
            url.searchParams.append('page', 'pagespeed');
            url.hash += ((tabKey !== 'intro') ? '#/' + tabKey : '#/')
            tabElements.push(<a className={'nav-tab' + className} href={encodeURI(url)} key={tabKey}>{tabs[tabKey]}</a>);
        }
        return tabElements;
    }
}

export default Tabs;
