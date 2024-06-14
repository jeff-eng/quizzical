export default function AnswerChoice({ id, answerText, name }) {
  return (
    <div>
      <input type="radio" id={id} name={name} value={answerText} />
      <label htmlFor={id}>{answerText}</label>
    </div>
  );
}
