import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { adminUrl } from '../../utils/globalVars';
import ConditionalSelect from './ConditionalSelect';

const AddConditional = props => {
  const [name, setName] = useState('');
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(false);

  const nameRef = React.createRef();

  const handleClick = async () => {
    if (name === '') {
      alert(__('Enter a name (admin reference)...', 'abtfr'));
      nameRef.focus();
      return;
    }

    if (!/^[a-zA-Z0-9\-\_ ]+$/.test(name)) {
      alert(__('The name contains invalid characters.', 'abtfr'));
      nameRef.focus();
      return;
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('conditions', conditions);
    formData.append('_wpnonce', document.querySelector('#_wpnonce').value);

    setLoading(true);

    await fetch(adminUrl + 'admin-post.php?action=abtfr_add_ccss', {
      method: 'POST',
      body: formData
    });

    setLoading(false);

    if (props.revalidate) {
      props.revalidate();
    }
  };

  return (
    <div
      className="edit-conditional-critical-css"
      style={{
        background: '#f1f1f1',
        border: 'solid 1px #e5e5e5',
        marginBottom: '1em'
      }}
    >
      <h3 className="hndle" style={{ borderBottom: 'solid 1px #e5e5e5' }}>
        <span>{__('Add Conditional Critical CSS', 'abtfr')}</span>
      </h3>
      <div className="inside" style={{ paddingBottom: '0px' }}>
        <table className="form-table add-form" style={{ marginBottom: '5px' }}>
          <tbody>
            <tr valign="top">
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  style={{ width: '100%' }}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  ref={nameRef}
                />
              </td>
            </tr>
            <tr valign="top">
              <td>
                <ConditionalSelect
                  conditionalOptions={props.conditionalOptions}
                  link={{ value: conditions, set: setConditions }}
                />
                <p className="description">
                  Type <code>filter:your_filter_function</code> to add a custom
                  filter condition. You can add a comma separated list with JSON
                  encoded values to be passed to the filter by appending{' '}
                  <code>:1,2,3,"variable","var"</code>. The filter function
                  should return true or false.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          className="button button-small"
          onClick={handleClick}
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
          {loading && 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default AddConditional;
