export default function AnswerChoice({
  id,
  answerText,
  name,
  questionId,
  handleChange,
}) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        value={answerText}
        onChange={() => handleChange(questionId, answerText)}
      />
      <label htmlFor={id}>{answerText}</label>
    </div>
  );
}
