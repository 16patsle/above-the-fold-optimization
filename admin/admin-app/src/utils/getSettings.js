import { abtfRestNonce } from './globalVars';
import newlineArrayString from './newLineArrayString';

const shouldNewlineArrayString = ['pwaCachePagesInclude', 'pwaCachePreload'];

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

  Object.entries(result).forEach(([key, value]) => {
    if (shouldNewlineArrayString.includes(key)) {
      result[key] = newlineArrayString(value);
    }
  })

  result.pwaCachePagesOffline = {
    label: result.pwaCachePagesOfflineName,
    value: result.pwaCachePagesOffline
  }

  console.log(result);
  return result;
}
