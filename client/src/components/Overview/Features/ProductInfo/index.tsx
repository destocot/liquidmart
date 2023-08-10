import React from 'react';
import StarsAndReviews from './Subcomponents/StarsAndReviews';
import ProductIdentifiers from './Subcomponents/ProductIdentifiers';
import Sharing from './Subcomponents/Sharing';

function ProductInfo({product, reviews}) {
  return (
    <div>
      <StarsAndReviews reviews={reviews} />
      <ProductIdentifiers product={product} />
      <Sharing />
    </div>
  );
}

export default ProductInfo;
