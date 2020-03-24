import useSWR from 'swr';
import useLinkState from './useLinkState';
import getSettings from './getSettings';

/**
 * Hook for using LinkState on data returned from an API
 * @param {String} identifier Identifier used for caching
 * @param {Function} callback Fetcher function used to get the data
 * @param {String} [datafield] Optional datafield to read from
 * @param {Object} [defaultValue={}] Optional fallback value
 */
export function useJSON(identifier, callback, datafield, defaultValue = {}) {
  const [
    options,
    setOption,
    setOptions,
    linkOptionState,
    getOption
  ] = useLinkState();
  const { data, ...swr } = useSWR(identifier, callback);
  /**
   * Is it safe to render?
   * @type {boolean}
   */
  let shouldRender = true;

  if (data && !options) {
    if (datafield) {
      setOptions(data[datafield]);
    } else {
      setOptions(data);
    }
    shouldRender = false;
  }

  return {
    options: options || defaultValue,
    setOption,
    setOptions,
    linkOptionState,
    getOption,
    shouldRender,
    ...swr
  };
}

/**
 * Hook for using LinkState on settings data
 */
export default function useSettings() {
  return useJSON('settings', getSettings);
}
