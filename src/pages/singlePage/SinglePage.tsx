import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataContext, { CartItem } from "../../DataContext";
import { singleProductAr } from "../../date/date";
import Notiflix from "notiflix";
import "./singlePage.css";

function SinglePage() {
  const { id } = useParams();
  const contextValue = useContext(DataContext);
  const { singleProduct, singleProductUse } = contextValue ?? {};
  const productId = id ? parseInt(id, 10) : null;
  if (!contextValue) {
    return <div>Loading...</div>;
  }
  const { language } = contextValue;

  useEffect(() => {
    if (productId !== null) {
      singleProduct?.(productId);
    }
  }, [productId, singleProduct]);

  useEffect(() => {}, []);

  const handleAddToCart = () => {
    if (singleProductUse) {
      const newItem: CartItem = {
        id: singleProductUse.id,
        name: singleProductUse.name,
        people: singleProductUse.people,
        price: singleProductUse.price,
        category: singleProductUse.category,
        description: singleProductUse.description,
        imgUrl: singleProductUse.imgUrl,
        quantity: singleProductUse.quantity,
      };
      contextValue?.singleAddCard?.(newItem);
      let message = "";
      {
        language.uzb
          ? (message = singleProductAr.messageu)
          : language.rus
          ? (message = singleProductAr.messager)
          : (message = singleProductAr.messagee);
      }
      Notiflix.Notify.success(message);
    }
  };

  if (!singleProductUse) {
    return <div>Loading...</div>;
  }

  return (
    <section id="prodetails">
      <div className="single-pro-img">
        <img
          src={singleProductUse.imgUrl[0]}
          width="100%"
          id="mainImg"
          alt={singleProductUse.name}
        />
      </div>

      <div className="single-pro-details">
        <h6>
          {language.uzb
            ? singleProductAr.h6u
            : language.rus
            ? singleProductAr.h6r
            : singleProductAr.h6e}
          / {singleProductUse.category}
        </h6>
        <h4>{singleProductUse.name}</h4>
        <h2>{singleProductUse.price} UZS</h2>
        <button onClick={handleAddToCart}>
          {language.uzb
            ? singleProductAr.btnu
            : language.rus
            ? singleProductAr.btnr
            : singleProductAr.btne}
        </button>
        <h4>
          {language.uzb
            ? singleProductAr.h4u
            : language.rus
            ? singleProductAr.h4r
            : singleProductAr.h4e}
        </h4>
        <span>{singleProductUse.description}</span>
      </div>
    </section>
  );
}

export default SinglePage;
