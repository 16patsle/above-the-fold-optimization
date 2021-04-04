import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'debounce-promise';
import checkPropLinkState from '../../utils/checkPropLinkState';
import searchPagesConditional from '../../utils/searchPagesConditional';
import './ConditionalSelect.css';

const promiseOptions = debounce(query => searchPagesConditional(query, 10), 400);

const noOptionsMessage = ({ inputValue }) => {
  if (inputValue) {
    return __('No results found', 'abtfr');
  } else {
    return __('Start writing to see options', 'abtfr');
  }
};

const formatGroupLabel = data => {
  return <div className={'optgroup ' + data.class}>{data.label}</div>;
};

const ConditionalSelect = props => {
  const groupOptions = Object.entries(props.conditionalOptionGroups).map(
    ([key, value]) => {
      const options = props.conditionalOptionValues.filter(value => {
        return value.optgroup === key;
      });
      return { ...value, ...{ options } };
    }
  );

  const formatOptionLabel = (data, { context }) => {
    if (context === 'menu') {
      return (
        <div className="opt">
          <span className="label">
            <span className="name">
              {data.labellong ? data.labellong : data.label}
            </span>
            <span className="desc">&nbsp;&nbsp;{data.value}</span>
          </span>
        </div>
      );
    } else if (context === 'value') {
      let label = data.label;
      let className = data.class;

      // Try finding a good label/class if it's missing
      if (!data.class) {
        const [type, id] = data.value.split(':');

        let typeObject = props.conditionalOptionValues.find(
          ({ value }) => value === data.value
        );
        if (typeObject) {
          label = typeObject.label;
          className = typeObject.class;
        } else {
          typeObject = props.conditionalOptionValues.find(
            ({ value }) =>
              value.split(':').length > 1 && value.split(':')[0] === type
          );
          if (id) {
            if (typeObject) {
              const split = typeObject.value.split(':');
              label = split[0] + ': ' + id;
              className = typeObject.class;
            } else {
              label = id.replace('is_single()', 'Post: ');
              className = 'post';
            }
          } else {
            label = data.value;
            className = 'post';
          }
        }
      }
      return (
        <div
          className={'optvalue ' + className}
          title={data.value + (data.labellong ? ' - ' + data.labellong : '')}
        >
          <span className="name">{label}</span>
        </div>
      );
    }
  };

  return (
    <AsyncCreatableSelect
      className="conditional-select"
      name={props.name}
      loadOptions={promiseOptions}
      defaultOptions={groupOptions}
      placeholder={__(
        'Select one or more conditions. Type the name of a page or post to search (autocomplete)...',
        'abtfr'
      )}
      value={props.link.value}
      onChange={(inputValue, { action }) => {
        if (action === 'select-option' || action === 'remove-value') {
          props.link.set(inputValue);
        } else if (action === 'clear') {
          props.link.set([]);
        }
      }}
      isValidNewOption={inputValue => {
        // email@address.com
        const regex = new RegExp('^filter:([a-z0-9-_]+(:.*)?)?$', 'i');
        if (regex.test(inputValue)) return true;

        return false;
      }}
      onCreateOption={inputValue => {
        if (new RegExp('^filter:[a-z0-9-_]+(:.*)?$', 'i').test(inputValue)) {
          props.link.set([
            ...props.link.value,
            {
              label: inputValue,
              value: inputValue,
              optgroup: 'filter',
              class: 'filter'
            }
          ]);
        }
      }}
      isClearable
      isMulti
      noOptionsMessage={noOptionsMessage}
      hideSelectedOptions
      delimiter="|==abtfr==|"
      formatGroupLabel={formatGroupLabel}
      formatOptionLabel={formatOptionLabel}
    />
  );
};

ConditionalSelect.propTypes = {
  conditionalOptionValues: PropTypes.arrayOf(
    PropTypes.shape({
      class: PropTypes.string,
      label: PropTypes.string,
      optgroup: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  conditionalOptionGroups: PropTypes.objectOf(
    PropTypes.shape({
      class: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  name: PropTypes.string,
  link: checkPropLinkState
};

export default ConditionalSelect;
