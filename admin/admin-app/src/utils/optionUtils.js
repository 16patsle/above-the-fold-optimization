/**
 * Get the value of an option from the state object. Value of this must be bound to React component.
 * @param {String} a - The option name, if no prefix is used, otherwise it's the prefix
 * @param {String} [b] - The option name if a prefix is used, otherwise not necessary
 * @returns {Object} The value of the option requested.
 * */
export function getOption(a, b) {
  let prefix = '';
  let option = a;

  // If both prefix and option is supplied, assign them properly.
  if (typeof b === 'string') {
    prefix = a;
    option = b;
  }

  if (prefix) {
    option = prefix + option[0].toUpperCase() + option.slice(1);
  }

  return this.state.options[option];
}

/**
 * Set the value of an option in the state object. Value of this must be bound to React component.
 * @param {String} a - The option name, if no prefix is used, otherwise it's the prefix
 * @param {String} b - The option name if a prefix is used, otherwise it's the value
 * @param {String} [c] - The value if a prefix is used, otherwise not necessary
 * */
export function setOption(a, b, c) {
  let prefix = '';
  let option = a;
  let value = b;

  // If both prefix and option is supplied, assign them properly.
  if (typeof b === 'string' && c !== undefined) {
    prefix = a;
    option = b;
    value = c;
  }

  if (prefix) {
    option = prefix + option[0].toUpperCase() + option.slice(1);
  }

  const options = { ...this.state.options };
  options[option] = value;
  this.setState({ options });
}

/**
 * Toggle the value of an option from the state object. Value of this must be bound to React component.
 * @param {String} a - The option name, if no prefix is used, otherwise it's the prefix
 * @param {String} [b] - The option name if a prefix is used, otherwise not necessary
 * */
export function toggleOption(a, b) {
  let prefix = '';
  let option = a;

  // If both prefix and option is supplied, assign them properly.
  if (typeof b === 'string') {
    prefix = a;
    option = b;
  }

  if (prefix) {
    option = prefix + option[0].toUpperCase() + option.slice(1);
  }

  const options = { ...this.state.options };
  options[option] = !options[option];
  this.setState({ options });
}
