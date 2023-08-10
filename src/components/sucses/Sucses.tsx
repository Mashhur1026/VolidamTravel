import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../DataContext";

interface Lang {
  h1: string;
  btn: string;
  p: string;
}

function Sucses() {
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }

  const { language } = contextValue;

  const [lang, setLang] = useState<Lang>({
    h1: "",
    btn: "",
    p: "",
  });

  useEffect(() => {
    if (language.uzb) {
      setLang({
        h1: "Xaridingiz uchun raxmat",
        btn: "Asosiy",
        p: "To'lov muvaffaqiyatli amalga oshirildi, bizni tanlaganingiz uchun rahmat",
      });
    } else if (language.eng) {
      setLang({
        h1: "Thank you",
        btn: "Back Home",
        p: "Payment has been made successfully, thank you for choosing us",
      });
    } else {
      setLang({
        h1: "Спасибо за покупку",
        btn: "Домой",
        p: "Оплата прошла успешно, спасибо, что выбрали нас",
      });
    }
  }, [language]);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4">
        <div className="border border-3 border-success"></div>
        <div className="card  bg-white shadow p-5">
          <div className="mb-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-success bi bi-check-circle"
              width="75"
              height="75"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
          </div>
          <div className="text-center">
            <h1>{lang.h1} !</h1>
            <p>{lang.p}</p>
            <Link to={`/`} className="btn btn-outline-success">
              {lang.btn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sucses;
