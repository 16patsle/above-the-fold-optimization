/**
 * Return string with array values separated with newline
 * @param {(String|Number)[]} array - The array of strings
 * */
export default function newlineArrayString(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return '';
  }

  return array.join('\n');
}
