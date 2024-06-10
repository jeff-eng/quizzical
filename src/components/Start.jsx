export default function Start({ startGame }) {
  return (
    <header>
      <h1>Quizzical</h1>
      <p>
        A quiz game featuring random questions across various categories,
        designed to challenge your knowledge and entertain players of all ages.
      </p>
      <button onClick={startGame}>Start quiz</button>
    </header>
  );
}
