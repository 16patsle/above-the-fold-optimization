import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Modal, Flex, FlexItem, Notice } from '@wordpress/components';
import useSettings, { useJSON } from '../../utils/useSettings';
import { homeUrl, abtfrRestNonce } from '../../utils/globalVars';
import { getJSON } from '../../utils/getSettings';
import LoadingWrapper from '../LoadingWrapper';
import SettingCheckbox from '../SettingCheckbox';
import SubmitButton from '../SubmitButton';
import CriticalCssEditor from './CriticalCssEditor';
import AddConditional from './AddConditional';
import ConditionalSelect from './ConditionalSelect';
import Loading from '../Loading';

const ConditionalCssSettings = () => {
  const { getOption, shouldRender, error } = useSettings();
  const {
    options: conditionalCss,
    setOptions: setConditionalCss,
    shouldRender: shouldRenderConditional,
    error: conditionalCssError
  } = useJSON('conditionalcss', query => {
    return getJSON(query);
  });

  const [showAddConditional, setShowAddConditional] = useState(false);

  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [deleteFilename, setDeleteFilename] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = async filename => {
    openModal();
    setDeleteFilename(filename);
  };

  const doDelete = async () => {
    const conditionalCssOld = conditionalCss;

    setConditionalCss({
      ...conditionalCss,
      conditionalValues: Object.fromEntries(
        Object.entries(conditionalCss.conditionalValues).filter(([key]) => {
          return key !== deleteFilename;
        })
      )
    });

    setDeleting(true);

    const result = await fetch(
      `${homeUrl}/wp-json/abtfr/v1/conditionalcss/${deleteFilename}`,
      {
        method: 'DELETE',
        headers: {
          'X-WP-Nonce': abtfrRestNonce
        }
      }
    );

    if ((await result.json()) !== true) {
      setConditionalCss(conditionalCssOld);
    }

    closeModal();
    setDeleting(false);
  };

  const handleAdd = async (name, conditions) => {
    const conditionalCssOld = conditionalCss;

    const filename =
      name
        .toLowerCase()
        .replace(/\s+/is, '-')
        .replace(/[^a-z0-9-]+/is, '')
        .trim() + '.css';

    setConditionalCss({
      ...conditionalCss,
      conditionalValues: {
        ...conditionalCss.conditionalValues,
        [filename]: {
          css: '',
          conditions,
          config: {
            weight: 1,
            name
          }
        }
      }
    });

    const formData = new FormData();

    formData.append('name', name);
    formData.append('conditions', conditions);

    const result = await fetch(homeUrl + '/wp-json/abtfr/v1/conditionalcss', {
      method: 'POST',
      body: formData,
      headers: {
        'X-WP-Nonce': abtfrRestNonce
      }
    });

    const json = await result.json();
    if (json === true) {
      setShowAddConditional(false);
      // stop changing state in add conditional (isLoading to false)
      return;
    } else {
      setConditionalCss(conditionalCssOld);
      return json;
    }
  };

  return (
    <LoadingWrapper
      shouldRender={!(!shouldRender || !shouldRenderConditional)}
      error={error || conditionalCssError}
    >
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
          <Button
            isSecondary
            style={{ marginRight: '0.5em' }}
            onClick={() => setShowAddConditional(!showAddConditional)}
          >
            {__('Add Conditional Critical CSS', 'abtfr')}
          </Button>
        </p>
        {showAddConditional && (
          <AddConditional
            onAddClick={handleAdd}
            conditionalOptions={conditionalCss.conditionalOptions}
          />
        )}
      </li>
      {conditionalCss.conditionalValues ? (
        Object.entries(conditionalCss.conditionalValues).map(([file, data]) => (
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
            onDeleteClick={handleDelete.bind(this, file)}
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
                />
              </tbody>
            </table>
            <ConditionalSelect
              name={`abtfr[conditional_css][${file}][conditions]`}
              conditionalOptionValues={conditionalCss.conditionalOptions[0]}
              conditionalOptionGroups={conditionalCss.conditionalOptions[1]}
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
                {conditionalCss.conditionalPath.replace(homeUrl, '')}
                <strong>{file}</strong>
              </code>{' '}
              and is editable via FTP.
              <p style={{ marginTop: '7px', marginBottom: '0px' }}>
                You can append or prepend relative links to CSS files using{' '}
                <code>@append</code> and <code>@prepend</code>, e.g.{' '}
                <em>../../style.css</em>. Use <code>@matchType</code> (any or
                all) to match any or all condtions.
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
            <SubmitButton />
          </CriticalCssEditor>
        ))
      ) : (
        <Loading />
      )}
      {isOpen && (
        <Modal
          title={__('Delete conditional CSS?', 'abtfr')}
          closeLabel={__('Close')}
          onRequestClose={closeModal}
        >
          <p>
            {__(
              'Are you sure you want to delete this conditional Critical CSS?',
              'abtfr'
            )}
          </p>
          <Flex justify="flex-end">
            <FlexItem>
              <Button isSecondary onClick={closeModal}>
                {__('Cancel')}
              </Button>
            </FlexItem>
            <FlexItem>
              <Button isPrimary onClick={doDelete} isBusy={isDeleting}>
                {__('Delete', 'abtfr')}
              </Button>
            </FlexItem>
          </Flex>
        </Modal>
      )}
    </LoadingWrapper>
  );
};

export default ConditionalCssSettings;
