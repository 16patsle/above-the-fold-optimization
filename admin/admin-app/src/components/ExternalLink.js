import React from 'react';
import PropTypes from 'prop-types';

function ExternalLink({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
};

export default ExternalLink;
