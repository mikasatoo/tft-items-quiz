// import { createContext } from 'react';

// // Define interface for the QuestionsContextProps
// interface QuestionsContextProps {
//     questions: Question[]
// }

// // Add interface for Question objects
// export interface Question {
//     type: string
//     text: string
// }

// // Create the QuestionsContext
// export const QuestionsContext = createContext<QuestionsContextProps | undefined>(
//     undefined,
// );

// // Provide the context
// export const QuestionsProvider = (props: { children: React.ReactNode }) => {
//     // Define questions array
//     const questions = [
//         {
//             type: 'chooseCombinedItem',
//             text: 'These two base items combine to form which item?',
//         },
//         {
//             type: 'chooseBaseItems',
//             text: 'This item is created by combining which two base items?',
//         },
//         {
//             type: 'chooseAbility',
//             text: 'What does this item do when it is equipped?',
//         },
//         {
//             type: 'chooseItemFromAbility',
//             text: 'Which item provides this ability when it is equipped?'
//         },
//     ]

//     // Create value for the context
//     const value: QuestionsContextProps = {
//         questions,
//     }

//     // Provide the context value
//     return (
//         <QuestionsContext.Provider value={value}>{props.children}</QuestionsContext.Provider>
//     );
// }