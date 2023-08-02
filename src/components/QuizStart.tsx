import { useQuizContext } from '../context';
import { toast } from 'react-hot-toast';
import styles from '../styles/quiz-styles.module.scss';

export const QuizStart = () => {
    // Access functions from the QuizContext
    const { totalQuestionNum, updateTotalQuestionNum, updateQuizStatus } = useQuizContext();

    // Function to check if user has selected the number of questions
    const handlePlay = () => {
        if (totalQuestionNum === 5 || totalQuestionNum === 10 ) {
            updateQuizStatus('play');
        } else {
            toast.error('You need to select the number of questions first!');
        }
    }

    // Render the QuizStart view
    return (
        <div className={styles.startView}>
            <h1>Teamfight Tactics</h1>
            <h2>⚔️ Items Quiz ⚔️</h2>

            <div className={styles.questionNumBtns}>
                <button
                    className={styles.secondaryBtn}
                    onClick={() => updateTotalQuestionNum(5)}
                >
                    5 questions
                </button>
                <button
                    className={styles.secondaryBtn}
                    onClick={() => updateTotalQuestionNum(10)}
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