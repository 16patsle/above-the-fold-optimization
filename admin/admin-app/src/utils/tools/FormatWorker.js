import prettier from 'prettier/esm/standalone';
import postcss from 'prettier/esm/parser-postcss';

onmessage = ({ data }) =>
  postMessage(
    prettier.format(data, {
      parser: 'css',
      plugins: [postcss]
    })
  );
