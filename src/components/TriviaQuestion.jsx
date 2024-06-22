import { useEffect, useState } from 'react';
import AnswerChoice from './AnswerChoice';

export default function TriviaQuestion({
  questionObj,
  questionIndex,
  isSubmitted,
  handleChange,
}) {
  const { shuffledArray, id, correctAnswer, question, selectedAnswer } =
    questionObj;

  console.log(isSubmitted);
  console.log(selectedAnswer);

  const answerChoiceElements = shuffledArray.map((choice, index) => {
    return (
      <AnswerChoice
        key={index}
        id={`${id}__${index}`}
        answerText={choice}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        name={`question${questionIndex}`}
        questionId={id}
        handleChange={handleChange}
        isSubmitted={isSubmitted}
      />
    );
  });

  console.log(questionObj);

  return (
    <fieldset disabled={isSubmitted}>
      <legend>{question}</legend>
      {answerChoiceElements}
    </fieldset>
  );
}
