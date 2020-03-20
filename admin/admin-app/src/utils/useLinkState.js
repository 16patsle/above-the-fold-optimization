import { useState } from 'react';

export default function useLinkState() {
  const [options, setOptions] = useState();
  const getOption = option => {
    if (!options || options[option] === undefined) {
      return false;
    }
    return options[option];
  };
  const setOption = (option, value) =>
    setOptions({ ...options, [option]: value });
  const linkState = attr => ({
    value: getOption(attr),
    set(x) {
      setOption(attr, x);
    }
  });

  return [options, setOption, setOptions, linkState, getOption];
}
