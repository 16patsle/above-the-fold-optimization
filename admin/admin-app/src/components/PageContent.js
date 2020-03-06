import React, { Component } from 'react';

class PageContent extends Component {
  render() {
    return (
      <div className="wrap abtfr-wrapper">
        <div id="poststuff">
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

export default PageContent;
