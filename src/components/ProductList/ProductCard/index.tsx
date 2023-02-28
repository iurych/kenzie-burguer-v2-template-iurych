/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
import { toast } from 'react-toastify';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { TProducts, useCartContext } from '../../../providers/CartContext';

export interface IProduct {
  product: TProducts;
}

const ProductCard = ({ product }: IProduct) => {
  const { currentSale, setCurrentSale } = useCartContext();
  const handleClick = (id: string) => {
    if (currentSale.length == 0) {
      setCurrentSale([product]);
    } else if (currentSale.length > 0) {
      const productIds = currentSale.map((element) => element.id);

      if (!productIds.some((productId) => productId == +id)) {
        setCurrentSale([...currentSale, product]);
        toast.success('Produto adicionado ao carrinho!');
      } else {
        toast.info('esse produto já consta no carrinho');
      }
    }
  };
  return (
    <StyledProductCard id={product.id.toString()}>
      <div className='imageBox'>
        <img src={product.img} alt={product.name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>
          {product.category}
        </StyledParagraph>
        <StyledParagraph className='price'>
          R$ {product.price.toFixed(2)}
        </StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          id={product.id.toString()}
          onClick={(e) => {
            handleClick(e.target.id);
          }}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};
export default ProductCard;
