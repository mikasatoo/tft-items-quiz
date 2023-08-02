import { useQuizContext } from '../context';
import { rankImages } from '../helper/RankImagesHelper';
import styles from '../styles/quiz-styles.module.scss';

export const QuizEnd = () => {
    // Access variables and functions from the QuizContext
    const { totalQuestionNum, updateTotalQuestionNum, updateCurrentQuestionNum, updateQuizStatus, score, updateScore, rank } = useQuizContext();
    
    // Function to reset quiz
    const resetQuiz = () => {
        updateTotalQuestionNum(0);
        updateCurrentQuestionNum(1);
        updateQuizStatus('start');
        updateScore(0);
    }
    
    // Render the QuizEnd view
    return (
        <div className={styles.endView}>
            <div className={styles.finalScore}>
                <h3>You scored:</h3>
                <h2>{score} out of {totalQuestionNum}</h2>
            </div>

            <div className={styles.rank}>
                <h3>Your rank is:</h3>
                <h2>{rank}</h2>
                <img src={ rankImages[rank] }></img>
            </div>

            <button
                className={styles.primaryBtn}
                onClick={() => resetQuiz()}
            >
                Retry quiz
            </button>
        </div>
    );
}