import "./products.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DataContext, { ProductArray } from "../../DataContext";
import { productArray, productArray2 } from "../../date/date";

function Products() {
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    throw new Error("Context is not defined");
  }

  const { check, language } = contextValue;
  const { name } = useParams();

  const [categoryProduct, setCategoryProduct] = useState<ProductArray[]>([]);

  useEffect(() => {
    if (!name) {
      setCategoryProduct(check(productArray));
    } else {
      setCategoryProduct(
        check(productArray).filter(
          (item: ProductArray) => item.category === name
        )
      );
    }
  }, [name, check]);

  return (
    <section id="product1">
      <h2>
        {language.uzb
          ? productArray2.pu
          : language.rus
          ? productArray2.pr
          : productArray2.pe}
      </h2>
      <div className="pro-container">
        {categoryProduct.map((item) => (
          <div key={item.id} className="pro">
            <Link className="underline" to={`/product/${item.id}`}>
              <img src={item.imgUrl[0]} alt="product" />
              <div className="des">
                <span>{item.people}</span>
                <h5>{item.name}</h5>
                <div className="star">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4>{item.price} Uzs</h4>
              </div>
              <button>
                <i className="fal fa-shopping-cart cart"></i>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
