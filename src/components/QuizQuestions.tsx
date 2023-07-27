import { useEffect, useState } from 'react';
import { useQuizContext } from '../context';
import { toast } from 'react-hot-toast';
import ProgressBar from '@ramonak/react-progress-bar';

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
import LastWhisper from '../assets/LastWhisper.png';
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
import SunfireCape from '../assets/SunfireCape.png';
import TacticansCrown from '../assets/TacticiansCrown.png';
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

// Create a BaseItems enum to hold the full names of the base items
enum BaseItems {
    Spatula = "Spatula",
    Tear = "Tear of the Goddess",
    Rod = "Needlessly Large Rod",
    Sword = "B.F. Sword",
    Cloak = "Negatron Cloak",
    Vest = "Chain Vest",
    Bow = "Recurve Bow",
    Belt = "Giant's Belt",
    Gloves = "Sparring Gloves",
}

// Object with image source references
const itemImages = {
    "Archangel's Staff": ArchangelsStaff,
    "B.F. Sword": BFSword,
    "Bloodthirster": Bloodthirster,
    "Blue Buff": BlueBuff,
    "Bramble Vest": BrambleVest,
    "Chain Vest": ChainVest,
    "Chalice of Power": ChaliceofPower,
    "Challenger Emblem": ChallengerEmblem,
    "Deathblade": Deathblade,
    "Demacia Emblem": DemaciaEmblem,
    "Dragon's Claw": DragonsClaw,
    "Edge of Night": EdgeofNight,
    "Gargoyle Stoneplate": GargoyleStoneplate,
    "Giant's Belt": GiantsBelt,
    "Giant Slayer": GiantSlayer,
    "Guardbreaker": Guardbreaker,
    "Guinsoo's Rageblade": GuinsoosRageblade,
    "Hand of Justice": HandofJustice,
    "Hextech Gunblade": HextechGunblade,
    "Infinity Edge": InfinityEdge,
    "Ionia Emblem": IoniaEmblem,
    "Ionic Spark": IonicSpark,
    "Jeweled Gauntlet": JeweledGauntlet,
    "Juggernaut Emblem": JuggernautEmblem,
    "Last Whisper": LastWhisper,
    "Locket of the Iron Solari": LocketoftheIronSolari,
    "Morellonomicon": Morellonomicon,
    "Needlessly Large Rod": NeedlesslyLargeRod,
    "Negatron Cloak": NegatronCloak,
    "Noxus Emblem": NoxusEmblem,
    "Protector's Vow": ProtectorsVow,
    "Quicksilver": Quicksilver,
    "Rabadon's Deathcap": RabadonsDeathcap,
    "Rapid Firecannon": RapidFirecannon,
    "Recurve Bow": RecurveBow,
    "Redemption": Redemption,
    "Runaan's Hurricane": RunaansHurricane,
    "Shroud of Stillness": ShroudofStillness,
    "Shurima Emblem": ShurimaEmblem,
    "Slayer Emblem": SlayerEmblem,
    "Sorcerer Emblem": SorcererEmblem,
    "Sparring Gloves": SparringGloves,
    "Spatula": Spatula,
    "Spear of Shojin": SpearofShojin,
    "Statikk Shiv": StatikkShiv,
    "Sunfire Cape": SunfireCape,
    "Tactician's Crown": TacticansCrown,
    "Tear of the Goddess": TearoftheGoddess,
    "Thief's Gloves": ThiefsGloves,
    "Titan's Resolve": TitansResolve,
    "Warmog's Armor": WarmogsArmor,
    "Zeke's Herald": ZekesHerald,
    "Zephyr": Zephyr,
    "Zz'Rot Portal": ZzRotPortal,
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
        ability: "The holder gains the Noxus trait.",
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
        baseItem1: BaseItems.Tear,
        baseItem2: BaseItems.Gloves,
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
        ability: "Grants 50 bonus Ability Power.",
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

    const [questionContentImg1, setQuestionContentImg1] = useState('');
    const [questionContentImg2, setQuestionContentImg2] = useState('');
    const [option1Img1, setOption1Img1] = useState('');
    const [option1Img2, setOption1Img2] = useState('');
    const [option2Img1, setOption2Img1] = useState('');
    const [option2Img2, setOption2Img2] = useState('');
    const [option3Img1, setOption3Img1] = useState('');
    const [option3Img2, setOption3Img2] = useState('');
    const [option4Img1, setOption4Img1] = useState('');
    const [option4Img2, setOption4Img2] = useState('');

    // Component to render the progress bar
    const QuizProgressBar = () => {
        const progress = ((currentQuestionNum - 1) / totalQuestionNum) * 100;
        return <ProgressBar completed={progress} />
    }

    // Function to create each question
    const createQuestion = () => {
        // 1. Choose a random question type
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        const questionType = randomQuestion.type;
        setQuestionText(randomQuestion.text);

        // 2. Choose a random item (subject) from the items not yet used
        const itemsNotUsed = items.filter(item => {
            return item.used === false;
        });
        const randomItemIndex = Math.floor(Math.random() * itemsNotUsed.length);
        const subject = itemsNotUsed[randomItemIndex];
        const itemsArrayIndex = items.findIndex(item => item.name === subject.name);
        items[itemsArrayIndex].used = true;

        // 3. Set the question content (including image/s) based on the question type
        if (questionType === 'chooseCombinedItem') {
            setQuestionContent(`${subject.baseItem1} + ${subject.baseItem2}`);
            setQuestionContentImg1(itemImages[subject.baseItem1]);
            setQuestionContentImg2(itemImages[subject.baseItem2]);
        } else if (questionType === 'chooseBaseItems' || randomQuestion.type === 'chooseAbility') {
            setQuestionContent(subject.name);
            setQuestionContentImg1(itemImages[subject.name]);
            setQuestionContentImg2('');
        } else if (questionType === 'chooseItemFromAbility') {
            setQuestionContent(subject.ability);
            setQuestionContentImg1('');
            setQuestionContentImg2('');
        }

        // 4. Set the four options (including the correct option) based on the question type
        // take options from any item other than the question's subject
        // *** add a condition where if the subject is an emblem, all the options should be emblems and maybe all if it isn't an emblem, all the options should NOT be emblems (probs separate emblems into their own array)
        const otherItems = items.filter(item => {
            return item.name !== subject.name;
        });
        const options: string[] = [];
        let possibleOptions: string[] = [];
        
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
        const newShuffledArray = shuffleArray(options);
        setShuffledOptions(newShuffledArray);

        // set image/s for each option based on the question type
        if (questionType === 'chooseCombinedItem' || questionType === 'chooseItemFromAbility') {
            const option1 = newShuffledArray[0];
            const option2 = newShuffledArray[1];
            const option3 = newShuffledArray[2];
            const option4 = newShuffledArray[3];
            setOption1Img1(itemImages[option1]);
            setOption1Img2('');
            setOption2Img1(itemImages[option2]);
            setOption2Img2('');
            setOption3Img1(itemImages[option3]);
            setOption3Img2('');
            setOption4Img1(itemImages[option4]);
            setOption4Img2('');
        } else if (questionType === 'chooseBaseItems') {
            const option1Array = newShuffledArray[0].split(' + ');
            const option1Part1 = option1Array[0];
            const option1Part2 = option1Array[option1Array.length - 1];
            const option2Array = newShuffledArray[1].split(' + ');
            const option2Part1 = option2Array[0];
            const option2Part2 = option2Array[option2Array.length - 1];
            const option3Array = newShuffledArray[2].split(' + ');
            const option3Part1 = option3Array[0];
            const option3Part2 = option3Array[option3Array.length - 1];
            const option4Array = newShuffledArray[3].split(' + ');
            const option4Part1 = option4Array[0];
            const option4Part2 = option4Array[option4Array.length - 1];
            setOption1Img1(itemImages[option1Part1]);
            setOption1Img2(itemImages[option1Part2]);
            setOption2Img1(itemImages[option2Part1]);
            setOption2Img2(itemImages[option2Part2]);
            setOption3Img1(itemImages[option3Part1]);
            setOption3Img2(itemImages[option3Part2]);
            setOption4Img1(itemImages[option4Part1]);
            setOption4Img2(itemImages[option4Part2]);
        } else if (questionType === 'chooseAbility') {
            setOption1Img1('');
            setOption1Img2('');
            setOption2Img1('');
            setOption2Img2('');
            setOption3Img1('');
            setOption3Img2('');
            setOption4Img1('');
            setOption4Img2('');
        }
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
        createQuestion();
        console.log('sup');
    }, []);

    // Function to get the class name for each option button (based on if it is the correct option or incorrect but has been selected)
    function getOptionClassName(optionNum: number, optionValue: string) {
        if (optionValue === correctOption) {
            return `option-${optionNum}-btn correct-option`;
        } else if (optionValue === answer) {
            return `option-${optionNum}-btn incorrect-option`;
        } else {
            return `option-${optionNum}-btn`;
        }
    }

    // Render the QuizQuestions view
    return (
        <div className='question-view'>
            <div className='progress-bar'>
                {currentQuestionNum} of {totalQuestionNum}
                <QuizProgressBar />
            </div>

            <div className='question-options-div'>
                <div className='question'>
                    <div className='question-text'>
                        {questionText}
                    </div>
                    <div className='question-content'>
                        {questionContent}
                        {questionContentImg1 !== '' ? (
                            <div className='question-content-images'>
                                <img src={questionContentImg1}></img>
                                {questionContentImg2 !== '' ? <img src={questionContentImg2}></img> : ''}
                            </div>
                        ) : ('')}
                    </div>
                </div>

                <div className={result === '' ? 'options' : 'options-inactive'}>
                    <button
                        className={getOptionClassName(1, shuffledOptions[0])}
                        onClick={() => 
                            (result === '' ? handleAnswerSelection(shuffledOptions[0]) : toast.error("You have already submitted your answer!"))
                        }
                    >
                        a. {shuffledOptions[0]}
                        {option1Img1 !== '' ? (
                        <div className='option-1-images'>
                            <img src={option1Img1}></img>
                            {option1Img2 !== '' ? <img src={option1Img2}></img> : ''}
                        </div>
                        ) : ('')}
                    </button>
                    <button
                        className={getOptionClassName(2, shuffledOptions[1])}
                        onClick={() => 
                            (result === '' ? handleAnswerSelection(shuffledOptions[1]) : toast.error("You have already submitted your answer!"))
                        }
                    >
                        b. {shuffledOptions[1]}
                        {option2Img1 !== '' ? (
                        <div className='option-2-images'>
                            <img src={option2Img1}></img>
                            {option2Img2 !== '' ? <img src={option2Img2}></img> : ''}
                        </div>
                        ) : ('')}
                    
                    </button>
                    <button
                        className={getOptionClassName(3, shuffledOptions[2])}
                        onClick={() => 
                            (result === '' ? handleAnswerSelection(shuffledOptions[2]) : toast.error("You have already submitted your answer!"))
                        }
                    >
                        c. {shuffledOptions[2]}
                        {option3Img1 !== '' ? (
                        <div className='option-3-images'>
                            <img src={option3Img1}></img>
                            {option3Img2 !== '' ? <img src={option3Img2}></img> : ''}
                        </div>
                        ) : ('')}
                    </button>
                    <button
                        className={getOptionClassName(4, shuffledOptions[3])}
                        onClick={() => 
                            (result === '' ? handleAnswerSelection(shuffledOptions[3]) : toast.error("You have already submitted your answer!"))
                        }
                    >
                        d. {shuffledOptions[3]}
                        {option4Img1 !== '' ? (
                        <div className='option-4-images'>
                            <img src={option4Img1}></img>
                            {option4Img2 !== '' ? <img src={option4Img2}></img> : ''}
                        </div>
                        ) : ('')}
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