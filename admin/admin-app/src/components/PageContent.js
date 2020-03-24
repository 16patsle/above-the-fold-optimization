import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageContent extends Component {
  render() {
    return (
      <div className="wrap abtfr-wrapper">
        <div>
          {/* poststuff id removed */}
          <div id="post-body" className="metabox-holder">
            <div id="post-body-content">
              <div className="postbox">
                <h3 className="hndle">
                  <span>{this.props.header}</span>
                </h3>
                <div className="inside testcontent">{this.props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PageContent.propTypes = {
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  children: PropTypes.node.isRequired
};

export default PageContent;
