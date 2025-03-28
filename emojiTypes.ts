/**
 * Type definitions for emoji data structure
 * 
 * Our emoji data is stored in a compact format to minimize file size
 * while maintaining all necessary information for functionality.
 */

/**
 * CompactEmoji represents a single emoji with all its metadata in a compact format
 * - n: Array of names, with the primary name as the first element
 * - u: Unicode representation (e.g., "1F44C")
 * - v: Optional array of skin tone variations (e.g., ["1F44C-1F3FB", "1F44C-1F3FC"])
 */
export type CompactEmoji = {
  /** 
   * Names array - contains all searchable terms for this emoji
   * First item is always the primary/full name, followed by short names
   * Example: ["ok hand sign", "ok hand"]
   */
  n: string[];
  
  /** 
   * Unicode representation of the emoji
   * Example: "1F44C" 
   */
  u: string;
  
  /** 
   * Variations array - contains skin tone variations if applicable
   * Each value is the unicode with a skin tone modifier appended
   * Light skin tone: 1F3FB
   * Medium-light skin tone: 1F3FC
   * Medium skin tone: 1F3FD
   * Medium-dark skin tone: 1F3FE
   * Dark skin tone: 1F3FF
   * Example: ["1F44C-1F3FB", "1F44C-1F3FC", "1F44C-1F3FD", "1F44C-1F3FE", "1F44C-1F3FF"]
   */
  v?: string[];
};

/**
 * EmojiCategories represents the structure of our emoji data file
 * Each key is a category name, and the value is an array of CompactEmoji objects
 */
export type EmojiCategories = {
  [category: string]: CompactEmoji[];
};

/**
 * Usage example:
 * 
 * import emojiData from './EmojiData.json';
 * const data = emojiData as EmojiCategories;
 * 
 * // Access emojis by category
 * const peopleEmojis = data['People & Body'];
 * 
 * // Find emoji by name (case insensitive)
 * const findEmojiByName = (searchTerm: string) => {
 *   const term = searchTerm.toLowerCase();
 *   for (const category in data) {
 *     const result = data[category].find(
 *       emoji => emoji.n.some(name => name.includes(term))
 *     );
 *     if (result) return result;
 *   }
 *   return null;
 * };
 */ 