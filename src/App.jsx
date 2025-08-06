import "./App.css"
import Intro from "./components/Intro"
import GameStatus from "./components/GameStatus"
import {languages} from './data/languages'
import Chips from "./components/Chips"
import { useState } from "react"
import Keyboard from "./components/Keyboard"
import Confetti from "react-confetti"
import clsx from "clsx"
import { getRandomWord } from "./utils/utils"

function App(){
  // state variables 
  const [currentWord,setCurrentWord] = useState(()=>getRandomWord())
  const [guessedWord,setGuessedWords] = useState([])

  //derived variables
      const numGuessesLeft = languages.length - 1
      const wrongGuessCount =
          guessedWord.filter(letter => !currentWord.includes(letter)).length
      const isGameWon =
          currentWord.split("").every(letter => guessedWord.includes(letter))
      const isGameLost = wrongGuessCount >= numGuessesLeft
      const isGameOver = isGameWon || isGameLost
      const lastGuessedLetter = guessedWord[guessedWord.length - 1]
      const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  // elements on the page. 

  const chipsElements = languages.map((lang,index)=>{

    const isLanguageLost = index<wrongGuessCount
    const styles = {
      backgroundColor:lang.backgroundColor,
      color:lang.color
    }
    const className = clsx({
      chips:true,
      lost:isLanguageLost
    })

    return (
      <Chips key={lang.name}  styles = {styles} className={className} >{lang.name}</Chips>
    )
  })


  const letterElements = currentWord.split("").map((letter,index)=>{
   const shouldRevealLetter = isGameLost || guessedWord.includes(letter)
   const letterClassName = clsx(
    "letters",isGameLost && !guessedWord.includes(letter) &&"missed-letter"
   )

   return <span key={index} className={letterClassName}>{shouldRevealLetter?letter.toUpperCase():""}</span>
})

  function addGuessedLetter(letter){

    setGuessedWords(prevLetters=> prevLetters.includes(letter) ?prevLetters:[...prevLetters,letter])
  }

  // function for vibration on mobile devices 
  function newGameHandler(){
    if(navigator.vibrate)
        navigator.vibrate(150)
    setCurrentWord(getRandomWord())
    setGuessedWords([])
  }

  // css class for game status bar 
    const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  return (
    <main>
      { isGameWon && <Confetti

          recycle={false}
          numberOfPieces={2500}
          
      />}

    <header>
      <Intro/>
      <section
      aria-live="polite"
      role="status"
      className={gameStatusClass}>
        <GameStatus 
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          isGameOver={isGameOver}
          isLastGuessIncorrect={isLastGuessIncorrect}
          wrongGuessCount={wrongGuessCount}
          languages={languages}
        />
      </section>

    </header>
    <section className="chips-container">
    {chipsElements}
    </section>
    <section className="letters-container">
      {letterElements}
    </section>

    <section className="keyboard">
      <Keyboard 
      addLetters={addGuessedLetter}
      currentWord={currentWord}
      guessedWord = {guessedWord}
      isGameOver={isGameOver}
      />
    </section>

    {isGameOver && <button onClick={newGameHandler} className="new-game">New Game</button>}
    </main>
  )
}



export default App