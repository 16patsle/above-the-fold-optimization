import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { __ } from '@wordpress/i18n';
import checkPropLinkState from '../utils/checkPropLinkState';

const promiseOptions = async query => {
  const formData = new FormData();
  formData.append('action', 'abtfr_page_search');
  formData.append('query', query);
  formData.append('maxresults', 10);

  const res = await (
    await fetch(window.ajaxurl, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })
  ).json();

  if (res && document.location.host) {
    var l = res.length;
    for (var i = 0; i < l; i++) {
      res[i].value = res[i].value.replace(
        document.location.protocol + '//' + document.location.host,
        ''
      );
    }
  }

  return res.map(({ name, value }) => ({ label: name, value }));
};

const noOptionsMessage = ({ inputValue }) => {
  if (inputValue) {
    return __('No results found', 'abtfr');
  } else {
    return __('Start writing to see options', 'abtfr');
  }
};

const PageSelect = props => {
  const [value, setValue] = useState();

  const select = (
    <AsyncSelect
      loadOptions={promiseOptions}
      style={props.style}
      className={props.textareaClass}
      name={props.name}
      placeholder={props.placeholder}
      value={props.link ? props.link.value : value}
      defaultOptions={props.defaultOptions}
      onChange={(inputValue, { action }) => {
        if (props.link) {
          if (action === 'select-option') {
            props.link.set(inputValue);
          } else if (action === 'clear') {
            props.link.set({ label: '', value: '' });
          }
        } else {
          if (action === 'select-option') {
            setValue(inputValue);
          } else if (action === 'clear') {
            setValue({ label: '', value: '' });
          }
        }
      }}
      isClearable
      noOptionsMessage={noOptionsMessage}
    />
  );

  if (props.wrapper === false) {
    return select;
  }

  return (
    <tr valign="top">
      <th scope="row">{props.header}</th>
      <td>
        {select}
        <p className="description">{props.description}</p>
        {props.children}
      </td>
    </tr>
  );
};

PageSelect.defaultOptions = {
  header: ' '
};

PageSelect.propTypes = {
  style: PropTypes.object,
  textareaClass: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  link: checkPropLinkState,
  defaultOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  wrapper: PropTypes.bool,
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  description: PropTypes.node,
  children: PropTypes.node
};

export default PageSelect;
