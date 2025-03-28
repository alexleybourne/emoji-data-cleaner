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
 * Convert skin tone variation to emoji character
 */
export const getSkinToneEmoji = (emoji: CompactEmoji, skinToneIndex: number): string | null => {
  if (!emoji.v || !emoji.v[skinToneIndex]) return null;
  
  // Extract the skin tone code from the variation
  const skinTone = emoji.v[skinToneIndex].replace('u-', '');
  
  // Form the complete unicode by combining the base emoji code with the skin tone
  const combinedUnicode = `${emoji.u}-${skinTone}`;
  
  return unicodeToEmoji(combinedUnicode);
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
  getSkinToneEmoji,
  getTotalEmojiCount,
}; 