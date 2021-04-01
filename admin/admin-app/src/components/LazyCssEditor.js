import React, { Suspense } from 'react';

const CssEditor = React.lazy(() => import('../components/CssEditor'));

export default function LazyCssEditor(props) {
    return (
      <Suspense fallback={
        <div>Loading...</div>
      }>
        <CssEditor {...props}/>
      </Suspense>
    )
}
