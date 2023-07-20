import React, { useState } from 'react';

export const Quiz = () => {
    const [totalQuestionNum, setTotalQuestionNum] = useState<number>(0);
    const [currentQuestionNum, setCurrentQuestionNum] = useState<number>(0);

    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [correctOption, setCorrectOption] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);

    const [answer, setAnswer] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [score, setScore] = useState<number>(0);

    const [showScore, setShowScore] = useState<boolean>(false);
    const [rank, setRank] = useState<string>('');

    return (
        <div>
            {/* Render quiz UI */}
            Quiz
        </div>
    );
}