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
