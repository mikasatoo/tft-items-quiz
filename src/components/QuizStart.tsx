import { useQuizContext } from '../context';
import { toast } from 'react-hot-toast';
import styles from '../styles/quiz-styles.module.scss';
import { FaGithub } from "react-icons/fa";

export const QuizStart = () => {
    // Access functions from the QuizContext
    const { totalQuestionNum, updateTotalQuestionNum, updateQuizStatus } = useQuizContext();

    // Function to handle clicking on a question num button
    const handleQuestionNumSelect = (num: number) => {
        updateTotalQuestionNum(num);
    }

    // Function to check if user has selected the number of questions before playing
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
            <div className={styles.startViewContent}>
                <h1>Teamfight Tactics</h1>
                <h2>⚔️ Items Quiz ⚔️</h2>

                <div className={styles.questionNumBtnsDiv}>
                    <button
                        className={styles.secondaryBtn}
                        onClick={() => handleQuestionNumSelect(5)}
                    >
                        5 questions
                    </button>
                    <button
                        className={styles.secondaryBtn}
                        onClick={() => handleQuestionNumSelect(10)}
                    >
                        10 questions
                    </button>
                </div>

                <div className={styles.playBtnDiv}>
                    <button
                        className={styles.primaryBtn}
                        onClick={() => handlePlay()}
                    >
                        Play
                    </button>
                </div>
            </div>

            <div className={styles.footer}>
                <p>mikasatoo</p>
                <a href="https://github.com/mikasatoo/" target="_blank">
                    <FaGithub />
                </a>
            </div>
        </div>
    );
}