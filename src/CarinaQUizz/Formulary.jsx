import React, { useState } from 'react';
import question from '../assets/Questions.json';

const marque = ["abarth","alfa romeo","chrysler","citroen","ds automobiles","ds","dodge","fiat","jeep","opel","lancia","maserati","peugeot","ram trucks","ram","vauxhall","leasys"];

const maxq = question.length;

function Formulary() {
    const [random, setRandom] = useState([random1, random2, random3]);

    const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min) ) + min;

    const generateRandom = (absentValue1,absentValue2) => {
        while(true){
            const random = getRndInteger(0,maxq);
            if (!(absentValue1==random) & !(absentValue2==random)){
                return random;
            }
        }
    }

    var random1 = getRndInteger(0,maxq);
    var random2 = generateRandom(random1,null);
    var random3 = generateRandom(random1,random2);

    const getValue = () => {
        // Insert your logic here...
    }

    const getQuestion = () => {
        for(let i = 0; i < 3; i++){
            document.write(question[random[i]]);
            document.write("<br></br>");
        }
    }

    return (
        <div>
            {getQuestion()}
            <button onClick={getValue}>Submit</button>
        </div>
    );
}

export default Formulary;
