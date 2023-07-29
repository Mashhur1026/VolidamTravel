import "./booking.css";
import { useContext, useEffect, useState } from "react";
import DataContext, { CartItem } from "../../DataContext";
import { Link } from "react-router-dom";

interface Lang {
  td1: string;
  td2: string;
  td3: string;
  h1: string;
  mbtn: string;
}

function Booking() {
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }

  const { cartItems, language, removeItem } = contextValue;

  const [bookingItems, setBookingItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("cartItems") ?? "";
    setBookingItems(JSON.parse(items));
    console.log(bookingItems);
  }, []);

  const [lang, setLang] = useState<Lang>({
    td1: "",
    td2: "",
    td3: "",
    h1: "",
    mbtn: "",
  });

  useEffect(() => {
    if (language.uzb) {
      setLang({
        td1: "Rasm",
        td2: "Ism",
        td3: "Narx",
        h1: "Bron qlingan tur paketlar",
        mbtn: "To'lovga o'tish",
      });
    } else if (language.eng) {
      setLang({
        td1: "Image",
        td2: "Name",
        td3: "Price",
        h1: "Booked tour packages",
        mbtn: "Proceed to Payment",
      });
    } else {
      setLang({
        td1: "Изображение",
        td2: "Имя",
        td3: "Цена",
        h1: "Забронированные турпакеты",
        mbtn: "Перейти к оплате",
      });
    }
  }, [language]);

  return (
    <>
      <h1 className="text">{lang.h1}</h1>
      <section id="booking">
        <table width="100%">
          <thead>
            <tr>
              <td></td>
              <td>{lang.td1}</td>
              <td>{lang.td2}</td>
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

                <td>{item.price} UZS</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="elon">
        <h3>
          Bron qilingan tur paketlar 1 hafta davomida bron bo'lib turadi! Agar 1
          hafta ichida to'lov amalga oshirilmasa, unda broningizni saqlab
          qololmaymiz
        </h3>
      </div>
      <div className="btn-container-booking">
        <Link to={`/Checkout`}>
          <button>{lang.mbtn}</button>
        </Link>
      </div>
    </>
  );
}

export default Booking;
