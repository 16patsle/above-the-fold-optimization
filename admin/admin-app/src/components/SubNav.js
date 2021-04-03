import React from 'react';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { ExternalLink } from '@wordpress/components';
import { adminUrl, criticalCssEditorUrl } from '../utils/globalVars';

const SubNav = ({ isBuildTool }) => {
  return (
    <nav className="subnav">
      <span className="t">{__('Submenu:', 'abtfr')}</span>
      <a
        href={adminUrl + 'admin.php?page=abtfr-criticalcss-test'}
        className="f"
      >
        {__('Quality Test (Split View)', 'abtfr')}
      </a>
      <ExternalLink href={criticalCssEditorUrl + '#editor'}>
        {__('Live Editor', 'abtfr')}
      </ExternalLink>
      <Link to="/build-tool" className={isBuildTool && 's'}>
        {__('Gulp.js Critical CSS Generator', 'abtfr')}
      </Link>
    </nav>
  );
};

export default SubNav;
