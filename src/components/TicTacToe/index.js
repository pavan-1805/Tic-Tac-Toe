import React, { useEffect, useState } from "react";
import "./index.css";
const TicTacToe = () => {
  const [flag, setFlag] = useState(true);
  const [resetFlag, setFesetFlag] = useState(false);
  const [counter, setCounter] = useState(0);
  const [winner, setWinner] = useState("");
  const [matchDraw, setMatchDraw] = useState(false);
  const [boxes, setBoxes] = useState([
    {
      row: 1,
      rowData: [
        {
          id: 0,
          value: "",
          disabled: false,
        },
        {
          id: 1,
          value: "",
          disabled: false,
        },
        {
          id: 2,
          value: "",
          disabled: false,
        },
      ],
    },
    {
      row: 2,
      rowData: [
        {
          id: 3,
          value: "",
          disabled: false,
        },
        {
          id: 4,
          value: "",
          disabled: false,
        },
        {
          id: 5,
          value: "",
          disabled: false,
        },
      ],
    },
    {
      row: 3,
      rowData: [
        {
          id: 6,
          value: "",
          disabled: false,
        },
        {
          id: 7,
          value: "",
          disabled: false,
        },
        {
          id: 8,
          value: "",
          disabled: false,
        },
      ],
    },
  ]);
  const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  useEffect(() => {
    if (counter > 2) {
      checkWinner();
    }
    if(counter == 9 && winner =='') setMatchDraw(true)
  }, [counter]);

  const disableButtons = () => {
    let tempBoxes = boxes;
    let res = [];
    tempBoxes.map((boxRow) => {
      let data = boxRow.rowData.map((box) => {
        box.disabled = true;
        return box;
      });
      res.push({ row: boxRow.row, rowData: data });
    });
    setBoxes(res);
  };

  const checkWinner = () => {
    let position1;
    let position2;
    let position3;
    winningPatterns.forEach((pattern) => {
      boxes.forEach((boxRow) => {
        boxRow.rowData.forEach((box) => {
          if (box.id === pattern[0]) {
            position1 = box.value;
          }
        });
      });
      boxes.forEach((boxRow) => {
        boxRow.rowData.forEach((box) => {
          if (box.id === pattern[1]) {
            position2 = box.value;
          }
        });
      });
      boxes.forEach((boxRow) => {
        boxRow.rowData.forEach((box) => {
          if (box.id === pattern[2]) {
            position3 = box.value;
          }
        });
      });

      if (
        position1 != "" &&
        position2 != "" &&
        position3 != "" &&
        position1 == position2 &&
        position2 == position3
      ) {
        setWinner(position1);
        disableButtons();
      }
    });
  };

  const setBoxValue = (rowId, boxId) => {
    let tempBoxes = boxes;
    let res = [];
    tempBoxes.map((boxRow) => {
      if (boxRow.row === rowId) {
        let data = boxRow.rowData.map((box) => {
          if (box.id === boxId) {
            if (flag) {
              box.value = "X";
              setFlag(false);
            } else {
              box.value = "O";
              setFlag(true);
            }
          }
          return box;
        });
        res.push({ row: rowId, rowData: data });
      } else {
        res.push(boxRow);
      }
    });
    setBoxes(res);
    setFesetFlag(true);
    setCounter(counter + 1); //getting if i use increment operator
  };

  const reset = () => {
    let tempBoxes = boxes;
    let res = [];
    tempBoxes.map((boxRow) => {
      let data = boxRow.rowData.map((box) => {
        box.disabled = false;
        box.value = "";
        return box;
      });
      res.push({ row: boxRow.row, rowData: data });
    });
    setBoxes(res);
    setWinner("");
    setCounter(0);
    setFlag(true);
    setMatchDraw(false)
    setFesetFlag(false);
  };
  return (
    <div>
      <h3 className="heading">Tic Tac Toe</h3>
      <div className="box-container">
        {boxes.map(({ row, rowData }, index) => (
          <div key={index} className="box-row">
            {rowData.map(({ id, value, disabled }) => (
              <div
                className={
                  ["X", "O"].includes(value) || disabled ? "disable-div" : "box"
                }
                id={id}
                key={id}
                onClick={() => setBoxValue(row, id)}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="reset-container">
        {resetFlag && (
          <div className="reset" onClick={reset}>
            Reset
          </div>
        )}
      </div>
      {(winner || matchDraw) && (
        <div className="winner-container">
          {(matchDraw && !['X','O'].includes(winner)) ? (
            <div className="winner">Match Draw</div>
          ) : (
            <div className="winner">
              WINNER:<stron className="winner-label">{winner}</stron>
            </div>
          )}
          <div className="play-again" onClick={reset}>
            Play Again
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
