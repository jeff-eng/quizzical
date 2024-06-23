import { useEffect, useState } from 'react';
import TriviaQuestion from './TriviaQuestion';
import data from '../../data';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function Main() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [areAllAnswered, setAreAllAnswered] = useState(false);
  const [correctScore, setCorrectScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    // const triviaObjectsArray = getTriviaQuestions();

    const triviaObjects = data.results.map(triviaObj => {
      return {
        id: nanoid(),
        type: triviaObj.type,
        difficulty: triviaObj.difficulty,
        category: triviaObj.category,
        question: decode(triviaObj.question),
        correctAnswer: triviaObj.correct_answer,
        incorrectAnswers: triviaObj.incorrect_answers,
        shuffledArray: shuffleArray([
          ...triviaObj.incorrect_answers,
          triviaObj.correct_answer,
        ]),
        selectedAnswer: '',
      };
    });

    setTriviaQuestions(triviaObjects);
    setQuestionCount(triviaObjects.length);
  }, []);

  // Check that every question has an answer selected
  useEffect(() => {
    const allAnswered = triviaQuestions.every(
      question => question.selectedAnswer,
    );

    console.log(allAnswered);
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

  async function getTriviaQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=5');
    const data = await response.json();

    const triviaArray = data.results.map(triviaObj => {
      return {
        id: nanoid(),
        type: triviaObj.type,
        difficulty: triviaObj.difficulty,
        category: triviaObj.category,
        question: decode(triviaObj.question),
        correctAnswer: triviaObj.correct_answer,
        incorrectAnswers: triviaObj.incorrect_answers,
        shuffledArray: shuffleArray([
          ...triviaObj.incorrect_answers,
          triviaObj.correct_answer,
        ]),
        selectedAnswer: '',
      };
    });

    return triviaArray;
  }

  // Update state when user selects an answer
  function handleChange(questionId, chosenAnswer) {
    console.log(`Hello from Main! ${questionId} ${chosenAnswer}`);

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

  function resetGame() {
    alert('Game has been reset');
    setIsSubmitted(false);
    setCorrectScore(0);
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <main>
      <section>{triviaQuestionElements}</section>
      <section>
        {!isSubmitted ? (
          <div>
            <button
              type="button"
              onClick={handleClick}
              disabled={!areAllAnswered}
            >
              Check answers
            </button>
          </div>
        ) : (
          <div>
            <p>
              You answered {correctScore} out of {questionCount} questions
              correctly.
            </p>
            <button type="button" onClick={resetGame}>
              Play again
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
