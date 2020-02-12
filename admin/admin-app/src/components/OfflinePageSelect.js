import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';

const promiseOptions = async query => {
  const formData = new FormData();
  formData.append('action', 'abtf_page_search');
  formData.append('query', query);
  formData.append('maxresults', 10);

  const res = await (await fetch(window.ajaxurl, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  })).json();

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
    return 'No results found';
  } else {
    return 'Start writing to see options';
  }
};

class OfflinePageSelect extends Component {
  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header || ' '}</th>
        <td>
          <AsyncSelect
            loadOptions={promiseOptions}
            style={this.props.style}
            className={this.props.textareaClass}
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.props.link.value}
            onChange={(inputValue, { action }) => {
              if (action === 'select-option') {
                this.props.link.set(inputValue);
              } else if (action === 'clear') {
                this.props.link.set({ label: '', value: '' });
              }
            }}
            isClearable
            noOptionsMessage={noOptionsMessage}
          />
          <p className="description">{this.props.description}</p>
          {this.props.children}
        </td>
      </tr>
    );
  }
}

export default OfflinePageSelect;
