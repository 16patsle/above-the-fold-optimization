import React, { Suspense } from 'react';

const JsonEditor = React.lazy(() => import('../components/JsonEditor'));

export default function LazyJsonEditor(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JsonEditor {...props} />
    </Suspense>
  );
}
