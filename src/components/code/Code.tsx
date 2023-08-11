import "./code.css";

interface CodeProps {
  code: string;
  setCode: (code: string) => void;
  handleClick: () => void;
}

function Code({ code, setCode, handleClick }: CodeProps) {
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
