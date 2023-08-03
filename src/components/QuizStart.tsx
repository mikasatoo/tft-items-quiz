import { useQuizContext } from '../context';
import { toast } from 'react-hot-toast';
import styles from '../styles/quiz-styles.module.scss';
import { useRef, useEffect } from 'react';

export const QuizStart = () => {
    // Access functions from the QuizContext
    const { totalQuestionNum, updateTotalQuestionNum, updateQuizStatus } = useQuizContext();

    // Element references
    const questionNumRef1 = useRef<HTMLButtonElement>(null);
    const questionNumRef2 = useRef<HTMLButtonElement>(null);

    // Function to check if user has selected the number of questions
    const handlePlay = () => {
        if (totalQuestionNum === 5 || totalQuestionNum === 10 ) {
            updateQuizStatus('play');
        } else {
            toast.error('You need to select the number of questions first!');
        }
    }

    // Focus on selected question number button
    useEffect(() => {
        if (questionNumRef1.current) {
            questionNumRef1.current.focus();
        } else if (questionNumRef2.current) {
            questionNumRef2.current.focus();
        }
      }, []);

    // Render the QuizStart view
    return (
        <div className={styles.startView}>
            <h1>Teamfight Tactics</h1>
            <h2>⚔️ Items Quiz ⚔️</h2>

            <div className={styles.questionNumBtns}>
                <button
                    className={styles.secondaryBtn}
                    onClick={() => updateTotalQuestionNum(5)}
                    ref={questionNumRef1}
                >
                    5 questions
                </button>
                <button
                    className={styles.secondaryBtn}
                    onClick={() => updateTotalQuestionNum(10)}
                    ref={questionNumRef2}
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
        </div>
    );
}