import { abtfRestNonce } from './globalVars';

/**
 * Get settings JSON from REST API
 *
 * @returns {Object} The settings
 */
export default async function getSettings() {
  const response = await fetch('/wp-json/abtf/v1/settings' + url, {
    headers: {
      'X-WP-Nonce': abtfRestNonce
    }
  });
  return await response.json();
}
