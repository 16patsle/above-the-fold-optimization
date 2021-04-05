export default async function minifyCss(css) {
  const MinifyWorker = (await import('worker-loader!./MinifyWorker')).default;

  const worker = new MinifyWorker();

  worker.postMessage(css);

  return new Promise(
    resolve => (worker.onmessage = ({ data }) => resolve(data))
  );
}
