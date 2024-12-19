import { initialArray, winningCombos } from './constant.ts';
import { useEffect, useState } from 'react';

import styles from './tictactoe.module.css';

type SquareValue = number | null;
interface SquaresProps {
  value: SquareValue;
  iTh: number;
  onEntry: (iTh: number) => void;
}

const App: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(initialArray);
  const [isX, setIsX] = useState(false);
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [[xWins, oWins, draw], setPlayerWins] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    computeWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  useEffect(() => {
    if (winner === 'X') {
      setPlayerWins([xWins + 1, oWins, draw]);
    } else if (winner === 'O') {
      setPlayerWins([xWins, oWins + 1, draw]);
    } else if (winner === null && squares.filter((square) => square === null).length === 0) {
      setPlayerWins([xWins, oWins, draw + 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner, squares]);

  const computeWin = () => {
    setIsX(!isX);
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a] === 1 ? 'X' : 'O');
        return;
      }
    }
  };

  const onEntry = (iTh: number) => {
    if (squares[iTh] === null && winner === null) {
      setSquares((prevSquares) => {
        const _prevSquares = [...prevSquares];
        _prevSquares[iTh] = isX ? 1 : 0;
        return _prevSquares;
      });
    }
  };

  const rematch = () => {
    setSquares(initialArray);
    setWinner(null);
  };

  return (
    <div className={styles['container']}>
      <div>
        Status: {winner ? `Winner ${winner}` : 'Playing'}
        <div className={styles['container']}>
          <div className={styles['mx-5']}>
            <div>X</div>
            <div>{xWins} Wins</div>
          </div>
          <div className={styles['mx-5']}>
            <div>O</div>
            <div>{oWins} Wins</div>
          </div>
          <div>
            <div>=</div>
            <div>{draw} Draws</div>
          </div>
        </div>
        <div className={styles['grid-container']}>
          {squares.map((square, i) => (
            <Squares key={i} iTh={i} value={square} onEntry={onEntry} />
          ))}
        </div>
        <button onClick={rematch}>Rematch</button>
      </div>
    </div>
  );
};

const Squares: React.FC<SquaresProps> = ({ value, iTh, onEntry }) => {
  useEffect(() => {
    console.log({ value });
  }, [value]);

  const handleClick = () => {
    onEntry(iTh);
  };

  return (
    <div className={styles['grid-item']} onClick={handleClick}>
      <div style={{ opacity: value !== null ? 1 : 0, transition: 'all .1s ease-in-out' }}>
        {value !== null ? (value === 1 ? 'X' : 'O') : 'X'}
      </div>
    </div>
  );
};

export default App;