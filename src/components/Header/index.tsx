import { MdShoppingCart, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';
import { StyledContainer } from '../../styles/grid';
import { useCartContext } from '../../providers/CartContext';

const Header = () => {
  const { setIsOpen, isOpen } = useCartContext();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('@TOKEN');
    navigate('/');
  };
  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img
            src={LogoKenzieBurguer}
            alt='Kenzie Burguer Logo'
            className='logo'
          />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button
                type='button'
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <button type='button' onClick={() => logOut()}>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};
export default Header;
