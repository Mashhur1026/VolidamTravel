import { useContext, useEffect, useState } from "react";
import BlogComponent from "../../components/blogC/BlogComponent";
import "./cart.css";
import DataContext, { CartItem } from "../../DataContext";
import { Link } from "react-router-dom";
import { singleProductAr } from "../../date/date";
import Notiflix from "notiflix";

interface Lang {
  text: string;
  title: string;
  img: string;
  td1: string;
  td2: string;
  td3: string;
  h3: string;
  total: string;
  mbtn: string;
  mbtn2: string;
  btn: string;
  m: string;
  td4: string;
}

function Cart() {
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }

  const { language } = contextValue;
  const cartItems = contextValue ? contextValue.cartItems : [];
  const { removeItem } = contextValue ?? {};
  const total = contextValue ? contextValue.total : 0;

  const isItemInCart = (itemId: number): boolean => {
    return cartItems.some((item) => item.id === itemId);
  };

  const hendleClik = () => {
    const localStorageItems = localStorage.getItem("cartItems");
    const storedCartItems: CartItem[] = localStorageItems
      ? JSON.parse(localStorageItems)
      : [];
    storedCartItems.forEach((item) => {
      if (!isItemInCart(item.id)) {
        cartItems.push(item);
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const [lang, setLang] = useState<Lang>({
    title: "",
    text: "",
    img: "",
    td1: "",
    td2: "",
    td3: "",
    h3: "",
    total: "",
    mbtn: "",
    mbtn2: "",
    btn: "",
    m: "",
    td4: "",
  });

  useEffect(() => {
    if (language.uzb) {
      setLang({
        title: "#E'tibor",
        text: "Iltimos, barcha narsalarni diqqat bilan tekshiring",
        img: "about-bg",
        td1: "Rasm",
        td2: "Ism",
        td3: "Narx",
        h3: "Savat jami",
        total: "Jami",
        mbtn: "To'lovga o'tish",
        mbtn2: "Bron qilish",
        btn: "Tur paketlar",
        m: "Sizning savatinggizda hechqanday Tur paket yo'q",
        td4: "Miqdor",
      });
    } else if (language.eng) {
      setLang({
        title: "#Attention",
        text: "Please check all items carefully",
        img: "about-bg",
        td1: "Image",
        td2: "Name",
        td3: "Price",
        h3: "Cart Total",
        total: "Total",
        mbtn: "Proceed to Payment",
        mbtn2: "Book",
        btn: "Tour packages ",
        m: "There are no Tour packages in your shopping cart",
        td4: "Amount",
      });
    } else {
      setLang({
        title: "#Внимание",
        text: "Пожалуйста, внимательно проверьте все товары",
        img: "about-bg",
        td1: "Изображение",
        td2: "Имя",
        td3: "Цена",
        h3: "Общая сумма в корзине",
        total: "Итого",
        mbtn: "Перейти к оплате",
        mbtn2: "Бронирование",
        btn: "Турпакеты",
        m: "В вашей корзине нет турпакетов",
        td4: "Сумма",
      });
    }
  }, [language]);

  const alert = () => {
    let message = "";
    {
      language.uzb
        ? (message = singleProductAr.booku)
        : language.rus
        ? (message = singleProductAr.bookr)
        : (message = singleProductAr.booke);
    }
    Notiflix.Notify.success(message);
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <BlogComponent title={lang.title} text={lang.text} img={lang.img} />
          <section id="cart">
            <table width="100%">
              <thead>
                <tr>
                  <td></td>
                  <td>{lang.td1}</td>
                  <td>{lang.td2}</td>
                  <td>{lang.td4}</td>
                  <td>{lang.td3}</td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button onClick={() => removeItem?.(item)}>
                        <i className="far fa-times-circle"></i>
                      </button>
                    </td>
                    <td>
                      <img src={item.imgUrl[0]} alt="" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} UZS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="cart-add">
            <div id="subtotal">
              <h3>{lang.h3}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>{lang.total}</strong>
                    </td>
                    <td>
                      <strong>{total} UZS</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="btn-container">
                <h2>{lang.m}</h2>
                <Link to={`/Shop`}>
                  <button className="normol"> {lang.btn}</button>
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <BlogComponent title={lang.title} text={lang.text} img={lang.img} />
          <section id="cart">
            <table width="100%">
              <thead>
                <tr>
                  <td></td>
                  <td>{lang.td1}</td>
                  <td>{lang.td2}</td>
                  <td>{lang.td4}</td>
                  <td>{lang.td3}</td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  console.log(item.quantity);
                  return (
                    <tr key={item.id}>
                      <td>
                        <button onClick={() => removeItem?.(item)}>
                          <i className="far fa-times-circle"></i>
                        </button>
                      </td>
                      <td>
                        <img src={item.imgUrl[0]} alt="" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price} UZS</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section id="cart-add">
            <div id="subtotal">
              <h3>{lang.h3}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>{lang.total}</strong>
                    </td>
                    <td>
                      <strong>{total} UZS</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="btn-container">
                <Link to={`/Checkout`}>
                  <button className="normol">{lang.mbtn}</button>
                </Link>
                <Link onClick={alert} to={`/Booking`}>
                  <button onClick={hendleClik} className="normol">
                    {lang.mbtn2}
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Cart;
