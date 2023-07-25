import { useQuizContext } from '../context';
import Normals from '../assets/Normals player.jpeg';
import Iron from '../assets/Iron.png';
import Bronze from '../assets/Bronze.png';
import Silver from '../assets/Silver.png';
import Gold from '../assets/Gold.png';

// Object with image source references (corresponding to each rank)
const images = {
    "Normals player": Normals,
    Iron,
    Bronze,
    Silver,
    Gold
}

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
        <div className='end-view'>
            <div className='final-score'>
                <h2>You scored</h2>
                <h3>{score} out of {totalQuestionNum}</h3>
            </div>
            <div className='rank'>
                <div className='rank-text'>{rank}</div>
                <img className='rank-img' src={ images[rank] }></img>
            </div>
            <div className='retry-btn-div'>
                <button
                    className='retry=btn'
                    onClick={() => resetQuiz()}
                >
                    Retry quiz
                </button>
            </div>
        </div>
    );
}