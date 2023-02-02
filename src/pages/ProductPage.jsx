import React, { useEffect, useState } from 'react';
import { assets } from '../assets';
import ProductDetailed from '../components/UI/ProductDetailed';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/APIs';
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    getProduct(id).then((res) => {
      setProduct(res.data.data);
    });
  }, [id]);
  const dataToSend = {
    pName: 'Zerox Brand Shirt',
    pImages: [assets.bg_01, assets.bg_02],
    pDescription: ['test'],
    pID: 'test',
    pPrice: `789`,
    pTags: 'test',
  };
  return (
    <div>
      <ProductDetailed
        price={product.price ? product.price : 0}
        name={product.name ? product.name : ''}
        description={product.descriptions ? product.descriptions : []}
        images={product.images ? product.images : []}
        brand={product.brand ? product.brand : ''}
        sizes={product.variants ? product.variants : []}
        productId={product._id ? product._id : ''}
        reviews={product.reviews ? product.reviews : []}
      />
    </div>
  );
};

export default ProductPage;
