import { useContext, useState } from "react";
import DataContext from "../../DataContext";
import "./checkout.css";

function CheckOut() {
  const contextValue = useContext(DataContext);
  const cartItems = contextValue ? contextValue.cartItems : [];
  const total = contextValue ? contextValue.total : 0;

  interface FormValues {
    ismingiz: string;
    familiyangiz: string;
    telefon: string;
    qoshmcha: string;
  }

  const [formValues, setFormValues] = useState<FormValues>({
    ismingiz: "",
    familiyangiz: "",
    telefon: "",
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form values:", formValues);
    console.log("Total:", total);
    console.log("Cart items:", cartItems);
  };

  return (
    <>
      <section id="chechout">
        <h1>Checkout</h1>
        <table width="100%">
          <thead>
            <tr>
              <td>Rasm</td>
              <td>Nomi</td>
              <td>Narx</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imgUrl[0]} alt="" />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section id="checkoutTotal">
        <div id="subtotal">
          <h3>Cart Total</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>${total}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div></div>
        </div>
      </section>
      <section id="checkout-form-details">
        <form onSubmit={handleSubmit}>
          <h2>Buyurtma uchun kerakli Malumotlar</h2>
          <span>Iltmos anqlik blan toldring</span>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Isminggiz"
            name="ismingiz"
            required
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Familiyanggiz"
            name="familiyangiz"
            required
          />
          <input
            onChange={handleChange}
            placeholder="Telefon Raqaminggiz"
            name="telefon"
            type="tel"
            required
          />
          <textarea
            onChange={handleChange}
            placeholder="Qoshmcha malumot"
            name="qoshmcha"
          ></textarea>
          <button>Submit</button>
        </form>
      </section>
    </>
  );
}

export default CheckOut;
