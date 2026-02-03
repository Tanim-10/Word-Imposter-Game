import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import {
    getCustomCategories,
    addCustomCategory,
    deleteCustomCategory,
    getAllCategories,
    isCustomCategory,
} from "../data/categories";

const CustomWords = () => {
    const navigate = useNavigate();
    const [customCategories, setCustomCategories] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Form state
    const [categoryName, setCategoryName] = useState("");
    const [wordsInput, setWordsInput] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        refreshCategories();
    }, []);

    const refreshCategories = () => {
        setCustomCategories(getCustomCategories());
    };

    const generateKey = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now();
    };

    const parseWords = (input) => {
        // Split by newlines, each line is a set of words separated by commas
        const lines = input.trim().split('\n').filter(line => line.trim());
        return lines.map(line =>
            line.split(',').map(word => word.trim()).filter(word => word)
        ).filter(set => set.length >= 2);
    };

    const handleAddCategory = () => {
        setError("");

        if (!categoryName.trim()) {
            setError("Please enter a category name");
            return;
        }

        const sets = parseWords(wordsInput);
        if (sets.length === 0) {
            setError("Please add at least one word set (min 2 words per set)");
            return;
        }

        const key = generateKey(categoryName);
        addCustomCategory(key, categoryName.trim(), sets);
        refreshCategories();

        setCategoryName("");
        setWordsInput("");
        setShowAddModal(false);
    };

    const handleEditCategory = () => {
        setError("");

        if (!categoryName.trim()) {
            setError("Please enter a category name");
            return;
        }

        const sets = parseWords(wordsInput);
        if (sets.length === 0) {
            setError("Please add at least one word set (min 2 words per set)");
            return;
        }

        // Delete old and add new with same key
        const custom = getCustomCategories();
        custom[selectedCategory] = { name: categoryName.trim(), sets, isCustom: true };
        localStorage.setItem('wordImposterCustomCategories', JSON.stringify(custom));
        refreshCategories();

        setCategoryName("");
        setWordsInput("");
        setShowEditModal(false);
        setSelectedCategory(null);
    };

    const handleDeleteCategory = () => {
        if (selectedCategory) {
            deleteCustomCategory(selectedCategory);
            refreshCategories();
        }
        setShowDeleteModal(false);
        setSelectedCategory(null);
    };

    const openEditModal = (key) => {
        const cat = customCategories[key];
        setSelectedCategory(key);
        setCategoryName(cat.name);
        setWordsInput(cat.sets.map(set => set.join(', ')).join('\n'));
        setError("");
        setShowEditModal(true);
    };

    const openDeleteModal = (key) => {
        setSelectedCategory(key);
        setShowDeleteModal(true);
    };

    const openAddModal = () => {
        setCategoryName("");
        setWordsInput("");
        setError("");
        setShowAddModal(true);
    };

    const customKeys = Object.keys(customCategories);

    return (
        <div className="screen-container overflow-y-auto py-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-6 animate-fade-in">
                    <h1 className="text-2xl font-bold text-white mb-1">Custom Words</h1>
                    <p className="text-slate-400 text-sm">Add your own categories and word sets</p>
                </div>

                {/* Add Button */}
                <div className="mb-4 animate-fade-in">
                    <Button onClick={openAddModal} fullWidth>
                        ➕ Add New Category
                    </Button>
                </div>

                {/* Custom Categories List */}
                <div className="space-y-3 mb-6">
                    {customKeys.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 animate-fade-in">
                            <p className="text-4xl mb-2">📝</p>
                            <p className="text-sm">No custom categories yet</p>
                            <p className="text-xs text-slate-600 mt-1">Add your own words to play with!</p>
                        </div>
                    ) : (
                        customKeys.map(key => {
                            const cat = customCategories[key];
                            return (
                                <div
                                    key={key}
                                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 animate-fade-in"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-white font-medium">{cat.name}</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(key)}
                                                className="px-2 py-1 text-xs rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(key)}
                                                className="px-2 py-1 text-xs rounded bg-red-900/50 text-red-400 hover:bg-red-900"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-xs mb-2">
                                        {cat.sets.length} word set{cat.sets.length !== 1 ? 's' : ''}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {cat.sets.slice(0, 3).map((set, i) => (
                                            <span key={i} className="px-2 py-0.5 text-xs rounded bg-blue-900/30 text-blue-300 border border-blue-700/50">
                                                {set.slice(0, 2).join(', ')}{set.length > 2 ? '...' : ''}
                                            </span>
                                        ))}
                                        {cat.sets.length > 3 && (
                                            <span className="px-2 py-0.5 text-xs text-slate-500">
                                                +{cat.sets.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Back Button */}
                <div className="animate-fade-in">
                    <Button onClick={() => navigate("/")} variant="ghost" fullWidth>
                        ← Back to Home
                    </Button>
                </div>
            </div>

            {/* Add Category Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Category">
                <div>
                    <div className="mb-4">
                        <label className="block text-sm text-slate-400 mb-1">Category Name</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="e.g. Bollywood Movies"
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            maxLength={30}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-slate-400 mb-1">Word Sets</label>
                        <p className="text-xs text-slate-500 mb-2">
                            One set per line, words separated by commas. Min 2 words per set.
                        </p>
                        <textarea
                            value={wordsInput}
                            onChange={(e) => setWordsInput(e.target.value)}
                            placeholder={"Word1, Word2, Word3\nWord4, Word5, Word6"}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 h-32 resize-none font-mono text-sm"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                    <div className="flex gap-3">
                        <Button onClick={() => setShowAddModal(false)} variant="secondary" fullWidth>Cancel</Button>
                        <Button onClick={handleAddCategory} fullWidth>Add Category</Button>
                    </div>
                </div>
            </Modal>

            {/* Edit Category Modal */}
            <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Category">
                <div>
                    <div className="mb-4">
                        <label className="block text-sm text-slate-400 mb-1">Category Name</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                            maxLength={30}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-slate-400 mb-1">Word Sets</label>
                        <textarea
                            value={wordsInput}
                            onChange={(e) => setWordsInput(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 h-32 resize-none font-mono text-sm"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                    <div className="flex gap-3">
                        <Button onClick={() => setShowEditModal(false)} variant="secondary" fullWidth>Cancel</Button>
                        <Button onClick={handleEditCategory} fullWidth>Save Changes</Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Category?">
                <div className="text-center">
                    <p className="text-slate-300 mb-4">
                        Delete "{selectedCategory && customCategories[selectedCategory]?.name}"?
                    </p>
                    <div className="flex gap-3">
                        <Button onClick={() => setShowDeleteModal(false)} variant="secondary" fullWidth>Cancel</Button>
                        <Button onClick={handleDeleteCategory} variant="danger" fullWidth>Delete</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CustomWords;
