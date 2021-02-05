
import React,{useState, useEffect, useRef} from 'react'
import './index.css';

function App() {
  const GAME_TIME = 5
  const [text, setText] = useState('')
  const [timeRemaining,setTimeRemaining] = useState(GAME_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [words,setWords] = useState(0)
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const {value} = e.target
    setText(value)
  }

  const countWords = (str) => {
    const wordsArr = str.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
 }

 const startGame = () => {
   setIsTimeRunning(true)
   setText('')
   setTimeRemaining(GAME_TIME)
   inputRef.current.disabled = false
   inputRef.current.focus()
 }

 const endGame = () => {
  setIsTimeRunning(false)
  setWords(countWords(text))
 }
 useEffect(()=> {
    if(isTimeRunning && timeRemaining > 0) {
      setTimeout(()=> {
      setTimeRemaining(time => time-1)
    },1000)
    } else if(timeRemaining === 0){
      endGame()
    }
 },[timeRemaining, isTimeRunning])
 
  return (
    <div className="App">
      <h1> Test your typing</h1>
      <textarea 
      onChange={handleChange}
      value={text}
      disabled={!isTimeRunning}
      ref={inputRef}
      />
      <h4>Remaining Time: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>Start</button>
      <h1>Word Count: {words}</h1>
    </div>
  );
}

export default App;
