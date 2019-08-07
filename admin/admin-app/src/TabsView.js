import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import Tabs from './Tabs';

class TabsView extends Component {

    render() {
        return (
            <div>
                <h1>{__('Above the Fold Optimization')}</h1>
                <nav className="nav-tab-wrapper" style={{ position: 'relative' }}>
                    <div className="ref">
                        <div className="links">
                            <a href="https://github.com/16patsle/above-the-fold-optimization" target="_blank">Github</a> ‐ <a href="https://github.com/16patsle/above-the-fold-optimization/issues" target="_blank">Report a bug</a> {/*‐ <a href="https://wordpress.org/support/plugin/above-the-fold-optimization/reviews/#new-post" target="_blank">Review plugin</a>*/}
                        </div>
                    </div>
                    <Tabs selected={this.props.location.pathname.slice(1) || 'intro'}></Tabs>
                </nav>
            </div>
        );
    }
}

export default TabsView;
