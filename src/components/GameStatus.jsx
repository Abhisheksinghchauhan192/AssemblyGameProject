import clsx from 'clsx'
import { getFarewellText } from '../utils/utils'


export default function GameStatus(props) {


  if (!props.isGameOver && props.isLastGuessIncorrect) {
    return (
      <p className="farewell-message">
        {getFarewellText(props.languages[props.wrongGuessCount - 1].name)}
      </p>
    );
  }

  if (props.isGameWon) {
    return (
      <>
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </>
    );
  }
  if (props.isGameLost) {
    return (
      <>
        <h2>Game over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </>
    );
  }

  return null;
}
