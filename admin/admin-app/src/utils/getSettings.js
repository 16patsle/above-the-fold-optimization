import { abtfRestNonce } from './globalVars';
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
 * Get settings JSON from REST API
 *
 * @returns {Object} The settings
 */
export default async function getSettings() {
  const response = await fetch('/wp-json/abtf/v1/settings', {
    headers: {
      'X-WP-Nonce': abtfRestNonce
    }
  });
  const result = await response.json();
  if (!response.ok) {
    if (result.message) {
      return Promise.reject(result.message);
    } else {
      return Promise.reject(`${response.status} ${response.statusText}`);
    }
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
