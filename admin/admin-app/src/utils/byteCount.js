/**
 * Counts the number of bytes a string would have in UTF-8
 * @see https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string
 * @param {String} s String to count bytes for
 * @returns {integer} The number of bytes
 */
export default function byteCount(s) {
  return encodeURI(s).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
}
