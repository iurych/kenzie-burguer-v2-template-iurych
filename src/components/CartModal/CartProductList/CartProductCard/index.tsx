/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { TProducts, useCartContext } from '../../../../providers/CartContext';

interface IProduct {
  current: TProducts;
}

const CartProductCard = ({ current }: IProduct) => {
  const { currentSale, setCurrentSale } = useCartContext();

  const removeCard = (id: number) => {
    const filteredCards = currentSale.filter((element: TProducts) => {    
      return +element.id !== +id;
    });
    setCurrentSale(filteredCards);
  };
  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={current.img} alt={current.name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {current.name}
        </StyledTitle>
        <button
          id={current.id.toString()}
          type='button'
          aria-label='Remover'
          onClick={(e) => {
            console.log('clickedId', e.currentTarget.id);
            removeCard(+e.currentTarget.id);
          }}
        >
          <MdDelete size={24}  />
        </button>
      </div>
    </StyledCartProductCard>
  );
};
export default CartProductCard;
