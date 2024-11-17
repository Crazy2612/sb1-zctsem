import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Calendar, Tag, Trash2, Edit2, Check, X } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  mood: string;
  tags: string[];
}

const Journal: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      content: entry,
      mood,
      tags,
    };
    setEntries([newEntry, ...entries]);
    setEntry('');
    setMood('');
    setTags([]);
  };

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleEntryDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEntryEdit = (entry: JournalEntry) => {
    setEditingEntry(entry.id);
    setEditContent(entry.content);
  };

  const handleEditSave = (id: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, content: editContent } : entry
    ));
    setEditingEntry(null);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Daily Journal</h1>
        <p className="text-gray-600 dark:text-gray-300">Express your thoughts and feelings freely</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-purple-600 dark:text-purple-400" size={20} />
              <span className="text-gray-600 dark:text-gray-300">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="text-purple-600 dark:text-purple-400" size={20} />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagAdd}
                placeholder="Add tags..."
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <AnimatePresence>
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              How are you feeling?
            </label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              placeholder="Describe your mood..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Write your thoughts
            </label>
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 resize-none"
              placeholder="What's on your mind today?"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            <Save size={20} />
            <span>Save Entry</span>
          </motion.button>
        </form>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.date.toLocaleDateString()}
                  </p>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    Mood: {entry.mood}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEntryEdit(entry)}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <Edit2 size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEntryDelete(entry.id)}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>

              {editingEntry === entry.id ? (
                <div className="space-y-4">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    rows={4}
                  />
                  <div className="flex justify-end space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditSave(entry.id)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <Check size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingEntry(null)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X size={18} />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">{entry.content}</p>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Journal;