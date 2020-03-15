import React, { useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../../utils/useLinkState';
import { adminUrl, lgCode, utmString } from '../../utils/globalVars';
import Info from '../Info';
import SettingCheckbox from '../SettingCheckbox';
import SubmitButton from '../SubmitButton';
import CssEditor from '../CssEditor';
import getSettings, { getJSON } from '../../utils/getSettings';
import CriticalCssEditor from './CriticalCssEditor';

const ConditionalCssSettings = () => {
  const [options, , setOptions, linkOptionState] = useLinkState();

  const [conditionalCss, setConditionalCss] = useState(false);

  const getOption = option => options[option];

  const { data, error } = useSWR('settings', getSettings);
  const { data: conditionalCssData2, error: conditionalCssError } = useSWR(
    'conditionalcss',
    query => {
      return getJSON(query);
    }
  );

  const conditionalCssData = {
    filename1: {
      css: 'inlinecss1',
      conditions: 'condition values',
      config: {
        name: 'test1',
        appendToAny: false,
        prependToAny: false,
        weight: false
      }
    },
    filename2: {
      css: 'inlinecss2',
      conditions: 'condition values',
      config: {
        name: 'test2',
        appendToAny: false,
        prependToAny: false,
        weight: false
      }
    }
  };

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
          >
            {__('Add Conditional Critical CSS', 'abtfr')}
          </button>
        </p>
        <div
          id="addcriticalcss-form"
          className="edit-conditional-critical-css"
          style={{
            background: '#f1f1f1',
            border: 'solid 1px #e5e5e5',
            marginBottom: '1em',
            display: 'none'
          }}
        >
          <h3 className="hndle" style={{ borderBottom: 'solid 1px #e5e5e5' }}>
            <span>{__('Add Conditional Critical CSS', 'abtfr')}</span>
          </h3>
          <div className="inside" style={{ paddingBottom: '0px' }}>
            <table
              className="form-table add-form"
              style={{ marginBottom: '5px' }}
            >
              <tbody>
                <tr valign="top">
                  <td>
                    <input
                      type="text"
                      id="addcc_name"
                      defaultValue
                      placeholder="Name"
                      style={{ width: '100%' }}
                    />
                    {/*name*/}
                  </td>
                </tr>
                <tr valign="top">
                  <td>
                    <input type="text" id="addcc_conditions" rel="selectize" />
                    <p className="description">
                      Type <code>filter:your_filter_function</code> to add a
                      custom filter condition. You can add a comma separated
                      list with JSON encoded values to be passed to the filter
                      by appending <code>:1,2,3,"variable","var"</code>. The
                      filter function should return true or false.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className="button button-yellow button-small"
              id="addcc_save"
            >
              {__('Save', 'abtfr')}
            </button>
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
          </div>
        </div>
      </li>
      {Object.entries(conditionalCss).map(([file, data]) => (
        <CriticalCssEditor
          key={file}
          link={{
            value: data.css,
            set: value =>
              setConditionalCss({
                ...conditionalCss,
                ...{ [file]: { ...data, ...{ css: value } } }
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
                  value: data.config.appendToAny,
                  set: value =>
                    setConditionalCss({
                      ...conditionalCss,
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
                    })
                }}
                label={__('Enabled', 'abtfr')}
              />
              <SettingCheckbox
                name={`abtfr[conditional_css][${file}][prependToAny]`}
                header={__('Prepend to any', 'abtfr')}
                link={{
                  value: data.config.prependToAny,
                  set: value =>
                    setConditionalCss({
                      ...conditionalCss,
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
                    })
                }}
                label={__('Enabled', 'abtfr')}
              />
            </tbody>
          </table>
          <SubmitButton type={['primary', 'large']} name="is_submit">
            {__('Save', 'abtfr')}
          </SubmitButton>
        </CriticalCssEditor>
      ))}
    </>
  );
};

export default ConditionalCssSettings;
