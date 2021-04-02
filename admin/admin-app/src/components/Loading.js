import React from 'react';
import { __ } from '@wordpress/i18n';
import { Spinner, VisuallyHidden } from '@wordpress/components';

const Loading = ({ text = __('Loading...', 'abtfr') }) => (
  <>
    <Spinner />
    <VisuallyHidden>{text}</VisuallyHidden>
  </>
);

export default Loading;
