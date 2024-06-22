import { useEffect, useState } from 'react';
import TriviaQuestion from './TriviaQuestion';
import data from '../../data';
import { nanoid } from 'nanoid';

export default function Main() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [areAllAnswered, setAreAllAnswered] = useState(false);
  const [correctScore, setCorrectScore] = useState(0);

  useEffect(() => {
    // const getTriviaQuestions = async () => {
    //   // const response = await fetch('https://opentdb.com/api.php?amount=5');
    //   // const data = await response.json();

    // };

    // getTriviaQuestions();

    // const trivia = data.results.map(question => {
    //   const randomInt = Math.floor(
    //     Math.random() * question.incorrect_answers.length,
    //   );
    //   console.log(randomInt);

    //   return { ...question, id: nanoid(), selectedAnswer: '' };
    // });

    const triviaObjects = data.results.map(triviaObj => {
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

    setTriviaQuestions(triviaObjects);
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

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <main>
      <section>{triviaQuestionElements}</section>
      <section>
        {isSubmitted && <p>{correctScore}</p>}
        <button type="button" onClick={handleClick} disabled={!areAllAnswered}>
          Check answers
        </button>
      </section>
    </main>
  );
}
