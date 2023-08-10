import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SinglePage from "./pages/singlePage/SinglePage";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import CheckOut from "./pages/ceckOut/CheckOut";
import Booking from "./pages/booking/Booking";
import Sucses from "./components/sucses/Sucses";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop/*" element={<Shop />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/product/:id" element={<SinglePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Checkout" element={<CheckOut />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Succes" element={<Sucses />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
