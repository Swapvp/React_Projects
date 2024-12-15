import  { useEffect, useState, FormEvent } from 'react';
import styles from './GuessNumber.module.css';

export default function App() {
  // State variables for the random number, user guess, and game status
  const [randomNumber, setRandomNumber] = useState<number | null>(null); // Stores the random number to guess
  const [guessDisabled, setGuessDisabled] = useState<boolean>(false); // Controls the "Check" button
  const [userGuess, setUserGuess] = useState<number>(1); // Stores the user's guess
  const [lowGuess, setLowGuess] = useState<boolean>(false); // Indicates if the guess is too low
  const [highGuess, setHighGuess] = useState<boolean>(false); // Indicates if the guess is too high
  const [correctGuess, setCorrectGuess] = useState<boolean>(false); // Indicates if the guess is correct

  // Initialize the random number when the component mounts
  useEffect(() => {
    setRandomNumber(Math.round(100 * Math.random()));
  }, []);

  // Handle user guess submission where we check if the user guess is lower, higher, or correct
  const handleGuess = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (randomNumber === null) return;

    if (userGuess < randomNumber) {
      setLowGuess(true);
      setHighGuess(false);
    } else if (userGuess > randomNumber) {
      setHighGuess(true);
      setLowGuess(false);
    } else {
      setCorrectGuess(true);
      setLowGuess(false);
      setHighGuess(false);
      setGuessDisabled(true);
    }
  };

  // Handle game restart where we generate a new random number and reset game state
  const handleRestart = () => {
    setRandomNumber(Math.round(100 * Math.random()));
    setCorrectGuess(false);
    setLowGuess(false);
    setHighGuess(false);
    setGuessDisabled(false);
    setUserGuess(1);
  };

  return (
    <div className={styles.app}>
      <form onSubmit={handleGuess}>
        <label htmlFor="input">Guess a Number between 0 and 100</label>
        <input
          id="input"
          type="number"
          value={userGuess}
          min="0"
          max="100"
          placeholder="Guess-Number"
          onChange={(e) => setUserGuess(Number(e.target.value))}
        />
        <div className={styles.widget}>
          <button type="button" onClick={handleRestart}>
            Reset
          </button>
          <button type="submit" disabled={guessDisabled}>
            Check
          </button>
        </div>
      </form>
      <div className={styles.text}>
        {lowGuess && (
          <p>
            Your guess is <b>Less</b> than the actual number
          </p>
        )}
        {highGuess && (
          <p>
            Your guess is <b>Higher</b> than the actual number
          </p>
        )}
        {correctGuess && (
          <p>
            Your guess is <b>right</b>
          </p>
        )}
      </div>
    </div>
  );
}
