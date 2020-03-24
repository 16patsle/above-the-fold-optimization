import { useState } from 'react';

/**
 * Callback to change a single option value
 * @callback LSSetOptionCallback
 * @param {String} optionName - The option name
 * @param {Object} newVal - The new value
 * @returns {void}
 */

/**
 * Callback to change the value of all options
 * @callback LSSetOptionsCallback
 * @param {Object} newVal - The new value
 * @returns {void}
 */

/**
 * Callback to get a single option value
 * @callback LSGetOptionCallback
 * @param {String} optionName - The option name
 * @returns {Object} The option value
 */

/**
 * Hook for connecting state to input elements with LinkState
 * @returns {[Object, LSSetOptionCallback, LSSetOptionsCallback, LinkState, LSGetOptionCallback]}
 */
export default function useLinkState() {
  const [options, setOptions] = useState();
  const getOption = option => {
    if (!options || options[option] === undefined) {
      return false;
    }
    return options[option];
  };
  const setOption = (option, value) =>
    setOptions({ ...options, [option]: value });
  const linkState = attr => ({
    value: getOption(attr),
    set(x) {
      setOption(attr, x);
    }
  });

  return [options, setOption, setOptions, linkState, getOption];
}
