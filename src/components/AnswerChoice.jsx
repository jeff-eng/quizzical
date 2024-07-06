import { decode } from 'html-entities';
import '../styles/answerchoice.css';

export default function AnswerChoice({
  id,
  answerText,
  name,
  questionId,
  handleChange,
  handleKeyDown,
  isSubmitted,
  correctAnswer,
  selectedAnswer,
}) {
  // Conditionally determine class for answer choice label styling
  const answerLabelClasses =
    isSubmitted && answerText === correctAnswer
      ? 'answer__label answer__label--correct'
      : isSubmitted &&
          selectedAnswer !== correctAnswer &&
          selectedAnswer === answerText
        ? 'answer__label answer__label--incorrect'
        : selectedAnswer === answerText
          ? 'answer__label answer__label--selected'
          : isSubmitted
            ? 'answer__label answer__label--unselected'
            : 'answer__label answer__label--hoverable';

  return (
    <div>
      <input
        className="answer__radio-btn"
        type="radio"
        id={id}
        name={name}
        value={answerText}
        onChange={() => handleChange(questionId, answerText)}
        disabled={isSubmitted}
      />
      <label
        className={answerLabelClasses}
        htmlFor={id}
        tabIndex={0}
        onKeyDown={event => handleKeyDown(event, questionId, answerText)}
      >
        {decode(answerText)}
      </label>
    </div>
  );
}
