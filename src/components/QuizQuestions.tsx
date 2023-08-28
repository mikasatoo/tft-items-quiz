import { useEffect, useState } from 'react';
import { useQuizContext } from '../context';
import { itemImages, items } from '../helper/ItemsHelper';
import { toast } from 'react-hot-toast';
import ProgressBar from '@ramonak/react-progress-bar';
import styles from '../styles/quiz-styles.module.scss';

// Define type for Question objects
type Question = {
    type: string
    text: string
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
function shuffleArray(array: string[]) {
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
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [result, setResult] = useState({ output: '', correctAnswer: '' });

    const [questionContentImgs, setQuestionContentImgs] = useState({ img1: '', img2: '' });
    const [optionImgs, setOptionImgs] = useState({
        option1Img1: '', option1Img2: '',
        option2Img1: '', option2Img2: '',
        option3Img1: '', option3Img2: '',
        option4Img1: '', option4Img2: ''
    });

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
            setQuestionContentImgs({ img1: itemImages[subject.baseItem1], img2: itemImages[subject.baseItem2] });
        } else if (questionType === 'chooseBaseItems' || randomQuestion.type === 'chooseAbility') {
            setQuestionContent(subject.name);
            setQuestionContentImgs({ img1: itemImages[subject.name], img2: '' });
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
        
        const options: string[] = [];
        let possibleOptions: string[] = [];
        
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
            const randomOptionIndex = Math.floor(Math.random() * possibleOptions.length);
            const newOption = possibleOptions[randomOptionIndex];
            options.push(newOption);
            possibleOptions.splice(randomOptionIndex, 1);  // remove the used option from possibleOptions
        }
        
        // shuffle the options array to randomize the order
        const newShuffledArray = shuffleArray(options);
        setShuffledOptions(newShuffledArray);

        // set image/s for each option based on the question type
        if (questionType === 'chooseCombinedItem' || questionType === 'chooseItemFromAbility') {
            const option1 = newShuffledArray[0];
            const option2 = newShuffledArray[1];
            const option3 = newShuffledArray[2];
            const option4 = newShuffledArray[3];
            setOptionImgs({
                option1Img1: itemImages[option1], option1Img2: '',
                option2Img1: itemImages[option2], option2Img2: '',
                option3Img1: itemImages[option3], option3Img2: '',
                option4Img1: itemImages[option4], option4Img2: '',
            });
        } else if (questionType === 'chooseBaseItems') {
            const option1Array = newShuffledArray[0].split(' + ');
            const option1Part1 = option1Array[0];
            const option1Part2 = option1Array[option1Array.length - 1];
            const option2Array = newShuffledArray[1].split(' + ');
            const option2Part1 = option2Array[0];
            const option2Part2 = option2Array[option2Array.length - 1];
            const option3Array = newShuffledArray[2].split(' + ');
            const option3Part1 = option3Array[0];
            const option3Part2 = option3Array[option3Array.length - 1];
            const option4Array = newShuffledArray[3].split(' + ');
            const option4Part1 = option4Array[0];
            const option4Part2 = option4Array[option4Array.length - 1];
            setOptionImgs({
                option1Img1: itemImages[option1Part1], option1Img2: itemImages[option1Part2],
                option2Img1: itemImages[option2Part1], option2Img2: itemImages[option2Part2],
                option3Img1: itemImages[option3Part1], option3Img2: itemImages[option3Part2],
                option4Img1: itemImages[option4Part1], option4Img2: itemImages[option4Part2],
            });
        } else if (questionType === 'chooseAbility') {
            setOptionImgs({
                option1Img1: '', option1Img2: '',
                option2Img1: '', option2Img2: '',
                option3Img1: '', option3Img2: '',
                option4Img1: '', option4Img2: '',
            });
        }
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
    function createOptionButton(optionNum: number, optionValue: string) {   
        let optionClassName: string;
        let optionImg1: string;
        let optionImg2: string;
        let optionLetter: string;

        if (optionValue === correctOption) {
            optionClassName = 'correctOption';
        } else if (optionValue === answer) {
            optionClassName = 'incorrectOption';
        } else {
            optionClassName = 'option';
        }

        if (optionNum === 1) {
            optionImg1 = optionImgs.option1Img1;
            optionImg2 = optionImgs.option1Img2;
            optionLetter = 'a';
        } else if (optionNum === 2) {
            optionImg1 = optionImgs.option2Img1;
            optionImg2 = optionImgs.option2Img2;
            optionLetter = 'b';
        } else if (optionNum === 3) {
            optionImg1 = optionImgs.option3Img1;
            optionImg2 = optionImgs.option3Img2;
            optionLetter = 'c';
        } else if (optionNum === 4) {
            optionImg1 = optionImgs.option4Img1;
            optionImg2 = optionImgs.option4Img2;
            optionLetter = 'd';
        } else {
            optionImg1 = '';
            optionImg2 = '';
            optionLetter = '';
        }

        return (
            <button
                className={`${styles.optionBtn} ${styles[optionClassName]}`}
                onClick={() =>
                    (result.output === '' ? handleAnswerSelection(optionValue) : toast.error("You have already submitted your answer!"))
                }
            >
                {optionLetter}. {optionValue}
                {optionImg1 !== '' ? (
                    <div className={styles.optionImgs}>
                        <img src={optionImg1}></img>
                        {optionImg2 !== '' ? <img src={optionImg2}></img> : ''}
                    </div>
                ) : ('')}
            </button>
        )
    }

    // Run createQuestion() once per component mount
    let didRender = false;
    useEffect(() => {
        if (!didRender) {
            didRender = true;
            createQuestion();
            console.log('New question created');
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

                <div className={styles.options}>
                    <div className={result.output === '' ? styles.active : styles.inactive}>
                        {/* *** Make this into a component and pass props instead of using a function??? */}
                        {createOptionButton(1, shuffledOptions[0])}
                        {createOptionButton(2, shuffledOptions[1])}
                        {createOptionButton(3, shuffledOptions[2])}
                        {createOptionButton(4, shuffledOptions[3])}
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