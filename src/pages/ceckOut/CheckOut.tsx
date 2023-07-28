import { useContext, useEffect, useState } from "react";
import DataContext from "../../DataContext";
import "./checkout.css";

interface FormValues {
  ismingiz: string;
  familiyangiz: string;
  telefon: string;
  qoshmcha: string;
}

interface Lang {
  h1: string;
  td1: string;
  td2: string;
  td3: string;
  h3: string;
  total: string;
  mspan: string;
  mh2: string;
  mbtn: string;
  ph1: string;
  ph2: string;
  ph3: string;
  ph4: string;
}

function CheckOut() {
  const contextValue = useContext(DataContext);

  if (!contextValue) {
    return <div>Loading...</div>;
  }

  const { language } = contextValue;
  const cartItems = contextValue ? contextValue.cartItems : [];
  const total = contextValue ? contextValue.total : 0;

  const [lang, setLang] = useState<Lang>({
    h1: "",
    td1: "",
    td2: "",
    td3: "",
    h3: "",
    total: "",
    mspan: "",
    mh2: "",
    mbtn: "",
    ph1: "",
    ph2: "",
    ph3: "",
    ph4: "",
  });

  const [formValues, setFormValues] = useState<FormValues>({
    ismingiz: "",
    familiyangiz: "",
    telefon: "",
    qoshmcha: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form values:", formValues);
    console.log("Total:", total);
    console.log("Cart items:", cartItems);
  };

  useEffect(() => {
    if (language.uzb) {
      setLang({
        h1: "Buyurtma berish",
        td1: "Rasm",
        td2: "Ism",
        td3: "Narx",
        h3: "Savat jami",
        total: "Jami",
        mspan: "Iltimos, tafsilotli bo'ling",
        mh2: "Buyurtma uchun zarur ma'lumotlar",
        mbtn: "Jo'natish",
        ph1: "Ism",
        ph2: "Familiya",
        ph3: "Telefon raqam",
        ph4: "Xabar",
      });
    } else if (language.eng) {
      setLang({
        h1: "Checkout",
        td1: "Image",
        td2: "Name",
        td3: "Price",
        h3: "Cart Total",
        total: "Total",
        mspan: "Please be specific",
        mh2: "Required information for the order",
        mbtn: "Submit",
        ph1: "Name",
        ph2: "Surname",
        ph3: "Number",
        ph4: "Message",
      });
    } else {
      setLang({
        h1: "Оформление заказа",
        td1: "Изображение",
        td2: "Имя",
        td3: "Цена",
        h3: "Итого в корзине",
        total: "Всего",
        mspan: "Пожалуйста, будьте конкретны",
        mh2: "Обязательная информация для заказа",
        mbtn: "Отправить",
        ph1: "Имя",
        ph2: "Фамилия",
        ph3: "Номер",
        ph4: "Сообщение",
      });
    }
  }, [language]);

  return (
    <>
      <section id="chechout">
        <h1>{lang.h1}</h1>
        <table width="100%">
          <thead>
            <tr>
              <td>{lang.td1}</td>
              <td>{lang.td2}</td>
              <td>{lang.td3}</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
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
      <section id="checkoutTotal">
        <div id="subtotal">
          <h3>{lang.h3}</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>{lang.total}</strong>
                </td>
                <td>
                  <strong>${total}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div></div>
        </div>
      </section>
      <section id="checkout-form-details">
        <form onSubmit={handleSubmit}>
          <h2>{lang.mh2}</h2>
          <span>{lang.mspan}</span>
          <input
            onChange={handleChange}
            type="text"
            placeholder={lang.ph1}
            name="ismingiz"
            required
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder={lang.ph2}
            name="familiyangiz"
            required
          />
          <input
            onChange={handleChange}
            placeholder={lang.ph3}
            name="telefon"
            type="tel"
            required
          />
          <textarea
            onChange={handleChange}
            placeholder={lang.ph4}
            name="qoshmcha"
          ></textarea>
          <button>{lang.mbtn}</button>
        </form>
      </section>
    </>
  );
}

export default CheckOut;
