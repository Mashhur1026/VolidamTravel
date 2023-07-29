import { useContext, useEffect, useState } from "react";
import "./footer.css";
import DataContext from "../../DataContext";

interface Lang {
  h4: string;
  h4a: string;
  h4f: string;
  h4m: string;
  h4s: string;
  strong1: string;
  strong2: string;
  strong3: string;
  pc: string;
  pc2: string;
  aa: string;
  aa2: string;
  am: string;
  am2: string;
  am3: string;
  my: string;
}

function Footer() {
  const [lang, setLang] = useState<Lang>({
    h4: "",
    h4a: "",
    h4f: "",
    h4m: "",
    h4s: "",
    strong1: "",
    strong2: "",
    strong3: "",
    pc: "",
    pc2: "",
    aa: "",
    aa2: "",
    am: "",
    am2: "",
    am3: "",
    my: "",
  });

  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }
  const { language } = contextValue;

  useEffect(() => {
    if (language.uzb) {
      setLang({
        h4: "Aloqa",
        h4f: "Bizni kuzatib boring",
        h4a: "Biz haqimizda",
        h4m: "Mening akkauntim",
        h4s: "Xavfsiz to'lov o'tkazuvchilari",
        strong1: "Manzil:",
        strong2: "Telefon:",
        strong3: "Ish vaqti:",
        pc: `Yusuf Hamadoni ko'chasi, Gijduvan,
         Gijduvan tumani, Buxoro viloyati, O'zbekiston`,
        pc2: "Dushanba - Shanba, 10:00 dan 18:00 gacha",
        aa: "Biz haqimizda",
        aa2: "Biz bilan bog'lanish",
        am: "Savatni ko'rish",
        am2: "Bron qlish",
        am3: "Yordam",
        my: "Barcha huquqlar himoyalangan, yaratuvchi: Mashhur Yuldoshev 2023",
      });
    } else if (language.eng) {
      setLang({
        h4: "Contact",
        h4f: "Follow Us",
        h4a: "About",
        h4m: "My Account",
        h4s: "Secured Payment Gateways",
        strong1: "Address:",
        strong2: "Phone:",
        strong3: "Hours:",
        pc: "Yusuf Hamadoni Street, Gijduvan, Gijduvan, Bukhara Region, Uzbekistan",
        pc2: "10:00 - 18:00, Mon - Sat",
        aa: "About Us",
        aa2: "Contact Us",
        am: "View Cart",
        am2: "Booking",
        am3: "Help",
        my: "All rights reserved, created by: Mashhur Yuldoshev 2023",
      });
    } else {
      setLang({
        h4: "Контакт",
        h4f: "Подписывайтесь на нас",
        h4a: "О нас",
        h4m: "Мой аккаунт",
        h4s: "Безопасные платежные шлюзы",
        strong1: "Адрес:",
        strong2: "Телефон:",
        strong3: "Часы работы:",
        pc: "Улица Юсуфа Хамадони, Гидждуван, Бухарская область, Узбекистан",
        pc2: "10:00 - 18:00, пн - сб",
        aa: "О нас",
        aa2: "Свяжитесь с нами",
        am: "Просмотр корзины",
        am2: "Бронирование",
        am3: "Помощь",
        my: "Все права защищены, создано: Mashhur Yuldoshev 2023",
      });
    }
  }, [language]);

  return (
    <footer>
      <div className="col">
        <img
          className="logo"
          src="https://res.cloudinary.com/dmu4nnfdg/image/upload/v1689944797/volidam_oq_3-removebg-preview_1_vhvqvf.png"
          alt="logo"
        />
        <h4>{lang.h4}</h4>
        <p>
          <strong>{lang.strong1} </strong>
          {lang.pc.substring(0, lang.pc.length / 2)}
          <br />
          {lang.pc.substring(lang.pc.length / 2)}
        </p>
        <p>
          <strong>{lang.strong2} </strong> +998913105555
        </p>
        <p>
          <strong>{lang.strong3} </strong> {lang.pc2}
        </p>
        <div className="follow">
          <h4>{lang.h4f}</h4>
          <div className="icon">
            <a href="https://www.instagram.com/volidamtravel.uz/">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="col">
        <h4>{lang.h4a}</h4>
        <a href="/About">{lang.aa}</a>
        <a href="/Contact">{lang.aa2}</a>
      </div>

      <div className="col">
        <h4>{lang.h4m}</h4>
        <a href="/Cart">{lang.am}</a>
        <a href="/Booking">{lang.am2}</a>
        <a href="/Contact">{lang.am3}</a>
      </div>

      <div className="col install">
        <h4>{lang.h4s}</h4>
        <img
          src="https://res.cloudinary.com/dmu4nnfdg/image/upload/v1690594550/paymi-removebg-preview_jhckyd.png"
          alt="pay"
        />
      </div>

      <div className="copyright">
        <p>&#169; {lang.my}</p>
      </div>
    </footer>
  );
}

export default Footer;
