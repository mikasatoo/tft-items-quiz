import { createContext, useState } from 'react';

// Define interface for the QuizContextProps
interface QuizContextProps {
    totalQuestionNum: number
    updateTotalQuestionNum: (num: number) => void
    currentQuestionNum: number
    updateCurrentQuestionNum: (num: number) => void
    quizStatus: string
    updateQuizStatus: (status: string) => void
    score: number
    updateScore: (score: number) => void
    rank: string
    updateRank: (score: number, totalQuestionNum: number) => void
}

// Create the QuizContext
export const QuizContext = createContext<QuizContextProps | undefined>(
    undefined,
);

// Provide the context
export const QuizProvider = (props: { children: React.ReactNode }) => {
    // Define the state variables
    const [totalQuestionNum, setTotalQuestionNum] = useState<number>(0);
    const [currentQuestionNum, setCurrentQuestionNum] = useState<number>(1);
    const [quizStatus, setQuizStatus] = useState<string>('start');
    const [score, setScore] = useState<number>(0);
    const [rank, setRank] = useState<string>('');

    // Define the functions
    const updateTotalQuestionNum = (num: number) => {
        setTotalQuestionNum(num);
    }

    const updateCurrentQuestionNum = (num: number) => {
        setCurrentQuestionNum(num);
    }

    const updateQuizStatus = (status: string) => {
        setQuizStatus(status);
    }

    const updateScore = (score: number) => {
        setScore(score);
    }

    const updateRank = (score: number, totalQuestionNum: number) => {
        const scorePercentage = score / totalQuestionNum;

        if (0 <= scorePercentage && scorePercentage <= 0.2) {
            setRank('Normals player');
        } else if (0.3 <= scorePercentage && scorePercentage <= 0.4) {
            setRank('Iron');
        } else if (0.5 <= scorePercentage && scorePercentage <= 0.6) {
            setRank('Bronze');
        } else if (0.7 <= scorePercentage && scorePercentage <= 0.8) {
            setRank('Silver');
        } else if (0.9 <= scorePercentage && scorePercentage <= 1) {
            setRank('Gold');
        }
    }
    
    // Create value for the context
    const value: QuizContextProps = {
        totalQuestionNum,
        updateTotalQuestionNum,
        currentQuestionNum,
        updateCurrentQuestionNum,
        quizStatus,
        updateQuizStatus,
        score,
        updateScore,
        rank,
        updateRank,
    }

    // Provide the context value
    return (
        <QuizContext.Provider value={value}>{props.children}</QuizContext.Provider>
    );
}