export default async function formatCss(css) {
  const FormatWorker = (await import('worker-loader!./FormatWorker')).default;

  const worker = new FormatWorker();

  worker.postMessage(css);

  return new Promise(
    resolve => (worker.onmessage = ({ data }) => resolve(data))
  );
}
