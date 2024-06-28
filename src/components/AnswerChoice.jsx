import { decode } from 'html-entities';
import '../styles/answerchoice.css';

export default function AnswerChoice({
  id,
  answerText,
  name,
  questionId,
  handleChange,
  isSubmitted,
  correctAnswer,
  selectedAnswer,
}) {
  let styles;

  if (isSubmitted && answerText === correctAnswer) {
    styles = {
      backgroundColor: '#AFE1AF',
    };
  } else if (
    isSubmitted &&
    selectedAnswer !== correctAnswer &&
    selectedAnswer === answerText
  ) {
    styles = {
      backgroundColor: '#FAA0A0',
    };
  }

  return (
    <div>
      <input
        className="answer__input"
        type="radio"
        id={id}
        name={name}
        value={answerText}
        onChange={() => handleChange(questionId, answerText)}
      />
      <label className="answer__label" htmlFor={id} style={styles}>
        {decode(answerText)}
      </label>
    </div>
  );
}
