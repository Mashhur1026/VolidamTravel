import "./code.css";

function Code({code, setCode, handleClick}) {

  return (
    <div className="code">
      <input
        type="number"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="SMS kodni kiriting"
      />
      <button onClick={handleClick}>Jonatish</button>
    </div>
  );
}

export default Code;
