import useSWR from 'swr';
import useLinkState from './useLinkState';

export default function useSettings(identifier, callback) {
  const [options, setOption, setOptions, linkOptionState, getOption] = useLinkState();
  const { data, ...swr } = useSWR(identifier, callback);
  let shouldRender = true;

  if (data && !options) {
    setOptions(data);
    shouldRender = false;
  }

  return {options: options || {}, setOption, setOptions, linkOptionState, getOption, shouldRender, ...swr};
}
