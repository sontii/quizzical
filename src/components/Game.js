import React from 'react';
import { decode } from "html-entities";

export default function Game(props) {

    const quizElement = props.quizData.map((quiz) => (
			<div className="quiz-box" key={quiz.id}>
				<div className="quiz-question">
					<span>{decode(quiz.question)}</span>
				</div>
				<div className="buttons-container">
					{quiz.allAnswer.map((answ) => (
						<button
						// style with classNames if selected or checking the answers
							className={`answer-button ${
								answ.isSelected === true ? "button-selected" : ""
							} 
							${props.checkAnswer === true && answ.correct ? "button-check-correct" : ""}
							${
								props.checkAnswer === true && answ.isSelected && !answ.correct
									? "button-check-incorrect"
									: ""
							}
							${props.checkAnswer === true && !answ.correct ? "button-check-notCorrect" : ""}
							`}
							onClick={() => props.selectAnswer(answ.keys, quiz.id)}
							key={answ.keys}
						>
							{decode(answ.answer)}
						</button>
					))}
				</div>
				<hr></hr>
			</div>
		));
	

    return (
			<div className="quiz-wrap">
				<div>{quizElement}</div>
				<div className="check-container">
					{props.checkAnswer === false ? (
						<button onClick={props.checkingAnswer} className="check-button">
							Check answear
						</button>
					) : (
						<div>
							<span>
								You scored {props.countAnswer + " / " + props.quizData.length}{" "}
								correct answers
							</span>
							<button
								onClick={props.playAgain}
								className="check-button play-button"
							>
								Play again
							</button>
						</div>
					)}
				</div>
			</div>
		);
};
