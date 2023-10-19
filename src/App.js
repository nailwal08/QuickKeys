import { generate as demoTxt } from 'random-words';
import React, { useState } from 'react';
import Timer from './components/Timer';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [wordNums, setWordNums] = useState(100);
  const [seconds, setSeconds] = useState(60);
  const [words, setWords] = useState([]);
  const [timer, setTimer] = useState(seconds);
  const [inputWord, setInputWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [charIndex, setCharIndex] = useState(-1);
  const [char, setChar] = useState('');
  const [inCorrect, setInCorrect] = useState(0);
  const [status, setStatus] = useState('start');


  const startTimer = () => {
    if (status === 'disable') {
      setWords(generateWords());
      setWordIndex(0);
      setCorrect(0);
      setInCorrect(0);
      setStatus('enable');
      setCharIndex(-1);
      setChar('');
    }

    if (status === 'start') {
      setStatus('enable');
      setWords(generateWords())
      let time = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setStatus('disable');
            clearInterval(time);
            setInputWord('');
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
  };

  const generateWords = () => {
    const wordsArray = [];
    while (wordsArray.length < wordNums) {
      const randomWord = demoTxt();
      wordsArray.push(randomWord);
    }
    return wordsArray;
  };


  const handleInput = (event) => {

    if (event.key === ' ') {
      checkMatch();
      setInputWord('');
      setWordIndex(wordIndex + 1);
      setCharIndex(-1);



    } else if (event.key === 'Backspace') {
      setCharIndex(charIndex - 1);
      setChar('');



    } else {
      setCharIndex(charIndex + 1);
      setChar(event.key);

    }
  };

  const checkMatch = () => {
    const wordToCompare = words[wordIndex];
    const doesItMatch = wordToCompare === inputWord.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(inCorrect + 1);
    }
  };

  const getCharClass = (wordInd, CharInd, character) => {
    if (wordInd === wordIndex && CharInd === charIndex && char && status !== 'disable') {
      if (character === char) {
        return 'has-background-success';
      } else {
        return 'has-background-danger';
      }
    } else if (wordInd === wordIndex && charIndex >= words[wordIndex].length) {
      return 'has-background-danger';
    }
  };

  const numberChange = (event) => {
    const inputValue = event.target.value;
    setSeconds(inputValue);
    setTimer(inputValue);
  };

  const wordNumChange = (event) => {
    const wordValue = event.target.value;
    setWordNums(wordValue);
  };

  return (
    <>
      <NavBar />
      <Timer status={status} timer={timer} />

      {status === 'enable' && (
        <div className='inputSection'>
          <input disabled={status === 'disable'} type='text' onKeyDown={handleInput} value={inputWord} onChange={(event) => setInputWord(event.target.value)} />
        </div>

      )}



      {status === 'start' && (
        <div className='selectTimeWord'>
          <span>
            <span>Set Timer : </span>
            <input className='inputword' type='number' value={seconds} defaultValue={seconds} onChange={numberChange} />
          </span>
          <span>
            <span>Set Words Count : </span>
            <input className='inputword' type='number' defaultValue={wordNums} value={wordNums} onChange={wordNumChange} />
          </span>
        </div>
      )}


      {status === 'enable' && (
        <div className='randomWords'>
          {words.map((word, i) => (
            <span key={i}>
              {word.split('').map((char, idx) => (
                <span className={getCharClass(i, idx, char)} key={idx}>
                  {char}
                </span>
              ))}
              <span> </span>
            </span>
          ))}
        </div>
      )}

      {status === 'enable' && (
        <div className='buttonStop'>
          <button onClick={() => window.location.reload()}>Stop Practicing</button></div>

      )}
      <div className='buttonStart'>
        {status === 'start' && (<>
          <span>Configure the timer, select the desired word count, and then press the "Start Practice" button.</span>
          <button onClick={() => startTimer()}>
            Start Practicing
          </button></>
        )}

      </div>

      {status === 'disable' && (
        <div className='Result'>
          <div className='resultportion'>
            <p className='resultText'>Words Per Minute : </p>
            <p className='ResultValue'>{correct + inCorrect}</p>
          </div>
          <div className='resultportion'>
            <p className='resultText'>Accuracy : </p>
            <p className='ResultValue'>{Math.round((correct / (correct + inCorrect)) * 100)}%</p>
          </div>
        </div>
      )}
      {status === 'disable' && (
        <div className='Result'>
          <div className='resultportion'>
            <p className='resultText'>Correct Words : </p>
            <p className='ResultValue'>{correct}</p>
          </div>
          <div className='resultportion'>
            <p className='resultText'>Incorrect words : </p>
            <p className='ResultValue'>{inCorrect}</p>
          </div>
        </div>
      )}
      {status === 'disable' && (
        <div className='buttonRetry'>
          <button onClick={() => window.location.reload()}>Attempt Again</button></div>

      )}
      {(status === 'start' || status === 'disable') && (<>


      </>
      )}



      {status === 'start' && (
        <div className='HowToPlay'>


          <ol>


            <center><strong> Instructions :</strong> </center>

            <li>
              <strong>Initialization:</strong>  A countdown timer will be initiated, and a random assortment of words will be displayed on the screen.
            </li>
            <li>
              <strong>Word Typing:</strong> Engage in rapid and error-free typing of the presented words. Each word should be entered accurately and followed by a space.
            </li>
            <li>
              <strong>Tracking Accuracy and Speed:</strong> The app diligently monitors your typing accuracy and speed. Successfully entered words contribute to your score, while any inaccuracies are counted as errors.
            </li>
            <li>
              <strong>Time Limit:</strong> The app imposes a specific time constraint within which you must strive to type as many words as possible.
            </li>
            <li>
              <strong>Feedback and Results:</strong> You will receive detailed feedback on your performance, including your words per minute (WPM) score and accuracy percentage.
            </li>
            <li>
              <strong>Retry Option:</strong> If you wish to improve your score or engage in another challenge, you have the option to retry the game and aim for a higher WPM and increased accuracy.
            </li>
          </ol>


        </div>
      )}
      <p className="foot-content">Made With ♥ by Nikhil Nailwal</p>

    </>
  );

}

export default App;
