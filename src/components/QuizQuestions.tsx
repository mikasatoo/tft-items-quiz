import { useEffect, useState } from 'react';
import { useQuizContext } from '../context';
import { items } from '../helper/scrapedItemsHelper';
import { toast } from 'react-hot-toast';
import ProgressBar from '@ramonak/react-progress-bar';
import styles from '../styles/quiz-styles.module.scss';

// Define type for Question objects
type Question = {
    type: string
    text: string
}

// Define type for Option objects
type Option = {
    text: string
    img1: string
    img2: string
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

// Function to shuffle the elements of an array randomly
function shuffleArray(array: Option[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
}

export const QuizQuestions = () => {
    // Access variables and functions from the QuizContext
    const { totalQuestionNum, currentQuestionNum, updateCurrentQuestionNum, updateQuizStatus, score, updateScore, updateRank } = useQuizContext();
    
    // Create other state variables
    const [questionText, setQuestionText] = useState<string>('');
    const [questionContent, setQuestionContent] = useState<string>('');
    const [correctOption, setCorrectOption] = useState<string>('');
    const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [result, setResult] = useState({ output: '', correctAnswer: '' });
    const [questionContentImgs, setQuestionContentImgs] = useState({ img1: '', img2: '' });

    // Component to render the progress bar
    const QuizProgressBar = () => {
        const progress = ((currentQuestionNum - 1) / totalQuestionNum) * 100;
        return <ProgressBar completed={progress} bgColor="#579dd4" baseBgColor="#213547" />
    }

    // Function to create each question
    const createQuestion = () => {
        // 1. Choose a random question type
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        const questionType = randomQuestion.type;
        setQuestionText(randomQuestion.text);

        // 2. Choose a random item (subject) from the items not yet used
        const itemsNotUsed = items.filter(item => {
            if (questionType === 'chooseItemFromAbility' || randomQuestion.type === 'chooseAbility') {
                return (!item.used && !item.name.includes('Emblem'));   // too easy if question is "Which item provides the challenger trait?"
            } else {
                return !item.used;
            }
        });
        const randomItemIndex = Math.floor(Math.random() * itemsNotUsed.length);
        const subject = itemsNotUsed[randomItemIndex];
        const itemsArrayIndex = items.findIndex(item => item.name === subject.name);
        items[itemsArrayIndex].used = true;

        // 3. Set the question content (including image/s) based on the question type
        if (questionType === 'chooseCombinedItem') {
            setQuestionContent(`${subject.baseItem1} + ${subject.baseItem2}`);
            setQuestionContentImgs({ img1: subject.baseItem1Img, img2: subject.baseItem2Img });
        } else if (questionType === 'chooseBaseItems' || randomQuestion.type === 'chooseAbility') {
            setQuestionContent(subject.name);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            setQuestionContentImgs({ img1: subject.img, img2: '' });
        } else if (questionType === 'chooseItemFromAbility') {
            setQuestionContent(subject.ability);
            setQuestionContentImgs({ img1: '', img2: '' });
        }

        // 4. Set the four options (including the correct option) based on the question type
        // take options from any item other than the question's subject (that is also an emblem if the subject is an emblem)
        const otherItems = items.filter(item => {
            if (subject.name.includes('Emblem')) {
                return (item.name !== subject.name && item.name.includes('Emblem'));
            } else {
                return (item.name !== subject.name && !item.name.includes('Emblem'));
            }
        });
        
        const options: Option[] = [];
        const possibleOptions: Option[] = [];
        
        if (questionType === 'chooseCombinedItem' || questionType === 'chooseItemFromAbility') {
            setCorrectOption(subject.name);
            options.push({ 
                text: subject.name,
                img1: subject.img,
                img2: ''
            });
            otherItems.forEach((item) => possibleOptions.push({ 
                text: item.name,
                img1: item.img,
                img2: ''
            }));
        } else if (questionType === 'chooseBaseItems') {
            setCorrectOption(`${subject.baseItem1} + ${subject.baseItem2}`);
            options.push({
                text: `${subject.baseItem1} + ${subject.baseItem2}`,
                img1: subject.baseItem1Img,
                img2: subject.baseItem2Img
            });
            otherItems.forEach((item) => possibleOptions.push({
                text: `${item.baseItem1} + ${item.baseItem2}`,
                img1: item.baseItem1Img,
                img2: item.baseItem2Img
            }));
        } else if (questionType === 'chooseAbility') {
            setCorrectOption(subject.ability);
            options.push({
                text: subject.ability,
                img1: '',
                img2: ''
            });
            otherItems.forEach((item) => possibleOptions.push({
                text: item.ability,
                img1: '',
                img2: ''
            }));
        }

        // loop through possibleOptions array to get the other three random options
        for (let i = 1; i <= 3; i++) {
            const randomOptionIndex = Math.floor(Math.random() * possibleOptions.length);
            const newOption = possibleOptions[randomOptionIndex];
            options.push(newOption);
            possibleOptions.splice(randomOptionIndex, 1);  // remove the used option from possibleOptions
        }
        
        // shuffle the options array to randomize the order
        const newShuffledArray = shuffleArray(options);
        setShuffledOptions(newShuffledArray);
    }

    // Function to handle selecting an answer (before submitting)
    const handleAnswerSelection = (option: string) => {
        if (result.output === '') {
            setAnswer(option);
        }
    }

    // Function to handle submitting an answer
    const handleSubmit = () => {
        if (answer === correctOption) {
            setResult({ output: 'Correct!', correctAnswer: `You selected: ${correctOption}` });
        } else {
            setResult({ output: 'Incorrect!', correctAnswer: `The correct answer is: ${correctOption}` });
        }
    }

    // Function to handle next question
    const handleNext = () => {
        setAnswer('');
        setResult({ output: '', correctAnswer: '' });

        let updatedScore = score;
        if (result.output === 'Correct!') {
            updatedScore = score + 1;
            updateScore(updatedScore);
        }

        updateCurrentQuestionNum(currentQuestionNum + 1);

        // If end of quiz is reached, update rank and quiz status (move to QuizEnd view)
        if (currentQuestionNum === totalQuestionNum) {
            updateRank(updatedScore, totalQuestionNum);
            updateQuizStatus('end');
        }
    }

    // Function to render each option button
    function createOptionButton(index: number, text: string, img1: string, img2: string) {   
        let optionClassName: string;
        if (text === correctOption) {
            optionClassName = 'correctOption';
        } else if (text === answer) {
            optionClassName = 'incorrectOption';
        } else {
            optionClassName = 'option';
        }
        
        const optionLetter: string = String.fromCharCode(97 + index);

        return (
            <button
                className={`${styles.optionBtn} ${styles[optionClassName]}`}
                onClick={() =>
                    (result.output === '' ? handleAnswerSelection(text) : toast.error("You have already submitted your answer!"))
                }
            >
                {optionLetter}. {text}
                {img1 !== '' ? (
                    <div className={styles.optionImgs}>
                        <img src={img1}></img>
                        {img2 !== '' ? <img src={img2}></img> : ''}
                    </div>
                ) : ('')}
            </button>
        );
    }

    // Run createQuestion() once per component mount
    let didRender = false;
    useEffect(() => {
        if (!didRender) {
            didRender = true;
            createQuestion();
        }
    }, []);

    // Render the QuizQuestions view
    return (
        <div className={styles.questionsView}>
            <div className={styles.progressBar}>
                <p><b>Question {currentQuestionNum}</b> / {totalQuestionNum}</p>
                <QuizProgressBar />
            </div>

            <div className={styles.questionBox}>
                <p className={styles.questionText}>{questionText}</p>
                
                <div className={styles.questionContent}>
                    <p>{questionContent}</p>
                    {questionContentImgs.img1 !== '' ? (
                        <div className={styles.questionContentImgs}>
                            <img src={questionContentImgs.img1}></img>
                            {questionContentImgs.img2 !== '' ? <img src={questionContentImgs.img2}></img> : ''}
                        </div>
                    ) : ('')}
                </div>
                
                <div className={result.output === '' ? styles.active : styles.inactive}>
                    <div className={styles.options}>
                        {shuffledOptions.map((option) => 
                            createOptionButton(shuffledOptions.indexOf(option), option.text, option.img1, option.img2)
                        )}
                    </div>
                </div>
            </div>

            {answer !== '' ? (
                <div className={result.output === '' ? styles.active : styles.inactive}>
                    <button
                        className={styles.primaryBtn}
                        onClick={() => 
                            (result.output === '' ? handleSubmit() : toast.error("You have already submitted your answer!"))
                        }
                    >
                        Submit
                    </button>
                </div>
            ) : ('')}

            {result.output !== '' ? (
                <div className={styles.result}>
                    <p className={result.output === 'Correct!' ? styles.correctResult : styles.incorrectResult}>{result.output}</p>
                    <p className={styles.correctAnswer}>{result.correctAnswer}</p>

                    <button
                        className={styles.primaryBtn}
                        onClick={() => handleNext()}
                    >
                        Next
                    </button>
                </div>
            ) : ('')}
        </div>
    );
}