import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import useSettings from '../utils/useSettings';
import {
  homeUrl,
  adminUrl,
  siteTitle,
  abtfrAdminNonce,
  lgCode,
  utmString,
  wpAbtfrUri
} from '../utils/globalVars';
import LoadingWrapper from '../components/LoadingWrapper';
import Info from '../components/Info';
import PageContent from '../components/PageContent';

const BuildToolView = () => {
  const { getOption, shouldRender, error } = useSettings();

  return (
    <LoadingWrapper shouldRender={shouldRender} error={error}>
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtfr_create_critical_package'}
        className="clearfix abtfr-bt-builder"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('Critical Path CSS Creator', 'abtfr')}>
          <Helmet>
            <title>
              {__('Critical Path CSS Creator', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
        </PageContent>
      </form>
    </LoadingWrapper>
  );
};

export default BuildToolView;
