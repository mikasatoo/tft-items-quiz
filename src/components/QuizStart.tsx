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
            <div className='start-btn-div'>
                <button
                    className='start=btn'
                    onClick={() => updateQuizStatus('play')}
                >
                    Start
                </button>
            </div>
        </div>
    );
}