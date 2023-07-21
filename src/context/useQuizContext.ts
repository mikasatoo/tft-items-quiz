import { useContext } from 'react';
import { QuizContext } from './QuizContext';

// Create a custom hook to use within components
export const useQuizContext = () => {
    // Call the useContext hook to consume the QuizContext
    const context = useContext(QuizContext);
    
    if (!context) {
        throw new Error('UseQuizContext must be used within a QuizProvider');
    }
    
    return context;
}