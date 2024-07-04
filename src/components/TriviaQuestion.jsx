import AnswerChoice from './AnswerChoice';
import { decode } from 'html-entities';
import '../styles/triviaquestion.css';

export default function TriviaQuestion({
  questionObj,
  questionIndex,
  isSubmitted,
  handleChange,
  handleKeyDown,
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
        handleKeyDown={handleKeyDown}
        isSubmitted={isSubmitted}
      />
    );
  });

  return (
    <fieldset className="trivia-question" disabled={isSubmitted}>
      <legend className="trivia-question__question-text">
        {decode(question)}
      </legend>
      <div className="answer-choices-wrapper">{answerChoiceElements}</div>
    </fieldset>
  );
}
