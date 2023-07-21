import { QuizStart } from './QuizStart';
import { QuizQuestions } from './QuizQuestions';
import { QuizEnd } from './QuizEnd';
import { useQuizContext } from '../context';

type HandleViewProps = {
    view: string
}

export const Quiz = () => {
    // Access variables from the QuizContext
    const { quizStatus } = useQuizContext();
    
    // Render the relevant component based on quizStatus
    const HandleView = ({view}: HandleViewProps) => {
        if (view === 'start') {
            return <QuizStart />;
        } else if (view === 'play') {
            return <QuizQuestions />;
        } else if (view === 'end') {
            return <QuizEnd />;
        }
    }
    
    return (
        <HandleView view={quizStatus} />
    );
}