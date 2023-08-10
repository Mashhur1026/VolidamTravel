import { useNavigate } from "react-router-dom";
import "./code.css";
import { useState } from "react";

function Code() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const handleClick = () => {
    console.log(code);
    navigate("/Succes");
  };

  return (
    <div className="code">
      <div className="blure">
        <input
          type="number"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="SMS kodni kiriting"
        />
        <button onClick={handleClick}>Jonatish</button>
      </div>
    </div>
  );
}

export default Code;
