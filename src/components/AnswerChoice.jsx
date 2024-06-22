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
        type="radio"
        id={id}
        name={name}
        value={answerText}
        onChange={() => handleChange(questionId, answerText)}
      />
      <label htmlFor={id} style={styles}>
        {answerText}
      </label>
    </div>
  );
}
