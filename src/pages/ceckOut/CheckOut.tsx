import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../DataContext";
import "./checkout.css";
import { useNavigate } from "react-router-dom";
import Code from "../../components/code/Code";
import PaymeServices from "../../payme";
import { Notify } from "notiflix";

interface FormValues {
  firstname: string;
  lastname: string;
  phone: string;
  cardNumber: string;
  cardExp: string;
  qoshmcha: string;
}

interface Lang {
  h1: string;
  td1: string;
  td2: string;
  td3: string;
  td4: string;
  h3: string;
  total: string;
  mspan: string;
  mh2: string;
  mbtn: string;
  ph1: string;
  ph2: string;
  ph3: string;
  ph4: string;
  c: string;
  e: string;
}

function CheckOut() {
  const navigate = useNavigate();
  const contextValue = useContext(DataContext);
  const [askCode, setAskCode] = useState(false);
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [payme, setPayme] = useState<PaymeServices | undefined>();
  const [reqId, setReqId] = useState<number | null>(null);
  const [payer, setPayer] = useState({} as any);

  if (!contextValue) {
    return <div>Loading...</div>;
  }

  const { language } = contextValue;
  const cartItems = contextValue.cartItems;
  const total = contextValue.total;

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
    td4: "",
    c: "",
    e: "",
  });

  const [formValues, setFormValues] = useState<FormValues>({
    firstname: "",
    lastname: "",
    phone: "",
    cardNumber: "",
    cardExp: "",
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstname, lastname, cardNumber, cardExp, phone } = formValues;

    setPayer({ name: `${firstname} ${lastname}`, phone });

    const endpoint = "https://checkout.paycom.uz/api";

    const payme_id = import.meta.env.VITE_PAYME_ID;
    const payme_key = import.meta.env.VITE_PAYME_KEY;
    const id = new Date().valueOf();
    setReqId(id);

    const paymeModel = new PaymeServices(endpoint, payme_id, payme_key);
    const cc = await paymeModel.createCard(
      id.toString(),
      cardNumber,
      cardExp.replace("/", "")
    );

    if (!cc.error) {
      setToken(cc.result.card.token);
      setPayme(paymeModel);

      const codeRes = await paymeModel.getVerifyCode(
        id.toString(),
        cc.result.card.token
      );

      if (!codeRes.error) {
        setAskCode(true);
      } else {
        console.log(codeRes.error);
        Notify.failure(codeRes.error.message);
      }
    } else {
      console.log(cc.error);
      Notify.failure(cc.error.message);
    }
  };

  const handleCodeClick = async () => {
    if (reqId === null) {
      console.log("reqId is null");
      return;
    }

    let verified = false;

    while (verified === false) {
      const codeRes = await payme!.verifyCode(reqId.toString(), token, code);

      if (!codeRes.error) {
        verified = true;
      } else if (codeRes.error.code === -32602) {
        console.log(codeRes.error);
        Notify.failure(codeRes.error.message);
      } else {
        verified = true;
        console.log(codeRes.error);
        Notify.failure(codeRes.error.message);
      }
    }

    // @ts-ignore
    let chek = await payme!.createReceipt(
      reqId,
      total * 100,
      { order_number: reqId },
      {
        receipt_type: 0,
        items: [
          {
            title: "Tur paket",
            price: total * 100,
            count: 1,
            code: "10703999001000000",
            package_code: "1495086",
            vat_percent: 0,
          },
        ],
      }
    );

    if (!chek.error) {
      const receiptId = chek.result.receipt._id;

      let payment = await payme!.payReceipt(
        reqId.toString(),
        receiptId,
        token,
        payer
      );

      if (payment.result?.receipt?.state === 4) {
        const removeRes = await payme!.remove(reqId.toString(), token);
        if (removeRes.result?.success) {
          navigate("/Succes");
        } else {
          console.log(removeRes.error);
          Notify.failure(removeRes.error.message);
        }
      } else {
        console.log(payment.error);
        Notify.failure(payment.error.message);
      }
    } else {
      console.log(chek.error);
      Notify.failure(chek.error.message);
    }
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
        td4: "Miqdor",
        c: "Card number",
        e: "Kartaning amal qilish muddati",
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
        td4: "Amount",
        ph4: "Message",
        c: "Card number",
        e: "Expiry date of card",
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
        td4: "Сумма",
        c: "Номер карты",
        e: "Срок действия карты",
      });
    }
  }, [language]);

  return askCode ? (
    <Code code={code} setCode={setCode} handleClick={handleCodeClick} />
  ) : (
    <>
      <section id="chechout">
        <h1>{lang.h1}</h1>
        <table width="100%">
          <thead>
            <tr>
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
                  <strong>{total} UZS</strong>
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
            name="firstname"
            required
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder={lang.ph2}
            name="lastname"
            required
          />
          <input
            onChange={handleChange}
            placeholder={lang.ph3}
            name="phone"
            type="tel"
            required
          />
          <label htmlFor="card">{lang.c}</label>
          <input
            onChange={handleChange}
            placeholder="8600 000000000000"
            name="cardNumber"
            type="text"
            id="card"
            required
          />
          <label htmlFor="expDate">{lang.e}</label>
          <input
            onChange={handleChange}
            placeholder="24/08"
            name="cardExp"
            type="text"
            id="expDate"
            required
          />
          <textarea
            onChange={handleChange}
            placeholder={lang.ph4}
            name="qoshmcha"
          ></textarea>
          <button type="submit">{lang.mbtn}</button>
        </form>
      </section>
    </>
  );
}

export default CheckOut;
