export default function ScoreFooter({
  correctScore,
  questionCount,
  resetGame,
}) {
  return (
    <footer className="footer">
      <p className="footer__score">
        {`You answered ${correctScore} out of ${questionCount} questions
      correctly.`}
      </p>
      <button
        className="button button--primary"
        type="button"
        onClick={resetGame}
        tabIndex={0}
      >
        Play again
      </button>
    </footer>
  );
}
