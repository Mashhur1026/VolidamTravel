import { Route, Routes } from "react-router-dom";
import Categories from "../../components/categoeies/Categories";
import Products from "../../components/products/Products";
import BlogComponent from "../../components/blogC/BlogComponent";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../DataContext";

interface Lang {
  text: string;
  title: string;
  img: string;
}

function Shop() {
  const [lang, setLang] = useState<Lang>({
    title: "",
    text: "",
    img: "",
  });
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }
  const { language } = contextValue;

  useEffect(() => {
    if (language.uzb) {
      setLang({
        title: "#Uyda Qoling",
        text: "Uyingizdan turib xarid qiling va bron qiling",
        img: "shop-bg",
      });
    } else if (language.eng) {
      setLang({
        title: "#stayhome",
        text: "Buy and Book from the Comfort of Your Home",
        img: "shop-bg",
      });
    } else {
      setLang({
        title: "#Остаться дома",
        text: "Покупайте и бронируйте, не выходя из дома",
        img: "shop-bg",
      });
    }
  }, [language]);
  return (
    <>
      <BlogComponent title={lang.title} text={lang.text} img={lang.img} />
      <Categories />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:name" element={<Products />} />
      </Routes>
    </>
  );
}

export default Shop;
