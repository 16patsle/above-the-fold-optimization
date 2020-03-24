/**
 * sizeFormat, ported from util.php
 * https://github.com/brandonwamboldt/utilphp/blob/master/src/utilphp/util.php
 *
 * Copyright (c) 2013 Brandon Wamboldt
 * Copyright (c) 2020 Patrick Sletvold
 * @license MIT Licensed
 */

/**
 * Format a number of bytes into human readable text
 * @param {number} bytes The number in bytes to format
 * @param {number} [decimals=0] The number of decimal points to include
 * @returns {String} Formatted display of number of bytes
 */
export default function sizeFormat(bytes, decimals = 0) {
  const formatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: decimals
  });

  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < Math.pow(1024, 2)) {
    return formatter.format(bytes / 1024, decimals) + ' KiB';
  } else if (bytes < Math.pow(1024, 3)) {
    return formatter.format(bytes / Math.pow(1024, 2), decimals) + ' MiB';
  } else if (bytes < Math.pow(1024, 4)) {
    return formatter.format(bytes / Math.pow(1024, 3), decimals) + ' GiB';
  } else if (bytes < Math.pow(1024, 5)) {
    return formatter.format(bytes / Math.pow(1024, 4), decimals) + ' TiB';
  } else if (bytes < Math.pow(1024, 6)) {
    return formatter.format(bytes / Math.pow(1024, 5), decimals) + ' PiB';
  } else {
    return formatter.format(bytes / Math.pow(1024, 5), decimals) + ' PiB';
  }
}
