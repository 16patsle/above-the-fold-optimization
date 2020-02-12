/**
 * Get the value of an option from the state object. Value of this must be bound to React component.
 * @param {Object} a - Options state. For class components, treat this as b and so on.
 * @param {String} [b] - The option name, if no prefix is used, otherwise it's the prefix
 * @param {String} [c] - The option name if a prefix is used, otherwise not necessary
 * @returns {Object} The value of the option requested.
 * */
export function getOption(a, b, c) {
  let optionsGetter;

  // a is array with options and option setter
  if (typeof a === 'object') {
    optionsGetter = a;
    a = b;
    b = c;
  }

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

  if (optionsGetter) {
    return optionsGetter[option];
  } else {
    return this.state.options[option];
  }
}

/**
 * Set the value of an option in the state object. Value of this must be bound to React component.
 * @param {Array} a - Array with options and option setter. For class components, treat this as b and so on.
 * @param {String} b - The option name, if no prefix is used, otherwise it's the prefix
 * @param {String} [c] - The option name if a prefix is used, otherwise it's the value
 * @param {String} [d] - The value if a prefix is used, otherwise not necessary
 * */
export function setOption(a, b, c, d) {
  let optionsGetter;
  let optionsSetter

  // a is array with options and option setter
  if (Array.isArray(a)) {
    optionsGetter = a[0]
    optionsSetter = a[1]
    a = b;
    b = c;
    c = d;
  }

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

  if (optionsGetter && optionsSetter) {
    const options = { ...optionsGetter };
    options[option] = value;
    optionsSetter({ options });
    this.setState({ options });
  } else {
    const options = { ...this.state.options };
    options[option] = value;
    this.setState({ options });
  }
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
