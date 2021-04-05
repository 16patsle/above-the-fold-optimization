import postcss from 'postcss';
import cssnano from 'cssnano';

onmessage = async ({ data }) =>
  postMessage(
    (await postcss([cssnano({ preset: 'default' })]).process(data, {
      from: undefined
    })).css
  );
