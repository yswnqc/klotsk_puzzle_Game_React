import React from "react";
import "./App.css";

function App() {
  const [array, setArray] = React.useState([]);
  const [index] = React.useState(Array.from({ length: 8 }, (_, i) => i + 1));
  const [num, setNum] = React.useState(Math.floor(Math.random() * 8));
  const [space, setSpace] = React.useState(num);
  const [solved, setSolved] = React.useState(false);

  const solve = () => {
    setSolved(true);
    setArray([...index, ""]);
    setSpace(8);
  };

  const reset = () => {
    setNum(() => {
      const newNum = Math.floor(Math.random() * 8);
      setSpace(newNum);
      return newNum;
    });
  };

  const handleMove = (i) => {
    solved & setSolved(false);
    if (
      i === space - 1 ||
      i === space + 1 ||
      i === space - 3 ||
      i === space + 3
    ) {
      setArray((prev) => {
        const newArray = [...prev];
        newArray[space] = prev[i];
        newArray[i] = "";
        return newArray;
      });
      setSpace(i);
    }
  };

  React.useEffect(() => {
    let shuffledIndex = [...index].sort(() => 0.5 - Math.random());
    while (JSON.stringify(index) === JSON.stringify(shuffledIndex)) {
      shuffledIndex = [...index].sort(() => 0.5 - Math.random());
    }
    shuffledIndex.splice(num, 0, "");
    setArray(shuffledIndex);
  }, [index, num]);

  React.useEffect(() => {
    if (!solved) {
      if (JSON.stringify([...index, ""]) === JSON.stringify(array)) {
        setTimeout(() => {
          alert("Congratulations!");
          reset();
        }, 500);
      }
    }
  }, [index, array, solved]);

  return (
    <div className="container">
      <h1>Klotski Puzzle</h1>
      <p>Click one piece to move.</p>
      <div className="slido">
        <div className="grid">
          {array.map((n, i) => (
            <div className="cell" key={i} onClick={() => handleMove(i)}>
              {n && <img src={`./assets/${n}.png`} alt={`assets/${n}.png`} />}
            </div>
          ))}
        </div>
      </div>
      <div className="btn">
        <button onClick={solve}>Solve</button>{" "}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
