import useSWR from 'swr';
import useLinkState from './useLinkState';
import getSettings from './getSettings';

export function useJSON(identifier, callback) {
  const [options, setOption, setOptions, linkOptionState, getOption] = useLinkState();
  const { data, ...swr } = useSWR(identifier, callback);
  let shouldRender = true;

  if (data && !options) {
    setOptions(data);
    shouldRender = false;
  }

  return {options: options || {}, setOption, setOptions, linkOptionState, getOption, shouldRender, ...swr};
}

export default function useSettings() {
  return useJSON('settings', getSettings)
}
