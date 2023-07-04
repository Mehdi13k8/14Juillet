import React, { useState } from 'react';
import Formulary from './Formulary';
import Wheel from './Wheel';
import questions from '../assets/Questions.json';
import './Quizz.scss';

function StellantisLoteria({ handleMinimizeClick }) {
    const [isError, setIsError] = useState(false);
    const [count, setCount] = useState(0);
    const [language, setLanguage] = useState('SK');

    const handleError = (error) => {
        // handle your error here
        setIsError(true);
    }

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // click on flag to change language
    const changeLanguage = (e) => {
        setLanguage(e);
    }

    const getValue = () => {
        const inputs = document.querySelectorAll('input[data-response="false"]');//[type="text"], input[type="number"]');
        let isCorrect = true;
      
        inputs.forEach((input) => {
          const response = input.value.trim();
          const hiddenResponse = input.nextElementSibling.value.trim();
     
          console.log(response, hiddenResponse);
          if (response !== hiddenResponse) {
            isCorrect = false;
            // Perform desired action for incorrect response
            // For example, you can highlight the incorrect input field
            input.classList.add("incorrect");
          } else {
            // Perform desired action for correct response
            // For example, you can remove any previous incorrect highlighting
            input.classList.remove("incorrect");
          }
        });
      
        // Perform overall action based on correctness (e.g., show result, redirect, etc.)
        if (isCorrect) {
          // All responses are correct
          console.log("All responses are correct!");
          // Perform action for correct responses
        } else {
          // Incorrect responses exist
          console.log("There are incorrect responses!");
          // Perform action for incorrect responses
        }
      };
      

    let pageQuestions = [];
    if (questions) {
        pageQuestions = questions.questions.map((question, index) => (
            <div key={index}>
            <label>{question[language]}</label>
            <br />
            {question.answer ? (
                <>
                <input
                    // type={typeof question.answer === "string" ? "text" : "number"}
                    id={`input-${index}`}
                    // min={0}
                    // not response attribute
                    data-response={false}
                    // onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                />
                <input type="hidden" value={question.answer} />
                </>
            ) : (
                <>
                <label>Značka 1 :</label>
                <input type="text" id="r1" />
                <br />
                <br />
                <label>Značka 2 :</label>
                <input type="text" id="r2" />
                <br />
                <br />
                <label>Značka 3 :</label>
                <input type="text" id="r3" />
                </>
            )}
            </div>
        ));
    }

    const generateRandom = (absentValue1, absentValue2) => {
        while (true) {
            const random = getRndInteger(0, pageQuestions.length);
            if (!(absentValue1 === random) && !(absentValue2 === random)) {
                return random;
            }
        }
    }

    const random1 = getRndInteger(0, pageQuestions.length);
    const random2 = generateRandom(random1, null);
    const random3 = generateRandom(random1, random2);

    const random = [random1, random2, random3];

    const renderQuestions = () => {
        console.log(pageQuestions);
        return random.map((index) => (
            <div key={index}>
                {pageQuestions[index]}
                <br />
            </div>
        ));
    };

    return (
        <div className='main'>
            <img src="https://www.stellantis.com/content/dam/stellantis-corporate/assets/stell-logo-white.svg" alt="logo" />
            <h1>Dotazník Stellantis</h1>
            <button
        className="minimize-button"
        onClick={handleMinimizeClick}
        style={{
          position: 'absolute', top: '0', left: '0', zIndex: '1', opacity: '0.5', backgroundColor: 'darkgray'
        }}
      >
        Exit
      </button>
            <form>
                {renderQuestions()}
            </form>
            <br />
            <div className="container_button">
                <button type="button" id="button_home" onClick={getValue}>Odoslať</button>
            </div>
            <img id="drapo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/langfr-225px-Flag_of_Slovakia.svg.png" alt="drapeau_slovaquie"
                onClick={() => changeLanguage("SK")} />
            <img id="drapo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/langfr-225px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png" alt="drapeau_france" 
                onClick={() => changeLanguage("FR")} />
        </div>
    );
}

export default StellantisLoteria;
