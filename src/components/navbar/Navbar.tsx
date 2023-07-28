import "./nav.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { navArray } from "../../date/date";
import DataContext from "../../DataContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }

  const { check, setGetLenguage } = contextValue;

  return (
    <section id="header">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dmu4nnfdg/image/upload/v1689944797/volidam_oq_3-removebg-preview_1_vhvqvf.png"
          className="logo"
          alt="logo"
        />
      </Link>

      <div>
        <ul id="navbar" className={isOpen ? "active" : ""}>
          {check(navArray).map((item: any) => (
            <li key={item.name}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
          <Link to="/Cart" id="lg-bag">
            <i className="far fa-shopping-bag"></i>
          </Link>
          <a id="close" onClick={() => setIsOpen(false)}>
            <i className="far fa-times"></i>{" "}
          </a>
          <select
            onChange={(e) => setGetLenguage(e.target.value)}
            className="language"
          >
            <option value="uzb">Uzb</option>
            <option value="eng">Eng</option>
            <option value="rus">Rus</option>
          </select>
        </ul>
      </div>

      <div id="mobile">
        <Link to="/Cart">
          <i className="far fa-shopping-bag"></i>
        </Link>
        <i
          id="bar"
          className="fas fa-outdent"
          onClick={() => setIsOpen(true)}
        ></i>
      </div>
    </section>
  );
}

export default Navbar;
