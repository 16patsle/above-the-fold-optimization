const workers = {};

export default async function cssWorker(css, worker) {
  if (!workers[worker]) {
    if (worker === 'format') {
      workers[worker] = new (await import(
        `worker-loader!./FormatWorker`
      )).default();
    } else if (worker === 'minify') {
      workers[worker] = new (await import(
        `worker-loader!./MinifyWorker`
      )).default();
    }
  }

  workers[worker].postMessage(css);

  return new Promise(
    resolve => (
      workers[worker].addEventListener('message', ({ data }) => resolve(data)),
      { once: true }
    )
  );
}
