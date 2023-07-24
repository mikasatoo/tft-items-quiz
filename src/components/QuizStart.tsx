import { useQuizContext } from '../context';

export const QuizStart = () => {
    // Access functions from the QuizContext
    const { updateTotalQuestionNum, updateQuizStatus } = useQuizContext();

    // Render the QuizStart view
    return (
        <div className='start-view'>
            <h1>Teamfight Tactics</h1>
            <h2>Items Quiz</h2>
            <div className='questions-btn-div'>
                <button
                    className='5-questions-btn'
                    onClick={() => updateTotalQuestionNum(5)}
                >
                    5 questions
                </button>
                <button
                    className='10-questions-btn'
                    onClick={() => updateTotalQuestionNum(10)}
                >
                    10 questions
                </button>
            </div>
            <div className='play-btn-div'>
                <button
                    className='play-btn'
                    // *** Want to only be able to click this if totalQuestionNum is 5 or 10
                    onClick={() => updateQuizStatus('play')}
                >
                    Play
                </button>
            </div>
        </div>
    );
}