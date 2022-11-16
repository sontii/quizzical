import React from 'react';
import { decode } from "html-entities";

export default function Game(props) {

    const quizElement = props.quizData.map((quiz) => (
			<div className="quiz-box" key={quiz.id}>
				<div className="quiz-question">
					<span>{decode(quiz.question)}</span>
				</div>
				<div className="buttons-container">
					{quiz.allAnswer.map((answ) => {
						return <button onClick={props.selectAnswer} key={answ.keys}>{decode(answ.answer)}</button>;
					})}
				</div>
				<hr></hr>
			</div>
		));

    return (
			<div>
				{quizElement}
			</div>
		);
};
