import { array } from "../src/components/products/Products";
import { createContext, useEffect, useState } from "react";

interface DataContextValue {
  cartItems: CartItem[];
  removeItem: (newItem: CartItem) => void;
  singleProduct: (id: number) => void;
  total: number;
  singleProductUse: CartItem[];
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

export interface CartItem {
  id: number;
  img: string[];
  category: string;
  cname: string;
  name: string;
  price: number;
  quantity: number;
  sizes: string[];
  des: string;
}

const DataContext = createContext<DataContextValue | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  //Total card
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);
  // RemoveFrom card
  const removeItem = (newItem: CartItem) => {
    const removedArray = cartItems.filter((item) => {
      const idMatch = item.id === newItem.id;
      const sizesMatch = item.sizes.every(
        (size, index) => size === newItem.sizes[index]
      );
      const imgMatch = item.img.every(
        (img, index) => img === newItem.img[index]
      );

      return !(idMatch && sizesMatch && imgMatch);
    });

    setCartItems(removedArray);
  };

  // Add to card
  const [singleProductUse, setSingleProductUse] = useState<CartItem[]>(array);
  const singleProduct = (id: number) => {
    const singleReady = array.filter((cartItem) => cartItem.id === id);
    setSingleProductUse(singleReady);
  };
  const singleAddCard = (newItem: CartItem) => {
    const existingItem = cartItems.find(
      (item) =>
        item.id === newItem.id &&
        item.sizes.every((size, index) => size === newItem.sizes[index]) &&
        item.img.every((img, index) => img === newItem.img[index])
    );

    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === newItem.id &&
          item.sizes.every((size, index) => size === newItem.sizes[index]) &&
          item.img.every((img, index) => img === newItem.img[index])
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    }
  };

  const [getLenguage, setGetLenguage] = useState("");
  const [language, setLenguage] = useState({
    uzb: true,
    rus: false,
    eng: false,
  });

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
