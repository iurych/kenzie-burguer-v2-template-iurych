import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { useCartContext } from '../../providers/CartContext';


const ShopPage = () => {
  
  const { isOpen } = useCartContext();

  return (
    <StyledShopPage>
      {isOpen ? <CartModal /> : null}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};
export default ShopPage;
