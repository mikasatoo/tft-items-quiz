import { createContext, useState } from 'react';

// Define interface for the QuizContextProps
interface QuizContextProps {
    totalQuestionNum: number
    updateTotalQuestionNum: (num: number) => void
    quizStatus: string
    updateQuizStatus: (status: string) => void
    score: number
    updateScore: (score: number) => void
    rank: string
    updateRank: (score: number) => void
}

// Create the QuizContext
export const QuizContext = createContext<QuizContextProps | undefined>(
    undefined,
);

// Provide the context
export const QuizProvider = (props: { children: React.ReactNode }) => {
    // Define the state variables
    const [totalQuestionNum, setTotalQuestionNum] = useState<number>(0);
    const [quizStatus, setQuizStatus] = useState<string>('start');
    const [score, setScore] = useState<number>(0);
    const [rank, setRank] = useState<string>('');

    // Define the functions
    const updateTotalQuestionNum = (num: number) => {
        setTotalQuestionNum(num);
    }

    const updateQuizStatus = (status: string) => {
        setQuizStatus(status);
    }

    const updateScore = (score: number) => {
        setScore(score);
    }

    const updateRank = (score: number) => {
        if (score == 0 || score == 1) {
            setRank('Normals player');
        } else if (score == 2 || score == 3) {
            setRank('Platinum');
        }

    }
    
    // Create value for the context
    const value: QuizContextProps = {
        totalQuestionNum,
        updateTotalQuestionNum,
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