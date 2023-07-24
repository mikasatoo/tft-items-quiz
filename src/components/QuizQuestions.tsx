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
    used: boolean
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
        used: false,
    },
    {
        name: "Bloodthirster",
        baseItem1: "B.F. Sword",
        baseItem2: "Negatron Cloak",
        ability: "Grant 20% Omnivamp.",
        used: false,
    },

    // *** Add all items
]

export const QuizQuestions = () => {
    // Access variables and functions from the QuizContext
    const { totalQuestionNum, currentQuestionNum, updateCurrentQuestionNum, updateQuizStatus, score, updateScore, updateRank } = useQuizContext();

    // Create other state variables
    const [questionType, setQuestionType] = useState<string>('');
    const [questionText, setQuestionText] = useState<string>('');
    const [subject, setSubject] = useState<Item>({name: '', baseItem1: '', baseItem2: '', ability: '', used: false});
    const [questionContent, setQuestionContent] = useState<string>('');
    const [correctOption, setCorrectOption] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [result, setResult] = useState<string>('');

    // *** Function to handle quiz progress


    // Function to handle generating each question
    const handleQuestion = () => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        setQuestionType(randomQuestion.type);
        setQuestionText(randomQuestion.text);

        return questionText;
    }

    // Function to handle setting the subject / content for each question
    const handleQuestionContent = () => {
        const itemsNotUsed = items.filter(item => {
            item.used === false;
        })
        console.log(items);
        console.log(itemsNotUsed);  // *** Why empty ???

        const randomItemIndex = Math.floor(Math.random() * itemsNotUsed.length);
        setSubject(itemsNotUsed[randomItemIndex]);
        items[randomItemIndex].used = true;

        // *** Also want to set image links for these and render them
        if (questionType === 'chooseCombinedItem') {
            setQuestionContent(`${subject.baseItem1} and ${subject.baseItem2}`);
        } else if (questionType === 'chooseBaseItems' || questionType === 'chooseAbility') {
            setQuestionContent(subject.name);
        } else if (questionType === 'chooseItemFromAbility') {
            setQuestionContent(subject.ability);
        }

        return questionContent;
    }

    // *** Function to handle setting the four options for each question
    const handleOptions = () => {
        // *** setOptions (including correctOption but make order random)
        if (questionType === 'chooseCombinedItem') {
            setCorrectOption(subject.name);

        } else if (questionType === 'chooseBaseItems') {
            setCorrectOption(`${subject.baseItem1} and ${subject.baseItem2}`);

        } else if (questionType === 'chooseAbility') {
            setCorrectOption(subject.ability);

        } else if (questionType === 'chooseItemFromAbility') {
            setCorrectOption(subject.name);

        }

        // *** return options and iterate through array below to render option buttons (onClick => handleAnswerSelection())

    }

    // *** Function to handle selecting an answer
    const handleAnswerSelection = () => {
        // *** setAnswer

    }

    // *** Function to handle submitting an answer
    const handleSubmit = () => {
        console.log('You submitted!');
        // *** setResult: 'Correct ...' if answer === correctOption, or 'Incorrect ...'
        // *** updateScore: score + 1 if answer === correctOption, or don't change

    }

    // Function to handle next question
    const handleNext = () => {
        updateCurrentQuestionNum(currentQuestionNum + 1);

        // If end of quiz is reached, update rank and quiz status (move to QuizEnd view)
        if (currentQuestionNum === totalQuestionNum) {
            updateRank(score, totalQuestionNum);
            updateQuizStatus('end');
        }
        // *** Else, how to ensure the QuizQuestions view updates with new question??

    }


    // ***  Render the QuizQuestions view
    return (
        <div className='question-view'>
            <div className='progress-bar'>
                Progress bar

            </div>

            {/* *** Need to make sure new question, content, options are generated each time */}
            <div className='question-options-div'>
                <div className='question'>
                    <div className='question-text'>
                        {handleQuestion()}
                    </div>
                    <div className='question-content'>
                        {handleQuestionContent()}
                    </div>
                </div>

                <div className='options'>
                    <div className='option-1'>
                        {items[0].baseItem1}
                        {items[0].baseItem2}
                    </div>
                    <div className='option-2'>Option 2</div>
                </div>
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
                        {result}
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