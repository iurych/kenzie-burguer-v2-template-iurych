import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDataContext } from './UserContext';
import api from '../services/api';

type TCartProviderProps = {
  children: React.ReactNode;
};

export type TProducts = {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
};

type TCartContext = {
  getProducts: () => Promise<void>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSale: React.Dispatch<React.SetStateAction<TProducts[]>>;

  isOpen: boolean;
  products: TProducts[];
  currentSale: TProducts[];
};

export const CartContext = createContext<TCartContext>({} as TCartContext);

export const CartProvider = ({ children }: TCartProviderProps) => {
  const localCurrentSale = localStorage.getItem('@currentSale');
  const { setLoading } = useDataContext();
  const [products, setProduts] = useState<TProducts[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [currentSale, setCurrentSale] = useState<TProducts[]>(
    localCurrentSale ? JSON.parse(localCurrentSale) : []
  );

  useEffect(() => {
    localStorage.setItem('@currentSale', JSON.stringify(currentSale));
  }, [currentSale]);

  
  const getProducts = async () => {
    const token = localStorage.getItem('@TOKEN');

    try {
      setLoading(true);
      const response = await api.get<TProducts[]>('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduts(response.data);
    } catch (error) {
      if (axios.AxiosError) {
        toast.error('Ops, algo deu errado!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        getProducts,
        setIsOpen,
        isOpen,
        products,
        currentSale,
        setCurrentSale,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
