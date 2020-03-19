import React, { useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../../utils/useLinkState';
import { homeUrl } from '../../utils/globalVars';
import Info from '../Info';
import SettingCheckbox from '../SettingCheckbox';
import SubmitButton from '../SubmitButton';
import getSettings, { getJSON } from '../../utils/getSettings';
import CriticalCssEditor from './CriticalCssEditor';
import AddConditional from './AddConditional';
import ConditionalSelect from './ConditionalSelect';

const ConditionalCssSettings = () => {
  const [options, , setOptions, linkOptionState] = useLinkState();

  const [conditionalCss, setConditionalCss] = useState(false);

  const getOption = option => options[option];

  const { data, error } = useSWR('settings', getSettings);
  const {
    data: conditionalCssData,
    error: conditionalCssError,
    revalidate
  } = useSWR('conditionalcss', query => {
    return getJSON(query);
  });

  console.log(conditionalCssData);

  /*
  const conditionalCssData2 = {
    conditionalValues: {
      'filename1.css': {
        css: 'inlinecss1',
        conditions: 'condition values',
        config: {
          name: 'test1',
          weight: 1,
          file: 'path/to/filename1.css',
          t: 12345,
          appendToAny: false,
          prependToAny: false,
          weight: false
        }
      },
      'filename2.css': {
        css: 'inlinecss2',
        conditions: 'condition values',
        config: {
          name: 'test2',
          weight: 2,
          file: 'path/to/filename2.css',
          t: 67890,
          appendToAny: false,
          prependToAny: false,
          weight: false
        }
      }
    }
  };
  */

  const [showAddConditional, setShowAddConditional] = useState(false);

  if (error || conditionalCssError) {
    return (
      <div>
        {sprintf(__('Error: %s', 'abtfr'), error ? error : conditionalCssError)}
      </div>
    );
  }

  const loading = <div>{__('Loading...', 'abtfr')}</div>;

  if (!data || !conditionalCssData) {
    return loading;
  }

  if (!options) {
    setOptions(data);
    return loading;
  }

  if (conditionalCss === false) {
    setConditionalCss(conditionalCssData);
    return loading;
  }

  return (
    <>
      <li>
        <h3
          style={{
            padding: '0px',
            margin: '0px',
            marginTop: '1em',
            marginBottom: '10px'
          }}
        >
          {__('Conditional Critical Path CSS', 'abtfr')}
        </h3>
        <p className="description" style={{ marginBottom: '0px' }}>
          {__(
            'Configure tailored critical path CSS for individual posts, pages, post types, categories or templates.',
            'abtfr'
          )}
        </p>
        <p style={{ marginTop: '1em', marginBottom: '1em' }}>
          <button
            type="button"
            id="addcriticalcss"
            className="button"
            style={{ marginRight: '0.5em' }}
            onClick={() => setShowAddConditional(!showAddConditional)}
          >
            {__('Add Conditional Critical CSS', 'abtfr')}
          </button>
        </p>
        {showAddConditional && (
          <AddConditional
            revalidate={revalidate}
            conditionalOptions={conditionalCssData.conditionalOptions}
          />
        )}
      </li>
      {Object.entries(conditionalCss.conditionalValues).map(([file, data]) => (
        <CriticalCssEditor
          key={file}
          className="edit-conditional-critical-css"
          link={{
            value: data.css,
            set: value =>
              setConditionalCss({
                ...conditionalCss,
                conditionalValues: {
                  ...conditionalCss.conditionalValues,
                  ...{ [file]: { ...data, ...{ css: value } } }
                }
              })
          }}
          itemTitle="TODO"
          title={data.config.name}
          name={`abtfr[conditional_css][${file}][css]`}
          advancedEditor={getOption('csseditor')}
          config={data.config}
        >
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                name={`abtfr[conditional_css][${file}][appendToAny]`}
                header={__('Append to any', 'abtfr')}
                link={{
                  value: data.config.appendToAny || false,
                  set: value =>
                    setConditionalCss({
                      ...conditionalCss,
                      conditionalValues: {
                        ...conditionalCss.conditionalValues,
                        ...{
                          [file]: {
                            ...data,
                            ...{
                              config: {
                                ...data.config,
                                ...{ appendToAny: value }
                              }
                            }
                          }
                        }
                      }
                    })
                }}
                label={__('Enabled', 'abtfr')}
              />
              <SettingCheckbox
                name={`abtfr[conditional_css][${file}][prependToAny]`}
                header={__('Prepend to any', 'abtfr')}
                link={{
                  value: data.config.prependToAny || false,
                  set: value =>
                    setConditionalCss({
                      ...conditionalCss,
                      conditionalValues: {
                        ...conditionalCss.conditionalValues,
                        ...{
                          [file]: {
                            ...data,
                            ...{
                              config: {
                                ...data.config,
                                ...{ prependToAny: value }
                              }
                            }
                          }
                        }
                      }
                    })
                }}
                label={__('Enabled', 'abtfr')}
              />
            </tbody>
          </table>
          <ConditionalSelect
            name={`abtfr[conditional_css][${file}][conditions]`}
            conditionalOptions={conditionalCssData.conditionalOptions}
            link={{
              value: data.conditions,
              set: value =>
                setConditionalCss({
                  ...conditionalCss,
                  conditionalValues: {
                    ...conditionalCss.conditionalValues,
                    ...{ [file]: { ...data, ...{ conditions: value } } }
                  }
                })
            }}
          />
          <div style={{ marginTop: '5px', marginBottom: '0px' }}>
            The configuration is stored in{' '}
            <code>
              {conditionalCssData.conditionalPath.replace(homeUrl, '')}
              <strong>{file}</strong>
            </code>{' '}
            and is editable via FTP.
            <p style={{ marginTop: '7px', marginBottom: '0px' }}>
              You can append or prepend relative links to CSS files using{' '}
              <code>@append</code> and <code>@prepend</code>, e.g.{' '}
              <em>../../style.css</em>. Use <code>@matchType</code> (any or all)
              to match any or all condtions.
            </p>
          </div>
          <div
            style={{
              height: '10px',
              clear: 'both',
              overflow: 'hidden',
              fontSize: '1px'
            }}
          >
            &nbsp;
          </div>
          <SubmitButton type={['primary', 'large']} name="is_submit">
            {__('Save', 'abtfr')}
          </SubmitButton>
        </CriticalCssEditor>
      ))}
    </>
  );
};

export default ConditionalCssSettings;
