import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Notice } from '@wordpress/components';
import { homeUrl, extractCssKey } from '../../utils/globalVars';
import PageSelect from '../PageSelect';

const ExtractFullCss = () => {
  const [extractCss, setExtractCss] = useState({});
  const [noticeText, setNoticeText] = useState(false);

  const extractCssButtonClicked = (href = '', output = 'download') => {
    href = href.trim();

    if (href === '') {
      setNoticeText(__('Select a page...', 'abtfr'));
      return;
    }

    if (/\?/.test(href)) {
      href += '&';
    } else {
      href += '?';
    }

    document.location.href = `${href}extract-css=${extractCssKey}&output=${output}`;
  };

  return (
    <>
      <h3
        style={{
          padding: '0px',
          margin: '0px',
          marginBottom: '10px'
        }}
      >
        {__('Extract Full CSS', 'abtfr')}
      </h3>
      {noticeText && (
        <Notice status="error" onRemove={() => setNoticeText(false)}>
          {noticeText}
        </Notice>
      )}
      <p className="description">
        {__(
          'For the creation of Critical Path CSS you need the full CSS of a page. This tool allows you to extract the full CSS from any url and optionally to select the specific CSS files you want to extract.',
          'abtfr'
        )}
      </p>
      <p className="description" style={{ marginBottom: '1em' }}>
        You can quickly output the full CSS of any url by adding the query
        string{' '}
        <code>
          <strong>
            ?extract-css=
            {extractCssKey}
            &amp;output=print
          </strong>
        </code>
        .
      </p>
      <PageSelect
        wrapper={false}
        size={80}
        placeholder={__('Search a post/page/category ID or name...', 'abtfr')}
        defaultOptions={[
          {
            label: __('Home Page (index)', 'abtfr'),
            value: homeUrl
          }
        ]}
        link={{ value: extractCss, set: setExtractCss }}
      />
      <div style={{ marginTop: '10px' }}>
        <Button
          isSecondary
          onClick={() => {
            extractCssButtonClicked(extractCss.value);
          }}
        >
          {__('Download', 'abtfr')}
        </Button>
        <Button
          isSecondary
          onClick={() => {
            extractCssButtonClicked(extractCss.value, 'print');
          }}
        >
          {__('Print', 'abtfr')}
        </Button>
      </div>
    </>
  );
};

export default ExtractFullCss;
