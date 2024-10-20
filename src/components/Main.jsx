import { useEffect, useState } from 'react';
import TriviaQuestion from './TriviaQuestion';
import Footer from './Footer';
import ScoreFooter from './ScoreFooter';
import { nanoid } from 'nanoid';
import ScaleLoader from 'react-spinners/ScaleLoader';
import '../styles/main.css';

export default function Main() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [areAllAnswered, setAreAllAnswered] = useState(false);
  const [correctScore, setCorrectScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(5);
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
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${questionCount}`,
        );
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
      handleKeyDown={handleKeyDown}
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

  function handleKeyDown(event, questionId, chosenAnswer) {
    if (event.key === ' ' || event.key === 'Enter') {
      setTriviaQuestions(prevTriviaQuestions =>
        prevTriviaQuestions.map(question => {
          return questionId === question.id
            ? { ...question, selectedAnswer: chosenAnswer }
            : question;
        }),
      );
    }
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
            <Footer
              areAllAnswered={areAllAnswered}
              handleClick={handleClick}
            ></Footer>
          ) : (
            <ScoreFooter
              correctScore={correctScore}
              questionCount={questionCount}
              resetGame={resetGame}
            ></ScoreFooter>
          )}
        </div>
      )}
    </main>
  );
}
