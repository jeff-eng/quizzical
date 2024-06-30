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
            : 'answer__label';

  return (
    <div>
      <input
        className="answer__radio-btn"
        type="radio"
        id={id}
        name={name}
        value={answerText}
        onChange={() => handleChange(questionId, answerText)}
      />
      <label className={answerLabelClasses} htmlFor={id}>
        {decode(answerText)}
      </label>
    </div>
  );
}
