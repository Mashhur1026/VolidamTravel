import { productArray } from "./date/date";
import { createContext, useEffect, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  people: string;
  price: number;
  category: string;
  description: string;
  imgUrl: string[];
}

export interface ProductArray {
  id: number;
  category: string;
  imgUrl: string[];
  people: string;
  name: string;
  price: number;
}

interface DataContextValue {
  cartItems: CartItem[];
  removeItem: (newItem: CartItem) => void;
  singleProduct: (id: number) => void;
  total: number;
  singleProductUse: CartItem | null;
  singleAddCard: (newItem: CartItem) => void;
  check: (obj: any) => any[keyof any];
  language: {
    uzb: boolean;
    rus: boolean;
    eng: boolean;
  };
  getLenguage: string;
  setGetLenguage: (getLenguage: string) => void;
}

export const DataContext = createContext<DataContextValue | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [singleProductUse, setSingleProductUse] = useState<CartItem | null>(
    null
  );
  const [getLenguage, setGetLenguage] = useState("");
  const [language, setLenguage] = useState({
    uzb: true,
    rus: false,
    eng: false,
  });

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const removeItem = (newItem: CartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== newItem.id)
    );
  };

  const singleProduct = (id: number) => {
    if (getLenguage === "uzb") {
      const product = productArray.uzb.find((item) => item.id === id);
      setSingleProductUse(product || null);
    } else if (getLenguage === "rus") {
      const product = productArray.rus.find((item) => item.id === id);
      setSingleProductUse(product || null);
    } else {
      const product = productArray.eng.find((item) => item.id === id);
      setSingleProductUse(product || null);
    }
  };

  const singleAddCard = (newItem: CartItem) => {
    const itemExists = cartItems.some((item) => item.id === newItem.id);
    if (itemExists) {
      console.log("Item already exists in the cart.");
      return;
    }
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
  };

  useEffect(() => {
    if (getLenguage === "rus") {
      setLenguage({ uzb: false, rus: true, eng: false });
    } else if (getLenguage === "eng") {
      setLenguage({ uzb: false, rus: false, eng: true });
    } else {
      setLenguage({ uzb: true, rus: false, eng: false });
    }
  }, [getLenguage]);

  function check(obj: any) {
    if (language.uzb) {
      return obj.uzb;
    } else if (language.rus) {
      return obj.rus;
    } else {
      return obj.eng;
    }
  }

  const contextValue: DataContextValue = {
    cartItems,
    removeItem,
    singleProduct,
    singleProductUse,
    total,
    singleAddCard,
    check,
    language,
    getLenguage,
    setGetLenguage,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export default DataContext;
