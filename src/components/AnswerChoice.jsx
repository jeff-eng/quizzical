export default function AnswerChoice(props) {
  return (
    <div>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
      <label htmlFor="answerChoice1">{props.value}</label>
    </div>
  );
}
