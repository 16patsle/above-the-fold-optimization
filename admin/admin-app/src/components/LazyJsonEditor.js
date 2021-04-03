import React, { Suspense } from 'react';
import Loading from './Loading';

const JsonEditor = React.lazy(() => import('../components/JsonEditor'));

export default function LazyJsonEditor(props) {
  return (
    <Suspense fallback={<Loading />}>
      <JsonEditor {...props} />
    </Suspense>
  );
}
