import AnswerChoice from './AnswerChoice';
import { decode } from 'html-entities';

export default function TriviaQuestion({
  questionObj,
  questionIndex,
  isSubmitted,
  handleChange,
}) {
  const { shuffledArray, id, correctAnswer, question, selectedAnswer } =
    questionObj;

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

  return (
    <fieldset disabled={isSubmitted}>
      <legend>{decode(question)}</legend>
      {answerChoiceElements}
    </fieldset>
  );
}
