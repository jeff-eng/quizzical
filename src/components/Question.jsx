import { useState } from 'react';
import AnswerChoice from './AnswerChoice';

export default function Question() {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setSelectedAnswer(value);
  }

  return (
    <article>
      <fieldset>
        <legend>
          Which best selling toy of 1983 caused hysteria, resulting in riots
          breaking in stores?
        </legend>
        <AnswerChoice
          name="question1"
          id="answerChoice1"
          value="Cabbage Patch Kids"
          handleChange={handleChange}
        />
        <AnswerChoice
          name="question1"
          id="answerChoice2"
          value="Transformers"
          handleChange={handleChange}
        />
        <AnswerChoice
          name="question1"
          id="answerChoice3"
          value="Care Bears"
          handleChange={handleChange}
        />
        <AnswerChoice
          name="question1"
          id="answerChoice4"
          value="Rubik's Cube"
          handleChange={handleChange}
        />
      </fieldset>
    </article>
  );
}
