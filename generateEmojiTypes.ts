/**
 * 🏗️ Emoji Types Generator
 * Generates TypeScript type definitions dynamically based on actual emoji data
 */

import * as fs from 'fs';

// Function to generate the type definitions file
const generateTypeDefinitions = () => {
  // Read the emoji data file to extract categories
  const emojiData = JSON.parse(fs.readFileSync('./EmojiData.json', 'utf8'));
  const categories = Object.keys(emojiData);

  // Create the type content
  const typeContent = `/**
 * 📝 Type definitions for emoji data structure
 * 
 * AUTOMATICALLY GENERATED - DO NOT EDIT MANUALLY
 * Generated on: ${new Date().toISOString()}
 * 
 * Our emoji data is stored in a compact format to minimize file size
 * while maintaining all necessary information for functionality.
 */

/**
 * CompactEmoji represents a single emoji with all its metadata in a compact format
 * - n: Array of names, with the primary name as the first element
 * - u: Unicode representation (e.g., "1F44C")
 * - v: Optional array of skin tone variations with u- prefix
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
   * Each value uses the format "u-{SKIN_TONE}" to save space, omitting the base emoji code
   * Light skin tone: u-1F3FB
   * Medium-light skin tone: u-1F3FC
   * Medium skin tone: u-1F3FD
   * Medium-dark skin tone: u-1F3FE
   * Dark skin tone: u-1F3FF
   * Example: ["u-1F3FB", "u-1F3FC", "u-1F3FD", "u-1F3FE", "u-1F3FF"]
   */
  v?: string[];
};

/**
 * EmojiCategoryType - A union type of all available category names
 * This can be used for type-safe category access
 */
export type EmojiCategoryType = ${categories.map(category => `'${escapeString(category)}'`).join(' | ')};

/**
 * EmojiCategories represents the structure of our emoji data file
 * Each key is a category name, and the value is an array of CompactEmoji objects
 */
export type EmojiCategories = {
  [K in EmojiCategoryType]: CompactEmoji[];
};

/**
 * Usage example:
 * 
 * import emojiData from './EmojiData.json';
 * import { EmojiCategories, EmojiCategoryType } from './emojiTypes';
 * 
 * // Type-safe usage
 * const data = emojiData as EmojiCategories;
 * 
 * // Type-safe category access
 * const category: EmojiCategoryType = 'Smileys & Emotion';
 * const smileys = data[category];
 */`;

  // Write the generated type to file
  fs.writeFileSync('./emojiTypes.ts', typeContent);
  
  console.log('🎭 EmojiScript: Type definitions generated successfully!');
};

// Helper function to escape string for TypeScript
const escapeString = (str: string) => {
  return str.replace(/'/g, "\\'");
};

// Execute the generation
generateTypeDefinitions(); 