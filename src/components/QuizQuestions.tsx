import { useEffect, useState } from 'react';
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
        ability: "Grant 10 bonus Ability Power. Combat start: Grant 20 Ability Power every 5 seconds.",
        used: false,
    },
    {
        name: "Bloodthirster",
        baseItem1: "B.F. Sword",
        baseItem2: "Negatron Cloak",
        ability: "Grant 20% Omnivamp. Once per combat at 40% Health, gain a 25% maximum Health shield that lasts up to 5 seconds.",
        used: false,
    },
    {
        name: "Blue Buff",
        baseItem1: "Tear of the Goddess",
        baseItem2: "Tear of the Goddess",
        ability: "Grant 10 bonus starting Mana and 10 bonus Ability Power. Abilities cost 10 less Mana to cast. If the holder gets at least 1 takedown within 3 seconds of casting, gain 10 Mana.",
        used: false,
    },
    {
        name: "Bramble Vest",
        baseItem1: "Chain Vest",
        baseItem2: "Chain Vest",
        ability: "Grants 30 bonus Armor. Negates 75% bonus damage from incoming critical strikes. When struck by an attack, deal 75/100/150★ magic damage to all nearby enemies (once every 2 seconds).",
        used: false,
    },
    {
        name: "Chalice of Power",
        baseItem1: "Negatron Cloak",
        baseItem2: "Tear of the Goddess",
        ability: "Combat start: Grant 20 Ability Power to the holder and allies within 1 hex in the same row.",
        used: false,
    },
    {
        name: "Deathblade",
        baseItem1: "B.F. Sword",
        baseItem2: "B.F. Sword",
        ability: "Grant 46% bonus Attack Damage.",
        used: false,
    },
    {
        name: "Dragon's Claw",
        baseItem1: "Negatron Cloak",
        baseItem2: "Negatron Cloak",
        ability: "Grants 45 bonus Magic Resist. Every 2 seconds, regenerate 5% maximum Health.",
        used: false,
    },
    {
        name: "Edge of Night",
        baseItem1: "B.F. Sword",
        baseItem2: "Chain Vest",
        ability: "Once per combat: At 60% Health, briefly become stealthed, becoming untargetable and shedding negative effects. Then, grant 15% bonus Attack Speed.",
        used: false,
    },
    {
        name: "Gargoyle Stoneplate",
        baseItem1: "Chain Vest",
        baseItem2: "Negatron Cloak",
        ability: "Grant 15 Armor and 15 Magic Resist for each enemy targeting the holder.",
        used: false,
    },
    {
        name: "Giant Slayer",
        baseItem1: "B.F. Sword",
        baseItem2: "Recurve Bow",
        ability: "Grant 20% bonus Attack Damage and 20 bonus Ability Power. Abilities and attacks deal 25% more damage to enemies with more than 1600 maximum Health.",
        used: false,
    },

    // *** Add all items
]

export const QuizQuestions = () => {
    // Access variables and functions from the QuizContext
    const { totalQuestionNum, currentQuestionNum, updateCurrentQuestionNum, updateQuizStatus, score, updateScore, updateRank } = useQuizContext();

    // Create other state variables
    const [questionText, setQuestionText] = useState<string>('');
    const [questionContent, setQuestionContent] = useState<string>('');
    const [correctOption, setCorrectOption] = useState<string>('');
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [result, setResult] = useState<string>('');

    // Function to handle creating each question
    const handleQuestion = () => {
        // 1. Choose a random question type
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        const questionType = randomQuestion.type;
        setQuestionText(randomQuestion.text);

        // 2. Choose a random item (subject) from the items not yet used
        const itemsNotUsed = items.filter(item => {
            return item.used === false;
        });
        const randomItemIndex = Math.floor(Math.random() * itemsNotUsed.length);
        const subject = itemsNotUsed[randomItemIndex]
        items[randomItemIndex].used = true;

        // 3. Set the question content based on the question type
            // *** also want to set image links for these and render them
        if (questionType === 'chooseCombinedItem') {
            setQuestionContent(`${subject.baseItem1} + ${subject.baseItem2}`);
        } else if (questionType === 'chooseBaseItems' || randomQuestion.type === 'chooseAbility') {
            setQuestionContent(subject.name);
        } else if (questionType === 'chooseItemFromAbility') {
            setQuestionContent(subject.ability);
        }

        // 4. Set the four options (including the correct option) based on the question type
        // take options from any item other than the question's subject
        const otherItems = items.filter(item => {
            return item.name !== subject.name;
        });
        const options: string[] = [];
        let possibleOptions: string[] = [];
        
        // *** also want to set image links for these and render them
        if (questionType === 'chooseCombinedItem' || questionType === 'chooseItemFromAbility') {
            setCorrectOption(subject.name);
            options.push(subject.name);
            possibleOptions = otherItems.map(item => item.name);
        } else if (questionType === 'chooseBaseItems') {
            setCorrectOption(`${subject.baseItem1} + ${subject.baseItem2}`);
            options.push(`${subject.baseItem1} + ${subject.baseItem2}`);
            possibleOptions = otherItems.map(item => `${item.baseItem1} + ${item.baseItem2}`);
        } else if (questionType === 'chooseAbility') {
            setCorrectOption(subject.ability);
            options.push(subject.ability);
            possibleOptions = otherItems.map(item => item.ability);
        }

        // loop through possibleOptions array to get the other three random options
        for (let i = 1; i <= 3; i++) {
            const newOptionIndex = Math.floor(Math.random() * possibleOptions.length);
            const newOption = possibleOptions[newOptionIndex];
            options.push(newOption);
            possibleOptions.splice(newOptionIndex, 1);  // remove the used option from possibleOptions
        }
        
        // *** shuffle the options array (set up a separate shuffle() function) and then setShuffledOptions()


        console.log(questionType);
        console.log(subject);
        console.log(itemsNotUsed);
        console.log(otherItems);
        console.log(possibleOptions);
        console.log(options);
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
    }

    // *** Run handleQuestion() once on first render and when currentQuestionNum changes??
    useEffect(() => {
        handleQuestion();
        console.log('sup');
    }, []);

    // Render the QuizQuestions view
    return (
        <div className='question-view'>
            <div className='progress-bar'>
                {/* *** Add progress bar JSX / code */}
                Progress bar

            </div>

            <div className='question-options-div'>
                <div className='question'>
                    <div className='question-text'>
                        {questionText}
                    </div>
                    <div className='question-content'>
                        {questionContent}
                    </div>
                </div>

                {/* *** Iterate through options array to render option buttons (onClick => handleAnswerSelection()) */}
                <div className='options'>
                    <div className='option-1'>
                        {items[0].baseItem1}
                        {items[0].baseItem2}
                    </div>
                    <div className='option-2'>Option 2</div>
                </div>
            </div>

            {answer !== '' ? (
                <div className='submit-btn-div'>
                    <button
                        className='submit-btn'
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
            ) : ('')}

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