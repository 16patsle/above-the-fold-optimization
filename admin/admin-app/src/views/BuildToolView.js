import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { __, sprintf } from '@wordpress/i18n';
import { useJSON } from '../utils/useSettings';
import {
  homeUrl,
  adminUrl,
  siteTitle,
  abtfrAdminNonce,
  lgCode,
  utmString,
  wpAbtfrUri,
  buildToolPrefillValues
} from '../utils/globalVars';
import { getJSON } from '../utils/getSettings';
import newlineArrayString from '../utils/newLineArrayString';
import LoadingWrapper from '../components/LoadingWrapper';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import SettingInnerTable from '../components/SettingInnerTable';
import SettingTextInput from '../components/SettingTextInput';
import SettingTextarea from '../components/SettingTextarea';
import SettingSelect from '../components/SettingSelect';
import SettingCheckbox from '../components/SettingCheckbox';
import SubmitButton from '../components/SubmitButton';
import PageSelect from '../components/PageSelect';

const BuildToolView = () => {
  const { options: conditionalValues, shouldRender, error } = useJSON(
    'conditionalcss',
    query => {
      return getJSON(query);
    },
    'conditionalValues'
  );

  const [taskName, setTaskName] = useState(buildToolPrefillValues.taskname);
  const [page, setPage] = useState();
  const [dimensions, setDimensions] = useState(
    newlineArrayString(buildToolPrefillValues.dimensions)
  );
  const [extra, setExtra] = useState(buildToolPrefillValues.extra);
  const [update, setUpdate] = useState(
    buildToolPrefillValues.update.replace(/^global$/, 'global.css')
  );

  const options = [
    {
      name: __('Do not update (store result in /package/output/)', 'abtfr'),
      value: ''
    },
    { name: __('Overwrite global Critical CSS', 'abtfr'), value: 'global.css' },
    conditionalValues && Object.entries(conditionalValues).length > 0
      ? {
          name: __('Conditional Critical CSS', 'abtfr'),
          options: Object.entries(conditionalValues).map(([file, data]) => ({
            name: sprintf(
              __('Overwrite %s', 'abtfr'),
              file + ' – ' + data.config.name
            ),
            value: file
          }))
        }
      : { name: __('', 'abtfr'), value: '-', disabled: true }
  ];

  return (
    <LoadingWrapper shouldRender={shouldRender} error={error}>
      <nav className="subnav">
        <span className="t">{__('Submenu:', 'abtfr')}</span>
        <a
          href={adminUrl + 'admin.php?page=abtfr-criticalcss-test'}
          className="f"
        >
          {__('Quality Test (Split View)', 'abtfr')}
        </a>
        <a href={adminUrl + 'admin.php?page=abtfr#/build-tool'} className="s">
          {__('Gulp.js Critical CSS Generator', 'abtfr')}
        </a>
      </nav>
      <form
        method="post"
        action={
          adminUrl + 'admin-post.php?action=abtfr_create_critical_package'
        }
        className="clearfix abtfr-bt-builder"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('Critical Path CSS Creator', 'abtfr')}>
          <Helmet>
            <title>
              {__('Critical Path CSS Creator', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
          <p>
            Most advanced optimization software such as critical path CSS
            creation are easiest to use using a build tool such as{' '}
            <a
              href="http://gruntjs.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Grunt.js
            </a>{' '}
            and{' '}
            <a
              href="http://gulpjs.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Gulp.js
            </a>
            . While those build tools make it easy to use professional software
            for experienced developers, most average WordPress users will not be
            able to use them and thus have no access to professional
            optimization software.
          </p>
          <p>
            This WordPress based <em>build tool builder</em> enables
            professional critical path CSS creation via{' '}
            <a
              href="https://github.com/addyosmani/critical"
              rel="noopener noreferrer"
              target="_blank"
            >
              critical
            </a>{' '}
            (by a Google engineer) using the build tool{' '}
            <a
              href="http://gulpjs.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Gulp.js
            </a>
            .
          </p>
          <table className="form-table">
            <tbody>
              <SettingInnerTable
                header={__(
                  'Create a Gulp.js Critical CSS Task Package',
                  'abtfr'
                )}
              >
                <SettingTextInput
                  header={__('Task Name', 'abtfr')}
                  name="taskname"
                  link={{ value: taskName, set: setTaskName }}
                  size="50"
                  pattern="^[a-z\d-]*$"
                  placeholder={__(
                    'Enter a Gulp.js task name (no spaces).',
                    'abtfr'
                  )}
                  description={
                    <>
                      The task name is used as task command and as subdirectory
                      (/theme/abtfr/<strong>task-name</strong>/).
                    </>
                  }
                />
                <PageSelect
                  header={__('Page', 'abtfr')}
                  name="url"
                  link={{ value: page, set: setPage }}
                  description={__(
                    'Select a page for which to create critical path CSS.',
                    'abtfr'
                  )}
                  defaultOptions={[
                    { label: __('Home Page (index)', 'abtfr'), value: homeUrl }
                  ]}
                />
                <SettingTextarea
                  header={__('Repsonsive Dimensions', 'abtfr')}
                  name="dimensions"
                  style={{ width: '100%', height: '50px', fontSize: '11px' }}
                  link={{ value: dimensions, set: setDimensions }}
                  placeholder={__(
                    'Leave blank for the default dimension...',
                    'abtfr'
                  )}
                  description={
                    <>
                      Enter one or more responsive dimensions for which to
                      generate critical path CSS. Format: <code>800x600</code>.
                      One dimension per line. The result is combined and
                      compressed. (
                      <a
                        href="https://github.com/addyosmani/critical#generate-critical-path-css-with-multiple-resolutions"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        more info
                      </a>
                      ).
                    </>
                  }
                />
                <SettingCheckbox
                  name="extra"
                  header={__('Append extra.css', 'abtfr')}
                  link={{ value: extra, set: setExtra }}
                  label={__('Enabled', 'abtfr')}
                  description={
                    <>
                      Add a file <code>extra.css</code> to the package to be
                      appended to the critical path CSS. The combined result is
                      minified to prevent overlapping CSS.
                    </>
                  }
                />
                <SettingSelect
                  name="update"
                  header={__('Update Critical CSS', 'abtfr')}
                  link={{ value: update, set: setUpdate }}
                  options={options}
                  label={__('Enabled', 'abtfr')}
                  description={__(
                    'Use this option to automatically update WordPress Critical CSS.',
                    'abtfr'
                  )}
                />
              </SettingInnerTable>
            </tbody>
          </table>
          <Info color="red">
            <span style={{ color: 'red', fontWeight: 'bold' }}>Warning:</span>{' '}
            No build tool support is provided via the WordPress support forum!
            Bugs, software or build tool conflicts occur often and may be OS,
            Node-software or dependency (version) related. It often is complex,
            even for the most experienced developer. Please seek help via the
            (Github) support forums of relevant software. This build tool
            builder simply relies on 'the latest version' and does not consider
            bugs or conflicts in the latest software.
          </Info>
          <SubmitButton type={['primary', 'large']} name="create">
            {__('Install package', 'abtfr')}
          </SubmitButton>
          <SubmitButton type={['large']} name="download">
            {__('Download package (zip)', 'abtfr')}
          </SubmitButton>
        </PageContent>
      </form>
    </LoadingWrapper>
  );
};

export default BuildToolView;
