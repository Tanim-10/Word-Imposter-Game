// Word Context - Manages word assignment state
import { createContext, useContext, useState, useCallback } from 'react';
import { getAllCategories, getCategoryList } from '../data/categories';

const WordContext = createContext(null);

/**
 * Selects random words from selected categories or all categories
 * @param {string[]} selectedCategories - Array of category keys, empty means all
 * @returns {Object} Word selection result
 */
const selectWordsFromCategories = (selectedCategories = []) => {
    const categories = getAllCategories();
    const allCategoryKeys = getCategoryList();

    
    const availableKeys = selectedCategories.length > 0
        ? selectedCategories.filter(key => categories[key])
        : allCategoryKeys;

    if (availableKeys.length === 0) {
        return {
            categoryName: "Unknown",
            categoryKey: null,
            mainWord: "Word1",
            imposterWord: "Word2",
            setWords: ["Word1", "Word2"],
        };
    }

    const selectedKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    const category = categories[selectedKey];

    if (!category || !category.sets || category.sets.length === 0) {
        return {
            categoryName: "Unknown",
            categoryKey: null,
            mainWord: "Word1",
            imposterWord: "Word2",
            setWords: ["Word1", "Word2"],
        };
    }

    const sets = category.sets;
    const randomSet = sets[Math.floor(Math.random() * sets.length)];

    const shuffledSet = [...randomSet].sort(() => Math.random() - 0.5);

    return {
        categoryName: category.name,
        categoryKey: selectedKey,
        mainWord: shuffledSet[0],
        imposterWord: shuffledSet[1],
        setWords: randomSet,
    };
};

export const WordProvider = ({ children }) => {
    const [wordState, setWordState] = useState({
        categoryName: null,
        categoryKey: null,
        mainWord: null,
        imposterWord: null,
        setWords: [],
    });

    const selectWords = useCallback((selectedCategories = []) => {
        const selection = selectWordsFromCategories(selectedCategories);
        setWordState(selection);
        return selection;
    }, []);

    const resetWords = useCallback(() => {
        setWordState({
            categoryName: null,
            categoryKey: null,
            mainWord: null,
            imposterWord: null,
            setWords: [],
        });
    }, []);

    const getWordForPlayer = useCallback((isImposter) => {
        return isImposter ? wordState.imposterWord : wordState.mainWord;
    }, [wordState.mainWord, wordState.imposterWord]);

    return (
        <WordContext.Provider value={{
            ...wordState,
            selectWords,
            resetWords,
            getWordForPlayer,
        }}>
            {children}
        </WordContext.Provider>
    );
};

export const useWords = () => {
    const context = useContext(WordContext);
    if (!context) throw new Error('useWords must be used within a WordProvider');
    return context;
};

export default WordContext;
