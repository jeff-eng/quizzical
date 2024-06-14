import { useEffect, useState } from 'react';
import AnswerChoice from './AnswerChoice';

export default function TriviaQuestion({ questionObj, questionIndex }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerChoices, setAnswerChoices] = useState([]);

  // Shuffle array containing both incorrect and correct answers (only on first render)
  useEffect(() => {
    const shuffledAnswerChoices = shuffleArray([
      ...questionObj.incorrect_answers,
      questionObj.correct_answer,
    ]);

    setAnswerChoices(shuffledAnswerChoices);
  }, []);

  const answerChoiceElements = answerChoices.map((choice, index) => {
    return (
      <AnswerChoice
        key={index}
        id={`${questionObj.id}__${index}`}
        answerText={choice}
        name={`question${questionIndex}`}
      />
    );
  });

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <article>
      <fieldset>
        <legend>{questionObj.question}</legend>
        {answerChoiceElements}
      </fieldset>
    </article>
  );
}
