import { useState } from 'react';

/**
 * Helper to link component state with input values. Value of this must be bound to React component.
 * https://medium.com/@gaperton/managing-state-and-forms-with-react-part-1-12eacb647112
 * @param {String} attr - State property to link to input
 * @returns {Object} Object with a value property for reading value, and a set method to set state.
 */
export function linkState(attr) {
  const component = this;
  return {
    value: component.state[attr],
    set(x) {
      component.setState({ [attr]: x });
    }
  };
}

/**
 * Helper to link component state with input values. Variant of linkState that binds to a property of state.options. Value of this must be bound to React component.
 * https://medium.com/@gaperton/managing-state-and-forms-with-react-part-1-12eacb647112
 * @param {String} attr - State property to link to input
 * @returns {Object} Object with a value property for reading value, and a set method to set state.
 */
export function linkOptionState(attr) {
  const component = this;
  return {
    value: component.state.options[attr],
    set(x) {
      const options = { ...component.state.options };
      options[attr] = x;
      component.setState({ options });
    }
  };
}

/**
 * Helper to link component state with input values. Variant of linkOptionState used to functional React components with useState.
 * https://medium.com/@gaperton/managing-state-and-forms-with-react-part-1-12eacb647112
 * @param {Function} getOption - Function to get option
 * @param {Function} setOption - Function used to set the option
 * @param {String} attr - State property to link to input
 * @returns {Object} Object with a value property for reading value, and a set method to set state.
 */
export function linkOptionUseState(getOption, setOption, attr) {
  return {
    value: getOption(attr),
    set(x) {
      setOption(attr, x);
    }
  };
}

export function useLinkState(defaultOptions) {
  const [options, setOptions] = useState(defaultOptions);
  const setOption = (option, value) => setOptions({ ...options, [option]: value })
  
  return [options, setOption, setOptions];
}
