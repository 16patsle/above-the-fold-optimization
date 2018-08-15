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
            tabElements.push(<a className={'nav-tab' + className} href={url} key={tabkey}>{tabs[tabkey]}</a>);
        }
        return (
            <nav className="nav-tab-wrapper" style={{ position: 'relative' }}>
                <div className="ref">
                    <div className="links">
                        <a href="https://github.com/16patsle/above-the-fold-optimization" target="_blank">Github</a> ‐ <a href="https://github.com/16patsle/above-the-fold-optimization/issues" target="_blank">Report a bug</a> {/*‐ <a href="https://wordpress.org/support/plugin/above-the-fold-optimization/reviews/#new-post" target="_blank">Review plugin</a>*/}
                    </div>
                </div>
                {
                    tabElements
                }{/*

            $class = ($tabkey == $tab || ($tabkey === 'criticalcss' && $tab == 'criticalcss-test')) ? ' nav-tab-active' : '';
            $url = add_query_arg(array('page' => 'pagespeed' . (($tabkey !== 'intro') ? '-' . $tabkey : '')), admin_url('admin.php'));
                echo '<a class="nav-tab'.$class.'" href="'.esc_url($url).'">'.$name.'</a>';
        }*/}
            </nav>
        );
    }
}

export default Tabs;
