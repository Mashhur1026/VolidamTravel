import "./categories.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";
import { categoeiesArray } from "../../date/date";

function Categories() {
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }

  const { check } = contextValue;
  const { language } = contextValue;

  return (
    <>
      <div id="categories" className="categories">
        <h1>
          {language.uzb
            ? categoeiesArray.h1u
            : language.rus
            ? categoeiesArray.h1r
            : categoeiesArray.h1e}
        </h1>
      </div>

      <section id="feature">
        {check(categoeiesArray).map((item: any) => (
          <Link to={`/Shop/${item.name2}`} key={item.name} className="fe-box">
            <div>
              <img src={item.imgUrl} alt="Free Shipping" />
            </div>
            <h6>{item.name}</h6>
          </Link>
        ))}
      </section>
    </>
  );
}

export default Categories;
