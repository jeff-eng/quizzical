import { useEffect, useState } from 'react';
import TriviaQuestion from './TriviaQuestion';
import { nanoid } from 'nanoid';
import ScaleLoader from 'react-spinners/ScaleLoader';
import '../styles/main.css';

export default function Main() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [areAllAnswered, setAreAllAnswered] = useState(false);
  const [correctScore, setCorrectScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [isFetchingTrivia, setIsFetchingTrivia] = useState(false);

  // CSS override for ScaleLoader
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  };

  useEffect(() => {
    setIsFetchingTrivia(true);
    // Async function to fetch new trivia questions
    async function getTriviaQuestions() {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5');
        const data = await response.json();
        const triviaArray = await data.results.map(triviaObj => {
          return {
            id: nanoid(),
            type: triviaObj.type,
            difficulty: triviaObj.difficulty,
            category: triviaObj.category,
            question: triviaObj.question,
            correctAnswer: triviaObj.correct_answer,
            incorrectAnswers: triviaObj.incorrect_answers,
            shuffledArray: shuffleArray([
              ...triviaObj.incorrect_answers,
              triviaObj.correct_answer,
            ]),
            selectedAnswer: '',
          };
        });

        setTriviaQuestions(triviaArray);
        setQuestionCount(triviaArray.length);
        setIsFetchingTrivia(false);
      } catch (err) {
        console.error(err);
      }
    }

    // Debounce to prevent rate limiting
    const timeoutId = setTimeout(() => {
      getTriviaQuestions();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      // Turn off loading animation
      setIsFetchingTrivia(false);
    };
  }, [playCount]);

  // Check that every question has an answer selected
  useEffect(() => {
    const allAnswered = triviaQuestions.every(
      question => question.selectedAnswer,
    );

    setAreAllAnswered(allAnswered);
  }, [triviaQuestions]);

  // Create TriviaQuestion component instances
  const triviaQuestionElements = triviaQuestions.map((question, index) => (
    <TriviaQuestion
      key={question.id}
      questionObj={question}
      questionIndex={index}
      isSubmitted={isSubmitted}
      handleChange={handleChange}
    />
  ));

  // Update state when user selects an answer
  function handleChange(questionId, chosenAnswer) {
    setTriviaQuestions(prevTriviaQuestions =>
      prevTriviaQuestions.map(question => {
        return questionId === question.id
          ? { ...question, selectedAnswer: chosenAnswer }
          : question;
      }),
    );
  }

  // Handling when user clicks on Check Answers button
  function handleClick() {
    const correctQuestions = triviaQuestions.filter(
      question => question.correctAnswer === question.selectedAnswer,
    );

    setCorrectScore(correctQuestions.length);
    setIsSubmitted(true);
  }

  // Update state variables for new round of trivia questions
  function resetGame() {
    setIsSubmitted(false);
    setCorrectScore(0);
    setPlayCount(prevPlayCount => (prevPlayCount += 1));
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <main>
      <ScaleLoader
        loading={isFetchingTrivia}
        size={10}
        cssOverride={override}
        color={'#4d5b9e'}
      />
      {!isFetchingTrivia && (
        <div className="trivia-container">
          <section className="trivia-questions">
            {triviaQuestionElements}
          </section>
          {!isSubmitted ? (
            <footer className="footer">
              <button
                className="button button--primary"
                type="button"
                onClick={handleClick}
                disabled={!areAllAnswered}
              >
                Check answers
              </button>
            </footer>
          ) : (
            <footer className="footer">
              <p className="footer__score">
                {`You answered ${correctScore} out of ${questionCount} questions
                correctly.`}
              </p>
              <button
                className="button button--primary"
                type="button"
                onClick={resetGame}
              >
                Play again
              </button>
            </footer>
          )}
        </div>
      )}
    </main>
  );
}
