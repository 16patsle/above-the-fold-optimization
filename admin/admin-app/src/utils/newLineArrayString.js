/**
 * Return string with array values separated with newline
 * @param {Array} - The array of strings
 * */
function newlineArrayString(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return '';
  }

  return array.join('\n');
}

export default newlineArrayString;
