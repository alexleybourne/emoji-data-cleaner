/**
 * 🧰 Emoji Utilities
 * Helper functions for working with the optimized emoji data
 */

import emojiData from './EmojiData.json';
import { CompactEmoji, EmojiCategories, EmojiCategoryType } from './emojiTypes';

// Cast the imported data to its proper type
const typedEmojiData = emojiData as EmojiCategories;

/**
 * Find an emoji by searching for a term in its names
 */
export const findEmojiByName = (searchTerm: string): CompactEmoji | null => {
  const term = searchTerm.toLowerCase();
  
  for (const category in typedEmojiData) {
    const result = typedEmojiData[category as EmojiCategoryType].find(
      emoji => emoji.n.some(name => name.includes(term))
    );
    if (result) return result;
  }
  
  return null;
};

/**
 * Find all emojis matching a search term
 */
export const findAllEmojisByName = (searchTerm: string): Array<CompactEmoji & { category: string }> => {
  const term = searchTerm.toLowerCase();
  const results: Array<CompactEmoji & { category: string }> = [];
  
  for (const category in typedEmojiData) {
    const matches = typedEmojiData[category as EmojiCategoryType].filter(
      emoji => emoji.n.some(name => name.includes(term))
    );
    
    matches.forEach(emoji => {
      results.push({ ...emoji, category });
    });
  }
  
  return results;
};

/**
 * Get all emojis from a specific category
 */
export const getEmojisByCategory = (category: EmojiCategoryType): CompactEmoji[] => {
  return typedEmojiData[category] || [];
};

/**
 * Convert unicode string to emoji character
 */
export const unicodeToEmoji = (unicode: string): string => {
  return String.fromCodePoint(...unicode.split('-').map(u => parseInt(`0x${u}`, 16)));
};

/**
 * Get random emoji
 */
export const getRandomEmoji = (): CompactEmoji => {
  const categories = Object.keys(typedEmojiData) as EmojiCategoryType[];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const emojis = typedEmojiData[randomCategory];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

/**
 * Get all available emoji categories
 */
export const getCategories = (): EmojiCategoryType[] => {
  return Object.keys(typedEmojiData) as EmojiCategoryType[];
};

/**
 * Get all skin tone variations for an emoji
 * Returns an object with each tone variation as keys and emoji characters as values
 */
export const getAllSkinToneVariants = (emoji: CompactEmoji): Record<string, string> | null => {
  if (!emoji.v || emoji.v.length === 0) return null;
  
  const skinToneMap: Record<string, string> = {};
  const toneNames = ['light', 'medium-light', 'medium', 'medium-dark', 'dark'];
  
  emoji.v.forEach((variation, index) => {
    // Extract the skin tone code from the variation
    const skinTone = variation.replace('u-', '');
    
    // Form the complete unicode by combining the base emoji code with the skin tone
    const combinedUnicode = `${emoji.u}-${skinTone}`;
    
    // Add to the map with descriptive keys
    const toneName = index < toneNames.length ? toneNames[index] : `tone-${index + 1}`;
    skinToneMap[toneName] = unicodeToEmoji(combinedUnicode);
  });
  
  return skinToneMap;
};

/**
 * Count total emojis in the data
 */
export const getTotalEmojiCount = (): number => {
  let count = 0;
  for (const category in typedEmojiData) {
    count += typedEmojiData[category as EmojiCategoryType].length;
  }
  return count;
};

// Default export for convenience
export default {
  findEmojiByName,
  findAllEmojisByName,
  getEmojisByCategory,
  unicodeToEmoji,
  getRandomEmoji,
  getCategories,
  getAllSkinToneVariants,
  getTotalEmojiCount,
}; 