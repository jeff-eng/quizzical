import { useEffect, useState } from 'react';
import TriviaQuestion from './Question';
import data from '../../data';
import { nanoid } from 'nanoid';

export default function Main() {
  // Trivia Question state here
  const [triviaQuestions, setTriviaQuestions] = useState([]);

  useEffect(() => {
    // const getTriviaQuestions = async () => {
    //   // const response = await fetch('https://opentdb.com/api.php?amount=5');
    //   // const data = await response.json();

    // };

    // getTriviaQuestions();

    // const trivia = data.results.map(question => {
    //   const randomInt = Math.floor(
    //     Math.random() * question.incorrect_answers.length,
    //   );
    //   console.log(randomInt);

    //   return { ...question, id: nanoid(), selectedAnswer: '' };
    // });

    const triviaObjects = data.results.map(triviaObj => {
      return {
        ...triviaObj,
        id: nanoid(),
        selectedAnswer: '',
      };
    });

    setTriviaQuestions(triviaObjects);
  }, []);

  const triviaQuestionElements = triviaQuestions.map((question, index) => (
    <TriviaQuestion
      key={question.id}
      questionObj={question}
      questionIndex={index}
    />
  ));

  return <main>{triviaQuestionElements}</main>;
}
