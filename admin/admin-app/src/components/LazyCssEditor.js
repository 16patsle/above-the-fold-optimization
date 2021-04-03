import React, { Suspense } from 'react';
import Loading from './Loading';

const CssEditor = React.lazy(() => import('../components/CssEditor'));

export default function LazyCssEditor(props) {
  return (
    <Suspense fallback={<Loading />}>
      <CssEditor {...props} />
    </Suspense>
  );
}
