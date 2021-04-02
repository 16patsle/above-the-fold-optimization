import React from 'react';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';

const LoadingWrapper = props => {
  if (props.error) {
    return <div>{sprintf(__('Error: %s', 'abtfr'), props.error)}</div>;
  }

  if (!props.shouldRender) {
    return (
      <div>
        <Loading/>
      </div>
    );
  }

  return (
    <ErrorBoundary
      renderError={error => (
        <div>{sprintf(__('Error: %s', 'abtfr'), error)}</div>
      )}
    >
      {props.children}
    </ErrorBoundary>
  );
};

LoadingWrapper.propTypes = {
  shouldRender: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default LoadingWrapper;
