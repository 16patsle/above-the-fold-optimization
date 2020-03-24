/**
 * Gets the value from an input element
 * @param {String} selector CSS selector to element to get value of
 * @param {String} [returnType] Type of object to expect, used for fallback value
 * @returns {String} The value of the element, or the fallback
 */
export default function(selector, returnType) {
  const returns = {
    object: '{}'
  };

  const el = document.querySelector(selector);
  if (el) {
    return el.value;
  } else {
    return returns[returnType] || '';
  }
}
