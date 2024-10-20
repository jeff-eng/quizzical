export default function Footer({ areAllAnswered, handleClick }) {
  return (
    <footer className="footer">
      {!areAllAnswered ? (
        <p>Not all questions have been answered yet.</p>
      ) : (
        <p></p>
      )}
      <button
        className="button button--primary"
        type="button"
        onClick={handleClick}
        disabled={!areAllAnswered}
      >
        Check answers
      </button>
    </footer>
  );
}
