import { abtfrRestNonce } from './globalVars';
import newlineArrayString from './newLineArrayString';

const shouldNewlineArrayString = [
  'htmlCommentsPreserve',
  'cssdeliveryIgnore',
  'cssdeliveryRemove',
  'jsdeliveryIgnore',
  'jsdeliveryRemove',
  'jsdeliveryAsync',
  'jsdeliveryAsyncDisabled',
  'jsdeliveryIdle',
  'gwfoGoogleFontsIgnore',
  'gwfoGoogleFontsRemove',
  'pwaCachePagesInclude',
  'pwaCachePreload',
  'jsProxyInclude',
  'jsProxyExclude',
  'jsProxyPreload',
  'cssProxyInclude',
  'cssProxyExclude',
  'cssProxyPreload'
];

/**
 * Fetch JSON from API
 * @param {String} url API URL to fetch
 * @returns {Object} The JSON
 */
export async function getJSON(url) {
  const response = await fetch('/wp-json/abtfr/v1/' + url, {
    headers: {
      'X-WP-Nonce': abtfrRestNonce
    }
  });
  const result = await response.json();
  if (!response.ok) {
    if (result.message) {
      return { _error: result.message };
    } else {
      return { _error: `${response.status} ${response.statusText}` };
    }
  }
  return result;
}

/**
 * Get settings JSON from REST API
 *
 * @returns {Object} The settings
 */
export default async function getSettings() {
  const result = await getJSON('settings');

  if (result._error) {
    return Promise.reject(result._error);
  }

  Object.entries(result).forEach(([key, value]) => {
    if (shouldNewlineArrayString.includes(key)) {
      result[key] = newlineArrayString(value);
    }
  });

  result.pwaCachePagesOffline = {
    label: result.pwaCachePagesOfflineName,
    value: result.pwaCachePagesOffline
  };

  console.log(result);
  return result;
}
