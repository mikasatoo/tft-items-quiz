import { useEffect, useState } from 'react';
import { useQuizContext } from '../context';
import { toast } from 'react-hot-toast';

import ArchangelsStaff from '../assets/ArchangelsStaff.png';
import BFSword from '../assets/BFSword.png';
import Bloodthirster from '../assets/Bloodthirster.png';
import BlueBuff from '../assets/BlueBuff.png';
import BrambleVest from '../assets/BrambleVest.png';
import ChainVest from '../assets/ChainVest.png';
import ChaliceofPower from '../assets/ChaliceofPower.png';
import ChallengerEmblem from '../assets/ChallengerEmblem.png';
import Deathblade from '../assets/Deathblade.png';
import DemaciaEmblem from '../assets/DemaciaEmblem.png';
import DragonsClaw from '../assets/DragonsClaw.png';
import EdgeofNight from '../assets/EdgeofNight.png';
import GargoyleStoneplate from '../assets/GargoyleStoneplate.png';
import GiantsBelt from '../assets/GiantsBelt.png';
import GiantSlayer from '../assets/GiantSlayer.png';
import Guardbreaker from '../assets/Guardbreaker.png';
import GuinsoosRageblade from '../assets/GuinsoosRageblade.png';
import HandofJustice from '../assets/HandofJustice.png';
import HextechGunblade from '../assets/HextechGunblade.png';
import InfinityEdge from '../assets/InfinityEdge.png';
import IoniaEmblem from '../assets/IoniaEmblem.png';
import IonicSpark from '../assets/IonicSpark.png';
import JeweledGauntlet from '../assets/JeweledGauntlet.png';
import JuggernautEmblem from '../assets/JuggernautEmblem.png';
import LastWhispher from '../assets/LastWhispher.png';
import LocketoftheIronSolari from '../assets/LocketoftheIronSolari.png';
import Morellonomicon from '../assets/Morellonomicon.png';
import NeedlesslyLargeRod from '../assets/NeedlesslyLargeRod.png';
import NegatronCloak from '../assets/NegatronCloak.png';
import NoxusEmblem from '../assets/NoxusEmblem.png';
import ProtectorsVow from '../assets/ProtectorsVow.png';
import Quicksilver from '../assets/Quicksilver.png';
import RabadonsDeathcap from '../assets/RabadonsDeathcap.png';
import RapidFirecannon from '../assets/RapidFirecannon.png';
import RecurveBow from '../assets/RecurveBow.png';
import Redemption from '../assets/Redemption.png';
import RunaansHurricane from '../assets/RunaansHurricane.png';
import ShroudofStillness from '../assets/ShroudofStillness.png';
import ShurimaEmblem from '../assets/ShurimaEmblem.png';
import SlayerEmblem from '../assets/SlayerEmblem.png';
import SorcererEmblem from '../assets/SorcererEmblem.png';
import SparringGloves from '../assets/SparringGloves.png';
import Spatula from '../assets/Spatula.png';
import SpearofShojin from '../assets/SpearofShojin.png';
import StatikkShiv from '../assets/StatikkShiv.png';
import SunfireCap from '../assets/SunfireCap.png';
import TacticansCrown from '../assets/TacticansCrown.png';
import TearoftheGoddess from '../assets/TearoftheGoddess.png';
import ThiefsGloves from '../assets/ThiefsGloves.png';
import TitansResolve from '../assets/TitansResolve.png';
import WarmogsArmor from '../assets/WarmogsArmor.png';
import ZekesHerald from '../assets/ZekesHerald.png';
import Zephyr from '../assets/Zephyr.png';
import ZzRotPortal from '../assets/ZzRotPortal.png';

// Define type for Question objects
type Question = {
    type: string
    text: string
}

// Define type of Item objects
type Item = {
    name: string
    baseItem1: BaseItems
    baseItem2: BaseItems
    ability: string
    used: boolean
}

// Create a BaseItems enum to hold the base items
enum BaseItems {
    Spatula = "Spatula",
    Tear = "Tear of the Goddess",
    Rod = "Needlessly Large Rod",
    Sword = "B.F. Sword",
    Cloak = "Negatron Cloak",
    Vest = "Chain Vest",
    Bow = "Recurve Bow",
    Belt = "Giant's Belt",
    Gloves = "Sparring Gloves"
}

// Define questions array
const questions: Question[] = [
    {
        type: 'chooseCombinedItem',
        text: 'These two base items combine to form which item?',
    },
    {
        type: 'chooseBaseItems',
        text: 'This item is created by combining which two base items?',
    },
    {
        type: 'chooseAbility',
        text: 'What does this item do when it is equipped?',
    },
    {
        type: 'chooseItemFromAbility',
        text: 'Which item provides this ability when it is equipped?'
    },
]

// Define items array
const items: Item[] = [
    {
        name: "Challenger Emblem",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Bow,
        ability: "The holder gains the Challenger trait.",
        used: false,
    },
    {
        name: "Demacia Emblem",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Cloak,
        ability: "The holder gains the Demacia trait.",
        used: false,
    },
    {
        name: "Ionia Emblem",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Sword,
        ability: "The holder gains the Ionia trait.",
        used: false,
    },
    {
        name: "Juggernaut Emblem",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Vest,
        ability: "The holder gains the Juggernaut trait.",
        used: false,
    },
    {
        name: "Noxus Emblem",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Belt,
        ability: "The holder gains the Challenger trait.",
        used: false,
    },
    {
        name: "Shurima Emblem",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Rod,
        ability: "The holder gains the Shurima trait.",
        used: false,
    },
    {
        name: "Slayer Emblem",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Gloves,
        ability: "The holder gains the Slayer trait.",
        used: false,
    },
    {
        name: "Sorcerer Emblem",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Tear,
        ability: "The holder gains the Sorcerer trait.",
        used: false,
    },
    {
        name: "Archangel's Staff",
        baseItem1: BaseItems.Rod,
        baseItem2: BaseItems.Tear,
        ability: "Grant 10 bonus Ability Power. Combat start: Grant 20 Ability Power every 5 seconds.",
        used: false,
    },
    {
        name: "Bloodthirster",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Cloak,
        ability: "Grant 20% Omnivamp. Once per combat at 40% Health, gain a 25% maximum Health shield that lasts up to 5 seconds.",
        used: false,
    },
    {
        name: "Blue Buff",
        baseItem1: BaseItems.Tear,
        baseItem2: BaseItems.Tear,
        ability: "Grant 10 bonus starting Mana and 10 bonus Ability Power. Abilities cost 10 less Mana to cast. If the holder gets at least 1 takedown within 3 seconds of casting, gain 10 Mana.",
        used: false,
    },
    {
        name: "Bramble Vest",
        baseItem1: BaseItems.Vest,
        baseItem2: BaseItems.Vest,
        ability: "Grants 30 bonus Armor. Negates 75% bonus damage from incoming critical strikes. When struck by an attack, deal 75/100/150★ magic damage to all nearby enemies (once every 2 seconds).",
        used: false,
    },
    {
        name: "Chalice of Power",
        baseItem1: BaseItems.Cloak,
        baseItem2: BaseItems.Tear,
        ability: "Combat start: Grant 20 Ability Power to the holder and allies within 1 hex in the same row.",
        used: false,
    },
    {
        name: "Deathblade",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Sword,
        ability: "Grant 46% bonus Attack Damage.",
        used: false,
    },
    {
        name: "Dragon's Claw",
        baseItem1: BaseItems.Cloak,
        baseItem2: BaseItems.Cloak,
        ability: "Grants 45 bonus Magic Resist. Every 2 seconds, regenerate 5% maximum Health.",
        used: false,
    },
    {
        name: "Edge of Night",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Vest,
        ability: "Once per combat: At 60% Health, briefly become stealthed, becoming untargetable and shedding negative effects. Then, grant 15% bonus Attack Speed.",
        used: false,
    },
    {
        name: "Gargoyle Stoneplate",
        baseItem1: BaseItems.Vest,
        baseItem2: BaseItems.Cloak,
        ability: "Grant 15 Armor and 15 Magic Resist for each enemy targeting the holder.",
        used: false,
    },
    {
        name: "Giant Slayer",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Bow,
        ability: "Grant 20% bonus Attack Damage and 20 bonus Ability Power. Abilities and attacks deal 25% more damage to enemies with more than 1600 maximum Health.",
        used: false,
    },
    {
        name: "Guardbreaker",
        baseItem1: BaseItems.Belt,
        baseItem2: BaseItems.Gloves,
        ability: "Grant 20% bonus Attack Damage and 20 bonus Ability Power. After damaging a shielded enemy, Abilities and attacks deal 25% more damage for 3 seconds.",
        used: false,
    },
    {
        name: "Guinsoo's Rageblade",
        baseItem1: BaseItems.Rod,
        baseItem2: BaseItems.Bow,
        ability: "Attacks grant 4% bonus Attack Speed. This effect stacks.",
        used: false,
    },
    {
        name: "Hand of Justice",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Bow,
        ability: "Grant 2 effects: • 15% Attack Damage and 15 Ability Power. • 15% Omnivamp. Each round, randomly double 1 of these effects.",
        used: false,
    },
    {
        name: "Hextech Gunblade",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Rod,
        ability: "Grant 22% Omnivamp, which also heals the lowest percent Health ally.",
        used: false,
    },
    {
        name: "Infinity Edge",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Gloves,
        ability: "Grant 20% bonus Attack Damage and 15% bonus Critical Strike Chance. Damage from an Ability can critically strike.",
        used: false,
    },
    {
        name: "Ionic Spark",
        baseItem1: BaseItems.Rod,
        baseItem2: BaseItems.Cloak,
        ability: "50% Shred enemies within 2 hexes. When enemies cast an Ability, they are also zapped for magic damage equal to 160% of their maximum Mana.",
        used: false,
    },
    {
        name: "Jeweled Gauntlet",
        baseItem1: BaseItems.Rod,
        baseItem2: BaseItems.Gloves,
        ability: "Grant 15 bonus Ability Power and 15% Critical Strike Chance. Damage from an Ability can critically strike.",
        used: false,
    },
    {
        name: "Last Whisper",
        baseItem1: BaseItems.Bow,
        baseItem2: BaseItems.Gloves,
        ability: "Grant 10% bonus Attack Damage. Any physical damage dealt 50% Sunders the target for 3 seconds. This effect does not stack.",
        used: false,
    },
    {
        name: "Locket of the Iron Solari",
        baseItem1: BaseItems.Vest,
        baseItem2: BaseItems.Rod,
        ability: "Combat start: Shield the holder and allies within 1 hex in the same row for 250/300/350★ damage for 8 seconds.",
        used: false,
    },
    {
        name: "Morellonomicon",
        baseItem1: BaseItems.Belt,
        baseItem2: BaseItems.Rod,
        ability: "Grants 15 bonus Ability Power. Magic or true damage from the holder's Ability 10% Burns and 33% Wounds enemies for the 10 seconds.",
        used: false,
    },
    {
        name: "Protector's Vow",
        baseItem1: BaseItems.Vest,
        baseItem2: BaseItems.Tear,
        ability: "Grant 30 bonus starting Mana. Once per combat: At 40% Health, gain a 25% maximum Health shield that lasts up to 5 seconds and 25 Armor and Magic Resist for the rest of combat.",
        used: false,
    },
    {
        name: "Quicksilver",
        baseItem1: BaseItems.Cloak,
        baseItem2: BaseItems.Gloves,
        ability: "Combat start: Grant immunity to crowd control for 18 seconds.",
        used: false,
    },
    {
        name: "Rabadon's Deathcap",
        baseItem1: BaseItems.Rod,
        baseItem2: BaseItems.Rod,
        ability: "Grants 50 bonus Ability Power",
        used: false,
    },
    {
        name: "Rapid Firecannon",
        baseItem1: BaseItems.Bow,
        baseItem2: BaseItems.Bow,
        ability: "Grant 30% bonus Attack Speed and 1 bonus Attack Range. Attacks cannot miss.",
        used: false,
    },
    {
        name: "Redemption",
        baseItem1: BaseItems.Belt,
        baseItem2: BaseItems.Tear,
        ability: "Heal allies within 1 hex for 15% of their missing Health every 5 seconds. They also take 25% less multi-target damage for 5 seconds (damage reduction does not stack).",
        used: false,
    },
    {
        name: "Runaan's Hurricane",
        baseItem1: BaseItems.Cloak,
        baseItem2: BaseItems.Bow,
        ability: "Grant 20% bonus Attack Damage. Attacks fire a bolt at a nearby enemy, dealing 50% Attack Damage as physical damage.",
        used: false,
    },
    {
        name: "Shroud of Stillness",
        baseItem1: BaseItems.Vest,
        baseItem2: BaseItems.Gloves,
        ability: "Grant 250 bonus Health. Combat start: Shoots a beam that 30% Mana Reaves enemies.",
        used: false,
    },
    {
        name: "Spear of Shojin",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Tear,
        ability: "Grant 25 bonus Ability Power. Attacks restore 5 additional Mana.",
        used: false,
    },
    {
        name: "Statikk Shiv",
        baseItem1: BaseItems.Bow,
        baseItem2: BaseItems.Tear,
        ability: "Grant 15 bonus Ability Power. Every 3rd attack unleashes chain lightning that bounces to 4 enemies, dealing 30 magic damage and 50% Shredding them for 5 seconds.",
        used: false,
    },
    {
        name: "Sunfire Cape",
        baseItem1: BaseItems.Vest,
        baseItem2: BaseItems.Belt,
        ability: "Grant 100 bonus Health. Every 2 seconds, an enemy within 2 hexes is 10% Burned and 33% Wounded for 10 seconds.",
        used: false,
    },
    {
        name: "Tactician's Crown",
        baseItem1: BaseItems.Spatula,
        baseItem2: BaseItems.Spatula,
        ability: "Your team gains +1 maximum team size.",
        used: false,
    },
    {
        name: "Thief's Gloves",
        baseItem1: BaseItems.Gloves,
        baseItem2: BaseItems.Gloves,
        ability: "Each round: Equip 2 random items.",
        used: false,
    },
    {
        name: "Titan's Resolve",
        baseItem1: BaseItems.Vest,
        baseItem2: BaseItems.Bow,
        ability: "Grant 2% Attack Damage and 2 Ability Power when attacking or taking damage, stacking up to 25 times. At full stacks, grant 25 Armor and Magic Resist.",
        used: false,
    },
    {
        name: "Warmog's Armor",
        baseItem1: BaseItems.Belt,
        baseItem2: BaseItems.Belt,
        ability: "Grant 500 bonus Health.",
        used: false,
    },
    {
        name: "Zeke's Herald",
        baseItem1: BaseItems.Sword,
        baseItem2: BaseItems.Belt,
        ability: "Combat start: Grant 15% Attack Speed to the holder and allies within 1 hex in the same row.",
        used: false,
    },
    {
        name: "Zephyr",
        baseItem1: BaseItems.Belt,
        baseItem2: BaseItems.Cloak,
        ability: "Grant 15% bonus Attack Speed. Combat start: Summon a whirlwind on the opposite side of the arena that removes the closest enemy from combat for 5 seconds. [Ignores crowd control immunity.]",
        used: false,
    },
    {
        name: "Zz'Rot Portal",
        baseItem1: BaseItems.Belt,
        baseItem2: BaseItems.Bow,
        ability: "Combat start: Taunt. On death, a Voidspawn arises, Taunting nearby enemies.",
        used: false,
    },
]

export const QuizQuestions = () => {
    // Access variables and functions from the QuizContext
    const { totalQuestionNum, currentQuestionNum, updateCurrentQuestionNum, updateQuizStatus, score, updateScore, updateRank } = useQuizContext();

    // Create other state variables
    const [questionText, setQuestionText] = useState<string>('');
    const [questionContent, setQuestionContent] = useState<string>('');
    const [correctOption, setCorrectOption] = useState<string>('');
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [result, setResult] = useState<string>('');

    // Function to handle creating each question
    const handleQuestion = () => {
        // 1. Choose a random question type
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        const questionType = randomQuestion.type;
        setQuestionText(randomQuestion.text);

        // 2. Choose a random item (subject) from the items not yet used
        const itemsNotUsed = items.filter(item => {
            return item.used === false;
        });
        const randomItemIndex = Math.floor(Math.random() * itemsNotUsed.length);
        const subject = itemsNotUsed[randomItemIndex]
        items[randomItemIndex].used = true;

        // 3. Set the question content based on the question type
        // *** also want to set image links for these and render them
        if (questionType === 'chooseCombinedItem') {
            setQuestionContent(`${subject.baseItem1} + ${subject.baseItem2}`);
        } else if (questionType === 'chooseBaseItems' || randomQuestion.type === 'chooseAbility') {
            setQuestionContent(subject.name);
        } else if (questionType === 'chooseItemFromAbility') {
            setQuestionContent(subject.ability);
        }

        // 4. Set the four options (including the correct option) based on the question type
        // take options from any item other than the question's subject
        const otherItems = items.filter(item => {
            return item.name !== subject.name;
        });
        const options: string[] = [];
        let possibleOptions: string[] = [];
        
        // *** also want to set image links for these and render them
        if (questionType === 'chooseCombinedItem' || questionType === 'chooseItemFromAbility') {
            setCorrectOption(subject.name);
            options.push(subject.name);
            possibleOptions = otherItems.map(item => item.name);
        } else if (questionType === 'chooseBaseItems') {
            setCorrectOption(`${subject.baseItem1} + ${subject.baseItem2}`);
            options.push(`${subject.baseItem1} + ${subject.baseItem2}`);
            possibleOptions = otherItems.map(item => `${item.baseItem1} + ${item.baseItem2}`);
        } else if (questionType === 'chooseAbility') {
            setCorrectOption(subject.ability);
            options.push(subject.ability);
            possibleOptions = otherItems.map(item => item.ability);
        }

        // loop through possibleOptions array to get the other three random options
        for (let i = 1; i <= 3; i++) {
            const randomOptionIndex = Math.floor(Math.random() * possibleOptions.length);
            const newOption = possibleOptions[randomOptionIndex];
            options.push(newOption);
            possibleOptions.splice(randomOptionIndex, 1);  // remove the used option from possibleOptions
        }
        
        // shuffle the options array to randomize the order
        setShuffledOptions(shuffleArray(options));
    }

    // Function to shuffle the elements of an array randomly
    function shuffleArray(array: string[]) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray;
    }

    // Function to handle selecting an answer (before submitting)
    const handleAnswerSelection = (option: string) => {
        if (result === '') {
            setAnswer(option);
        }
    }

    // Function to handle submitting an answer
    const handleSubmit = () => {
        if (answer === correctOption) {
            setResult(`Correct! You selected: ${correctOption}`);
        } else {
            setResult(`Incorrect! The correct answer is: ${correctOption}`);
        }
    }

    // Function to handle next question
    const handleNext = () => {
        setAnswer('');
        setResult('');

        let updatedScore = score;
        if (result.includes('Correct!')) {
            updatedScore = score + 1;
            updateScore(updatedScore);
        }

        updateCurrentQuestionNum(currentQuestionNum + 1);

        // If end of quiz is reached, update rank and quiz status (move to QuizEnd view)
        if (currentQuestionNum === totalQuestionNum) {
            updateRank(updatedScore, totalQuestionNum);
            updateQuizStatus('end');
        }
    }

    // *** Run handleQuestion() once on first render and when currentQuestionNum changes??
    useEffect(() => {
        handleQuestion();
        console.log('sup');
    }, []);

    // Render the QuizQuestions view
    return (
        <div className='question-view'>
            <div className='progress-bar'>
                {currentQuestionNum} of {totalQuestionNum}
                {/* *** Add progress bar JSX / code */}
            </div>

            <div className='question-options-div'>
                <div className='question'>
                    <div className='question-text'>
                        {questionText}
                    </div>
                    <div className='question-content'>
                        {questionContent}
                    </div>
                </div>

                <div className={result === '' ? 'options' : 'options inactive'}>
                    <button
                            className='option-1-btn'
                            onClick={() => 
                                (result === '' ? handleAnswerSelection(shuffledOptions[0]) : toast.error("You have already submitted your answer!"))
                            }
                        >
                            a. {shuffledOptions[0]}
                    </button>
                    <button
                            className='option-2-btn'
                            onClick={() => 
                                (result === '' ? handleAnswerSelection(shuffledOptions[1]) : toast.error("You have already submitted your answer!"))
                            }
                        >
                            b. {shuffledOptions[1]}
                    </button>
                    <button
                            className='option-3-btn'
                            onClick={() => 
                                (result === '' ? handleAnswerSelection(shuffledOptions[2]) : toast.error("You have already submitted your answer!"))
                            }
                        >
                            c. {shuffledOptions[2]}
                    </button>
                    <button
                            className='option-4-btn'
                            onClick={() => 
                                (result === '' ? handleAnswerSelection(shuffledOptions[3]) : toast.error("You have already submitted your answer!"))
                            }
                        >
                            d. {shuffledOptions[3]}
                    </button>
                </div>
            </div>

            {answer !== '' ? (
                <div className={result === '' ? 'submit-btn-div' : 'submit-btn-div inactive'}>
                    <button
                        className='submit-btn'
                        onClick={() => 
                            (result === '' ? handleSubmit() : toast.error("You have already submitted your answer!"))
                        }
                    >
                        Submit
                    </button>
                </div>
            ) : ('')}

            {result !== '' ? (
                <div className='result'>
                    <div className='result-output'>
                        {result}
                    </div>
                    <div className='next-btn-div'>
                        <button
                            className='next-btn'
                            onClick={() => handleNext()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : ('')}
        </div>
    );
}