import React, { Component } from 'react';

const tabs = JSON.parse(document.querySelector('#admin_tabs').value);
const tab = JSON.parse(document.querySelector('#current_admin_tab').value);

class Tabs extends Component {

    render() {
        const tabElements = [];
        for (const tabkey in tabs) {
            if (tabkey === 'criticalcss-test' || tabkey === 'build-tool') {
                continue;
            }

            const className = (tabkey == tab || (tabkey === 'criticalcss' && tab == 'criticalcss-test')) ? ' nav-tab-active' : '';
            console.log(tabkey, tabs[tabkey], className)
            const url = new URL(window.admin_url)
            url.searchParams.append('page', 'pagespeed' + ((tabkey !== 'intro') ? '-' + tabkey : ''));
            tabElements.push(<a className={'nav-tab' + className} href={encodeURI(url)} key={tabkey}>{tabs[tabkey]}</a>);
        }
        return tabElements;
    }
}

export default Tabs;
