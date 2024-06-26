import '../styles/start.css';
import '../styles/base.css';

export default function Start({ startGame }) {
  return (
    <header className="start-header">
      <h1 className="start-header__heading">Quizzical</h1>
      <p className="start-header__description">
        A quiz game featuring random questions across various categories,
        designed to challenge your knowledge and entertain players of all ages.
      </p>
      <button className="start-header__button button" onClick={startGame}>
        Start quiz
      </button>
    </header>
  );
}
