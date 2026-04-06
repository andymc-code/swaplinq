import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const SplineScene = ({ scene }) => {
  return (
    <div className="spline-wrapper">
      <Suspense fallback={<div className="spline-loading">Loading 3D Experience...</div>}>
        <Spline scene={scene} />
      </Suspense>
    </div>
  );
};

export default SplineScene;
