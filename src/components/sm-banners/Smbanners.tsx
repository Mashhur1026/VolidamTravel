import { useContext } from "react";
import "./smbanners.css";
import DataContext from "../../DataContext";
import { bannerArray, smArray } from "../../date/date";

interface Prop {
  id: number;
  h4: string;
  h2: string;
  span: string;
}

interface Prop2 {
  id: number;
  h4: string;
  h2: string;
}

function Smbanners() {
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    throw new Error("Context is not defined");
  }

  const { check } = contextValue;

  return (
    <>
      <section id="sm-banner">
        {check(smArray).map((smbanner: Prop) => (
          <div key={smbanner.id} className="banner-box">
            <h4>{smbanner.h4}</h4>
            <h2>{smbanner.h2}</h2>
            <span>{smbanner.span}</span>
          </div>
        ))}
      </section>
      <section id="banner3">
        {check(bannerArray).map((banner: Prop2) => (
          <div key={banner.id} className="banner-box">
            <h2>{banner.h4}</h2>
            <h3>{banner.h2}</h3>
          </div>
        ))}
      </section>
    </>
  );
}

export default Smbanners;
