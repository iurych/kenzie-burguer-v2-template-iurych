/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuid } from 'uuid';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { useCartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { currentSale } = useCartContext();
  return (
    <StyledCartProductList>
      <ul>
        {currentSale.length &&
          // eslint-disable-next-line arrow-body-style
          currentSale.map((current) => {
            return <CartProductCard key={uuid()} current={current} />;
          })}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>R$ 14,00</StyledParagraph>
      </div>
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};
export default CartProductList;
