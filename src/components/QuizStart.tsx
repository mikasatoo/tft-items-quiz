import { useQuizContext } from '../context';
import { toast } from 'react-hot-toast';
import styles from '../styles/quiz-styles.module.scss';
import { useRef, useEffect, useState } from 'react';

export const QuizStart = () => {
    // Access functions from the QuizContext
    const { totalQuestionNum, updateTotalQuestionNum, updateQuizStatus } = useQuizContext();

    // Question num button references and questionNum state variable
    const questionNumRef1 = useRef<HTMLButtonElement>(null);
    const questionNumRef2 = useRef<HTMLButtonElement>(null);
    // let questionNum = 0;
    // const [questionNum, setQuestionNum] = useState<number>(0);
    // const [focused, setFocused] = useState<boolean>(false);

    // Function to handle clicking on a question num button
    const handleQuestionNumSelect = (num: number) => {
        updateTotalQuestionNum(num);
        // questionNum = num;
        // setQuestionNum(num);    // triggers the useEffect

        // *** ref.current is null when I first click each button, but then works the second time I click - not sure why???
        console.log(num, questionNumRef1, questionNumRef2);
        
        if (num === 5 && questionNumRef1.current) {
            questionNumRef1.current.focus();
            // if (questionNumRef2.current) {
            //     questionNumRef2.current.blur();
            // }
        } else if (num === 10 && questionNumRef2.current) {
            questionNumRef2.current.focus();
            // if (questionNumRef1.current) {
            //     questionNumRef1.current.blur();
            // }
        }
    }

    // Function to check if user has selected the number of questions before playing
    const handlePlay = () => {
        if (totalQuestionNum === 5 || totalQuestionNum === 10 ) {
            updateQuizStatus('play');
        } else {
            toast.error('You need to select the number of questions first!');
        }
    }

    // Focus on selected question number button
    // useEffect(() => {
    //     console.log(questionNum, questionNumRef1.current, questionNumRef2.current)

    //     if (questionNum === 5 && questionNumRef1.current) {
    //         questionNumRef1.current.focus();
    //         if (questionNumRef2.current) {
    //             questionNumRef2.current.blur();
    //         }
    //     } else if (questionNum === 10 && questionNumRef2.current) {
    //         questionNumRef2.current.focus();
    //         if (questionNumRef1.current) {
    //             questionNumRef1.current.blur();
    //         }
    //     }
    // }, [questionNum]);

    // Focus on selected question number button
    // useEffect(() => {
    //     console.log(questionNumRef1.current, questionNumRef2.current, focused)
    //     if (questionNumRef1.current && focused) {
    //         questionNumRef1.current.focus();
    //     } else if (questionNumRef2.current && focused) {
    //         questionNumRef2.current.focus();
    //     }
    // }, [focused]);

    // const toggleFocus = () => {
    //     setFocused(prev => !prev);
    // }
    
    // const unFocus = () => {
    //     if (focused) setFocused(false);
    // }
    
    // const focus = () => {
    //     if(!focused) setFocused(true);
    // }

    // Render the QuizStart view
    return (
        <div className={styles.startView}>
            <h1>Teamfight Tactics</h1>
            <h2>⚔️ Items Quiz ⚔️</h2>

            <div className={styles.questionNumBtns}>
                <button
                    className={styles.secondaryBtn}
                    onClick={() => handleQuestionNumSelect(5)}
                    ref={questionNumRef1}
                    // onBlur={unFocus}
                    // onFocus={focus}
                >
                    5 questions
                </button>
                <button
                    className={styles.secondaryBtn}
                    onClick={() => handleQuestionNumSelect(10)}
                    ref={questionNumRef2}
                    // onBlur={unFocus}
                    // onFocus={focus}
                >
                    10 questions
                </button>
            </div>

            <div>
                <button
                    className={styles.primaryBtn}
                    onClick={() => handlePlay()}
                >
                    Play
                </button>
            </div>

            <div className={styles.footer}>
                mikasatoo
            </div>
        </div>
    );
}