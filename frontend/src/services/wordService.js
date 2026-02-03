// Word Service - Handles random word selection from categories
import { categories, getCategoryList } from '../data/categories';

/**
 * Selects a random category and set, then picks words for players and imposters
 * @returns {Object} { category, mainWord, imposterWord, setWords }
 */
export const selectRandomWords = () => {
    // Get random category
    const categoryKeys = getCategoryList();
    const randomCategoryKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const category = categories[randomCategoryKey];

    // Get random set from category
    const sets = category.sets;
    const randomSet = sets[Math.floor(Math.random() * sets.length)];

    // Shuffle the set to get random words
    const shuffledSet = [...randomSet].sort(() => Math.random() - 0.5);

    // First word for non-imposters, second word for imposters
    const mainWord = shuffledSet[0];
    const imposterWord = shuffledSet[1];

    return {
        categoryName: category.name,
        categoryKey: randomCategoryKey,
        mainWord,
        imposterWord,
        setWords: randomSet,
    };
};

/**
 * Get a specific word for a player based on their role
 * @param {boolean} isImposter - Whether the player is an imposter
 * @param {string} mainWord - The word for non-imposters
 * @param {string} imposterWord - The word for imposters
 * @returns {string} The word for this player
 */
export const getPlayerWord = (isImposter, mainWord, imposterWord) => {
    return isImposter ? imposterWord : mainWord;
};
