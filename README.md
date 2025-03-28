# 🚀 Emoji Data Optimizer

A utility to optimize emoji data for efficient use in applications. This tool takes the raw emoji data and transforms it into a compact, optimized format while preserving all essential information.

## 📊 Overview

This project optimizes the [emoji-data](https://github.com/iamcal/emoji-data) dataset from iamcal, transforming the verbose format into a minimal JSON structure that:

- ✅ Reduces file size significantly (93.96% smaller! 1.71MB → 105.80KB)
- 🔍 Maintains all searchable names
- 🎨 Preserves skin tone variations
- 📁 Keeps category organization

The optimized format is ideal for applications that need to include emoji data while minimizing bundle size.

## 📝 Data Source

Raw emoji data (`RawEmojiData.json`) is sourced from [iamcal/emoji-data](https://github.com/iamcal/emoji-data/blob/master/emoji.json).

## 🔧 Usage

### 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-directory>

# Install dependencies
yarn install
```

### 💻 Commands

```bash
# Process and optimize the emoji data
yarn emoji clean

# Show statistics about the emoji data
yarn emoji info

# Generate TypeScript type definitions
yarn emoji types

# Display help information
yarn emoji help

# Run tests
yarn test
# or if you don't have yarn installed
npx ts-node emojiTests.ts
```

### 🧩 Using the Optimized Data

Once processed, you can use the data in multiple ways:

#### Direct Import

```typescript
import emojiData from './EmojiData.json';

// Access emojis by category
const peopleEmojis = emojiData['People & Body'];
```

#### Using Utility Functions

The project includes a utility library with helpful functions:

```typescript
import emojiUtil from './emojiUtil';

// Find an emoji by name
const thumbsUp = emojiUtil.findEmojiByName('thumbs up');

// Get all emojis from a category
const smileys = emojiUtil.getEmojisByCategory('Smileys & Emotion');

// Convert unicode to emoji character
const thumbsUpChar = emojiUtil.unicodeToEmoji('1F44D');

// Get random emoji
const randomEmoji = emojiUtil.getRandomEmoji();

// Get all emoji categories
const categories = emojiUtil.getCategories();

// Get all skin tone variants for an emoji
const skinToneVariants = emojiUtil.getAllSkinToneVariants(thumbsUp);
console.log(skinToneVariants);
// Output: { 
//   'light': '👍🏻', 
//   'medium-light': '👍🏼', 
//   'medium': '👍🏽', 
//   'medium-dark': '👍🏾', 
//   'dark': '👍🏿' 
// }
```

## 💾 Data Format

The optimized `