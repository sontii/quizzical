import React from 'react';
import Game from "./components/Game"
import blob_yellow from "./images/blob-yellow.png"
import blob_blue from "./images/blob-blue.png";
import { nanoid } from 'nanoid';

function App() {

  const [running, setRunning] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [countAnswer, setCountAnswer] = React.useState(0)
  const [newGame, setNewGame] = React.useState(false)
  const [checkAnswer, setCheckAnswer] = React.useState(false);
  
	function generateAnswers(quiz){
		//map over single quiz and push answers to new array
		const _ = require("lodash"); 
		const answers = []
		
		answers.push({
			answer: quiz.correct_answer,
			correct: true,
			keys: nanoid(),
			isSelected: false,
		});

		const incorrect = quiz.incorrect_answers.map(answer => {
			answers.push({
				answer: answer,
				correct: false,
				keys:nanoid(),
				isSelected: false
				})
		})

		// shuffle index for quiz buttons
		let allAnswer = _.shuffle(answers);
		const newQuiz = { ...quiz, allAnswer };
		return newQuiz
	}

  React.useEffect(() => {
    
	//fetch
    const fetchData = async () => {
      try {
		const apiUrl = "https://opentdb.com/api.php?amount=4&category=9&difficulty=easy&type=multiple"
		const response = await fetch(apiUrl);
		const json = await response.json();

		//add unique id for every quiz (child render)
		const jsonId = json.results.map(quiz => {
			return {...quiz, id: nanoid()}
		})

		//mutate JSON merge correct and incorrect array 
		//with boolean and unique id for buttons
		const mutateJson = jsonId.map(quiz => generateAnswers(quiz))
		setQuizData(mutateJson);
		
		} catch (error) {
			console.log("error: ", error);
		}
	};
	fetchData();

	}, [newGame]);

	React.useEffect(() => {
		//count right answers
		let counter = 0
		quizData.map(quiz => quiz.point ? counter++ : null)
		setCountAnswer(counter)
		
	}, [quizData]);

	function selectAnswer(key, id) {
		const newArray = [...quizData]
		// slected answer check correct or not, add point to array for count correts
		const mutate = newArray.map(quiz => {
			if (quiz.id === id ){
				quiz.allAnswer.map((answer, index) => {
					if(answer.keys === key) {
						answer['isSelected'] = true
						if(answer.correct === true) {
							quiz["point"] = true
						} else {
							quiz["point"] = false
						}
					} else {
						answer["isSelected"] = false;
					}
				})
			} 
			return quiz
			
		})
		setQuizData(mutate)
	}
	
	function playGame() {
		setRunning(true)
		setNewGame(true)
	}

	function checkingAnswer() {
		setCheckAnswer(true)
	}

	function playAgain() {
		setCheckAnswer(false)
		setNewGame(false)
	}

  return (
		<main>
			<img
				className={`blob-yellow${running === true ? " shrink-yellow" : ""}`}
				src={blob_yellow}
				alt="just a blob"
			/>
			<img
				className={`blob-blue${running === true ? " shrink-blue" : ""}`}
				src={blob_blue}
				alt="just a blob"
			/>

			{running ? (
				<Game
					quizData={quizData}
					selectAnswer={selectAnswer}
					checkAnswer={checkAnswer}
					running={running}
					countAnswer={countAnswer}
					newGame={newGame}
					playGame={playGame}
					checkingAnswer={checkingAnswer}
					playAgain={playAgain}
				/>
			) : (
				<div className="title">
					<h3>Quizzical</h3>
					<p>Some description if needed</p>
					<button onClick={() => playGame()} className="start-button">
						Start quiz
					</button>
				</div>
			)}
		</main>
	);
}

export default App;
