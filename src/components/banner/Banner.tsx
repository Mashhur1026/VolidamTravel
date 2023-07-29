import { useContext, useEffect, useState } from "react";
import DataContext from "../../DataContext";
import "./banner.css";

interface Lang {
  h4: string;
  h2: string;
  span: string;
  h: string;
}

function Banner() {
  const [lang, setLang] = useState<Lang>({
    h4: "",
    h2: "",
    span: "",
    h: "",
  });

  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }
  const { language } = contextValue;

  useEffect(() => {
    if (language.uzb) {
      setLang({
        h4: "Qanday Yangiliklar?",
        h2: "Tez",
        span: "orada",
        h: " yangi tur paketlar chiqadi",
      });
    } else if (language.eng) {
      setLang({
        h4: "What News?",
        h2: "Keep",
        span: "an eye",
        h: "out for more packages",
      });
    } else {
      setLang({
        h4: "Какие новости?",
        h2: "Скоро",
        span: "появятся",
        h: "новые типы пакетов",
      });
    }
  }, [language]);

  return (
    <section id="banner">
      <h4>{lang.h4}</h4>
      <h2>
        {lang.h2} <span>{lang.span}</span> {lang.h}
      </h2>
    </section>
  );
}

export default Banner;
