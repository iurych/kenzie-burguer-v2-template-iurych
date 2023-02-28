import { useEffect } from 'react';
/* eslint-disable no-console */
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import {  useCartContext } from '../../providers/CartContext';

const ProductList = () => {
  const { products, getProducts } = useCartContext();

  useEffect(() => {
    const callGetProducts = async () => {
      await getProducts();
    };
    callGetProducts();
  }, []);

  return (
    <StyledProductList>
      {products.length &&
        // eslint-disable-next-line arrow-body-style
        products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
             
            />
          );
        })}
    </StyledProductList>
  );
};

export default ProductList;
