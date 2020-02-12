import { useState } from 'react';

export default function useLinkState(defaultOptions) {
  const [options, setOptions] = useState(defaultOptions);
  const setOption = (option, value) =>
    setOptions({ ...options, [option]: value });
  const linkState = attr => ({
    value: options[attr],
    set(x) {
      setOption(attr, x);
    }
  });

  return [options, setOption, setOptions, linkState];
}
