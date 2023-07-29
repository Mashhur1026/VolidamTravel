import "./booking.css";
import { useContext, useEffect, useState } from "react";
import DataContext, { CartItem } from "../../DataContext";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
import { singleProductAr } from "../../date/date";

interface Lang {
  td1: string;
  td2: string;
  td3: string;
  h1: string;
  mbtn: string;
  h12: string;
  btn: string;
}

function Booking() {
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }

  const { language } = contextValue;

  const [bookingItems, setBookingItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("cartItems") ?? "";
    setBookingItems(JSON.parse(items));
  }, []);

  const [lang, setLang] = useState<Lang>({
    td1: "",
    td2: "",
    td3: "",
    h1: "",
    mbtn: "",
    h12: "",
    btn: "",
  });

  useEffect(() => {
    if (language.uzb) {
      setLang({
        td1: "Rasm",
        td2: "Ism",
        td3: "Narx",
        h1: "Bron qlingan tur paketlar",
        mbtn: "To'lovga o'tish",
        h12: "Siz hali hech qanday tur paketini band qilmagansiz",
        btn: "Tur paketlar",
      });
    } else if (language.eng) {
      setLang({
        td1: "Image",
        td2: "Name",
        td3: "Price",
        h1: "Booked tour packages",
        mbtn: "Proceed to Payment",
        h12: "You have not booked any tour packages yet",
        btn: "Tour packages ",
      });
    } else {
      setLang({
        td1: "Изображение",
        td2: "Имя",
        td3: "Цена",
        h1: "Забронированные турпакеты",
        mbtn: "Перейти к оплате",
        h12: "Вы еще не забронировали турпакеты",
        btn: "Турпакеты",
      });
    }
  }, [language]);

  function hendleRemove(id: number): void {
    const items = localStorage.getItem("cartItems");
    if (items) {
      const parsedItems: CartItem[] = JSON.parse(items);
      const updatedItems: CartItem[] = parsedItems.filter(
        (item) => item.id !== id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      setBookingItems(updatedItems);
    }
  }

  const alert = () => {
    let message = "";
    {
      language.uzb
        ? (message = singleProductAr.bookru)
        : language.rus
        ? (message = singleProductAr.bookrr)
        : (message = singleProductAr.bookre);
    }
    Notiflix.Notify.success(message);
  };

  return (
    <>
      {bookingItems.length === 0 ? (
        <>
          <div className="no-booking-con">
            <h1 className="text">{lang.h12}</h1>
            <Link to={`/Shop`} className="no-bookin-btn">
              {lang.btn}
            </Link>
          </div>
        </>
      ) : (
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
                {bookingItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button onClick={() => hendleRemove(item.id)}>
                        <i onClick={alert} className="far fa-times-circle"></i>
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
              Bron qilingan tur paketlar 1 hafta davomida bron bo'lib turadi!
              Agar 1 hafta ichida to'lov amalga oshirilmasa, unda broningizni
              saqlab qololmaymiz
            </h3>
          </div>
          <div className="btn-container-booking">
            <Link to={`/Checkout`}>
              <button>{lang.mbtn}</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Booking;
