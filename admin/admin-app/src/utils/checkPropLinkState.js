/**
 * Check if a prop is a valid LinkState
 * @param {Object} props Component props
 * @param {*} propName The name of the prop to check
 * @param {*} componentName The name of the component
 * @returns {Error|void} Returns an error if invalid
 */
export default function checkPropLinkState(props, propName, componentName) {
  const linkState = props[propName];
  if (
    !(
      linkState.hasOwnProperty('value') &&
      linkState.hasOwnProperty('set') &&
      typeof linkState.set == 'function'
    )
  ) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Validation failed.'
    );
  }
}
