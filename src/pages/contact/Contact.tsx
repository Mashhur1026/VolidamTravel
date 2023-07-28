import { useContext, useEffect, useState } from "react";
import BlogComponent from "../../components/blogC/BlogComponent";
import "./contact.css";
import DataContext from "../../DataContext";

interface Lang {
  text: string;
  title: string;
  img: string;
  h2: string;
  p1: string;
  p2: string;
  manzl: string;
  ishvaqt: string;
  mspan: string;
  mh2: string;
  mbtn: string;
  ph1: string;
  ph2: string;
  ph3: string;
  ph4: string;
}

function UserInfo() {
  const [lang, setLang] = useState<Lang>({
    title: "",
    text: "",
    img: "",
    h2: "",
    p1: "",
    p2: "",
    manzl: "",
    ishvaqt: "",
    mspan: "",
    mh2: "",
    mbtn: "",
    ph1: "",
    ph2: "",
    ph3: "",
    ph4: "",
  });
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }
  const { language } = contextValue;

  useEffect(() => {
    if (language.uzb) {
      setLang({
        title: "#Keling Gaplashamiz",
        text: "XABAR QOLDIRING, biz sizdan eshitishni yaxshi ko'ramiz!",
        img: "about-bg",
        h2: "Biz bilan tez va oson bog'laning",
        p1: "Bosh idora",
        p2: "ALOQA BO'LING",
        manzl:
          "Yusuf Hamadoniy ko'chasi, G'ijduvon, G'ijduvon, Buxoro viloyati, O'zbekiston",
        ishvaqt: "Dushanbadan shanbagacha: 9.00 dan 16.00 gacha",
        mspan: "XABAR YOZING",
        mh2: "Biz sizdan xabar olamiz",
        mbtn: "Jo'natish",
        ph1: "Ismingiz",
        ph2: "E-mail",
        ph3: "Mavzu",
        ph4: "Xabaringiz",
      });
    } else if (language.eng) {
      setLang({
        title: "#let's_talk",
        text: "LEAVE A MESSAGE, We love to hear from you!",
        img: "about-bg",
        h2: "Connect quickly and easily with us",
        p1: "Head Office",
        p2: "GET IN TOUCH",
        manzl:
          "Yusuf Hamadoni street, Gijduvan, Gijduvan, Bukhara region, Uzbekistan",
        ishvaqt: "Monday to Saturday: 9.00am to 16pm",
        mspan: "LEAVE A MESSAGE",
        mh2: "We love to hear from you",
        mbtn: "Submit",
        ph1: "Your name",
        ph2: "E-mail",
        ph3: "Subject",
        ph4: "Your message",
      });
    } else {
      setLang({
        title: "#Давайте поговорим",
        text: "ОСТАВЬТЕ СООБЩЕНИЕ, Мы рады услышать от вас!",
        img: "about-bg",
        h2: "Подключайтесь к нам быстро и легко",
        p1: "Головной офис",
        p2: "СВЯЖИТЕСЬ С НАМИ",
        manzl:
          "Улица Юсуфа Хамадони, Гиждуван, Гиждуван, Бухарская область, Узбекистан",
        ishvaqt: "С понедельника по субботу: с 9:00 до 16:00",
        mspan: "ОСТАВЬТЕ СООБЩЕНИЕ",
        mh2: "Мы рады слышать вас",
        mbtn: "Отправить",
        ph1: "Ваше имя",
        ph2: "E-mail",
        ph3: "Тема",
        ph4: "Ваше сообщение",
      });
    }
  }, [language]);

  return (
    <>
      <BlogComponent title={lang.title} text={lang.text} img={lang.img} />
      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>{lang.p2}</span>
          <h2>{lang.h2}</h2>
          <h3>{lang.p1}</h3>
          <div>
            <li>
              <i className="fal fa-map"></i>
              <p>{lang.manzl}</p>
            </li>
            <li>
              <i className="far fa-envelope"></i>
              <p>volidamtravel@gmail.com</p>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <p>+998913105555</p>
            </li>
            <li>
              <i className="far fa-clock"></i>
              <p>{lang.ishvaqt}</p>
            </li>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3052.117968878679!2d64.698759275769!3d40.095082671493095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5069c51f95799d%3A0x7ea5b95c36b9f2ce!2sYusuf%20Hamadoniy!5e0!3m2!1sru!2smy!4v1689949780005!5m2!1sru!2smy"
            width="600"
            height="450"
            style={{ border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      <section id="form-details">
        <form action="">
          <span>{lang.mspan}</span>
          <h2>{lang.mh2}</h2>
          <input type="text" placeholder={lang.ph1} />
          <input type="text" placeholder={lang.ph2} />
          <input type="text" placeholder={lang.ph3} />
          <textarea placeholder={lang.ph4}></textarea>
          <button>{lang.mbtn}</button>
        </form>
      </section>
    </>
  );
}

export default UserInfo;
