import Categories from "../../components/categoeies/Categories";
import "./home.css";
import Products from "../../components/products/Products";
import Banner from "../../components/banner/Banner";
import Smbanners from "../../components/sm-banners/Smbanners";
import { homeArray } from "../../date/date";
import { useContext } from "react";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";

function Home() {
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }
  const { language } = contextValue;

  return (
    <>
      <section id="hero">
        <h4>
          {language.uzb
            ? homeArray.smolu
            : language.rus
            ? homeArray.smolr
            : homeArray.smole}
        </h4>
        <h2>
          {language.uzb
            ? homeArray.homeh1u
            : language.rus
            ? homeArray.homeh1r
            : homeArray.homeh1e}
        </h2>
        <h1>
          {language.uzb
            ? homeArray.homeh2u
            : language.rus
            ? homeArray.homeh2r
            : homeArray.homeh2e}
        </h1>
        <p>
          {language.uzb
            ? homeArray.homePu
            : language.rus
            ? homeArray.homePRu
            : homeArray.homePEng}
        </p>
        <Link to={`/Shop`}>
          {language.uzb
            ? homeArray.btnu
            : language.rus
            ? homeArray.btnr
            : homeArray.btne}
        </Link>
      </section>
      <Categories />
      <Products />
      <Banner />
      <Smbanners />
    </>
  );
}

export default Home;
