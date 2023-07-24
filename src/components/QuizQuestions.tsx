import { useState } from 'react';
import { useQuizContext } from '../context';

// Define type for Question objects
type Question = {
    type: string
    text: string
}

// Define type of Item objects
type Item = {
    name: string
    baseItem1: string
    baseItem2: string
    ability: string
}

// Define questions array
const questions: Question[] = [
    {
        type: 'chooseCombinedItem',
        text: 'These two base items combine to form which item?',
    },
    {
        type: 'chooseBaseItems',
        text: 'This item is created by combining which two base items?',
    },
    {
        type: 'chooseAbility',
        text: 'What does this item do when it is equipped?',
    },
    {
        type: 'chooseItemFromAbility',
        text: 'Which item provides this ability when it is equipped?'
    },
]

// Define items array
const items: Item[] = [
    {
        name: "Archangel's Staff",
        baseItem1: "Needlessly Large Rod",
        baseItem2: "Tear of the Goddess",
        ability: "Grant 10 bonus Ability Power.",
    },
    {
        name: "Bloodthirster",
        baseItem1: "B.F. Sword",
        baseItem2: "Negatron Cloak",
        ability: "Grant 20% Omnivamp.",
    },

    // *** Add all items
]

export const QuizQuestions = () => {
    // Access variables and functions from the QuizContext
    const { totalQuestionNum, currentQuestionNum, updateCurrentQuestionNum, updateQuizStatus, score, updateScore, updateRank } = useQuizContext();

    // Create other state variables
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [correctOption, setCorrectOption] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [result, setResult] = useState<string>('');

    // ***
    

    // Function to handle submitting an answer
    const handleSubmit = () => {

        console.log('You submitted!');
    }

    // Function to handle next question
    const handleNext = () => {

        console.log('Next!');
        updateRank(score, totalQuestionNum);
        updateQuizStatus('end');    // just to see what end view looks like
    }


    // Render the QuizQuestions view
    return (
        <div className='question-view'>
            <div className='progress-bar'>
                Progress bar

            </div>

            <div className='question'>
                <div className='question-text'>{questions[0].text}</div>
                <div className='question-content'>{items[0].name}</div>
            </div>

            <div className='options'>
                <div className='option-1'>
                    {items[0].baseItem1}
                    {items[0].baseItem2}
                </div>
                <div className='option-2'>Option 2</div>
            </div>

            <div className='submit-btn-div'>
                <button
                    className='submit-btn'
                    onClick={() => handleSubmit()}
                >
                    Submit
                </button>
            </div>

            {result !== '' ? (
                <div className='result'>
                    <div className='result-output'>
                        Correct or incorrect...
                    </div>
                    <div className='next-btn-div'>
                        <button
                            className='next-btn'
                            onClick={() => handleNext()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : ('')}
        </div>
    );
}