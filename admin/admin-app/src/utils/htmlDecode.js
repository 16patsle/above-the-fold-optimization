/**
 * Decode HTML entities in a string
 *
 * https://stackoverflow.com/a/4835406/4285005
 *
 * @param {String} text - The HTML string to decode
 * @returns {String} The decoded string
 */
export default function htmlDecode(text) {
  if (typeof text !== 'string') {
    return text;
  }
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'"
  };

  return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;)/g, function(m) {
    return map[m];
  });
}
