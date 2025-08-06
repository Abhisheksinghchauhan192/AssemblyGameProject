import clsx from "clsx";

export default function Keyboard({
  addLetters,
  currentWord,
  guessedWord,
  isGameOver,
}) {
    
  const letters = "abcdefghijklmnopqrstuvwxyz";

  function handleVibration(char) {
    if (navigator.vibrate) {
      if(!currentWord.split("").includes(char))
        navigator.vibrate(200)
      else
        navigator.vibrate(50)
    }
  }

  const keyboardElements = letters.split("").map((char) => {
    const isGuessed = guessedWord.includes(char);
    const isCorrect = isGuessed && currentWord.includes(char);
    const isWrong = isGuessed && !currentWord.includes(char);

    const className = clsx({
      keyboardKey: true,
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        onClick={() => {
          handleVibration(char);
          addLetters(char);
        }}
        key={char}
        disabled={isGameOver}
        className={className}
      >
        {char.toUpperCase()}
      </button>
    );
  });

  return <>{keyboardElements}</>;
}
