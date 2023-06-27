import React, { useEffect, useState } from 'react';
import ProductDetailed from '../components/UI/ProductDetailed';
import { useLocation, useParams } from 'react-router-dom';
import { getProduct } from '../services/APIs';
import ProductPageSkelton from '../components/skeltons/ProductPageSkelton';
const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();
  useEffect(() => {
    if (!location.state) {
      //than fetch product from api
      getProduct(id)
        .then((res) => {
          setProduct(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    setProduct(location.state.product);
    setLoading(false);
  }, [location]);

  return (
    <div>
      {!loading ? (
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
      ) : (
        <ProductPageSkelton />
      )}
    </div>
  );
};

export default ProductPage;
