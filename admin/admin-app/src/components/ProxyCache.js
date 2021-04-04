import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import useSWR from 'swr';
import { getJSON } from '../utils/getSettings';
import { homeUrl, abtfrRestNonce } from '../utils/globalVars';
import Loading from '../components/Loading';

const ProxyCache = () => {
  const {
    data: cacheStats,
    error: cacheStatsError,
    revalidate: updateCacheStats
  } = useSWR('proxycache', async query => await getJSON(query));

  const handleEmptyCache = async () => {
    if (
      window.confirm(
        __('Are you sure you want to empty the cache directory?', 'abtfr')
      )
    ) {
      const result = await fetch(`${homeUrl}/wp-json/abtfr/v1/proxycache`, {
        method: 'DELETE',
        headers: {
          'X-WP-Nonce': abtfrRestNonce
        }
      });

      if ((await result.json()) === true) {
        updateCacheStats();
        alert(__('The proxy cache directory has been emptied.', 'abtfr'));
        return;
      } else {
        alert(__('Could not empty cache.', 'abtfr'));
      }
    }
  };

  return (
    <>
      <h3 style={{ margin: 0, padding: 0 }} id="stats">
        {__('Cache Stats', 'abtfr')}
      </h3>
      {cacheStatsError && (
        <div>{sprintf(__('Error: %s', 'abtfr'), cacheStatsError)}</div>
      )}
      {!cacheStats && !cacheStatsError ? (
        <div>
          <Loading />
        </div>
      ) : (
        <table>
          <tbody>
            <tr>
              <td
                align="right"
                width={70}
                style={{ textAlign: 'right', fontSize: 14 }}
              >
                {__('Files:', 'abtfr')}
              </td>
              <td style={{ fontSize: 14 }}>{cacheStats.files}</td>
            </tr>
            <tr>
              <td
                align="right"
                width={70}
                style={{ textAlign: 'right', fontSize: 14 }}
              >
                {__('Size:', 'abtfr')}
              </td>
              <td style={{ fontSize: 14 }}>{cacheStats.size}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} style={{ padding: 0, margin: 0, fontSize: 11 }}>
                <p style={{ padding: 0, margin: 0, fontSize: 11 }}>
                  {sprintf(
                    __('Stats last updated: %s', 'abtfr'),
                    new Date(cacheStats.date).toLocaleString()
                  )}
                </p>
                <hr />
                <Button isSecondary isSmall onClick={updateCacheStats}>
                  {__('Refresh Stats', 'abtfr')}
                </Button>
                <Button isSecondary isSmall onClick={handleEmptyCache}>
                  {__('Empty Cache', 'abtfr')}
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default ProxyCache;
