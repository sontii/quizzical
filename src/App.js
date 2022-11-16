import React from 'react';
import Game from "./components/Game"
import blob_yellow from "./images/blob-yellow.png"
import blob_blue from "./images/blob-blue.png";
import { nanoid } from 'nanoid';

function App() {

  const [running, setRunning] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  
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
		const apiUrl = "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple"
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
	}, []);

	function selectAnswer() {
		console.log("clicked")
	}

  return (
		<main>
			<img className="blob-yellow" src={blob_yellow} alt="just a blob" />
			<img className="blob-blue" src={blob_blue} alt="just a blob" />

			{running ? 
				<div className='quiz-all'>
					<Game 
					quizData={quizData}
					selectAnswer={()=> selectAnswer()}
					/>
				</div>
			 :
				<div className="title">
					<h3>Quizzical</h3>
					<p>Some description if needed</p>
					<button onClick={() => setRunning(true)} className="start-button">
						Start quiz
					</button>
				</div>
			}
		</main>
	);
}

export default App;
