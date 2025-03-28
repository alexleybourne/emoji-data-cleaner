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

// Get emoji with skin tone
const thumbsUpWithSkinTone = emojiUtil.getSkinToneEmoji(thumbsUp, 0); // Light skin tone
```

## 💾 Data Format

The optimized `EmojiData.json` uses the following compact structure:

```typescript
{
  "Category Name": [
    {
      "n": ["emoji name", "alternative name", "another name"],
      "u": "1F44D",  // Unicode codepoint
      "v": ["u-1F3FB", "u-1F3FC"]  // Optional skin tone variations (optimized!)
    },
    // More emojis...
  ],
  // More categories...
}
```

Where:
- `n`: Array of names, including the primary name and alternatives
- `u`: Unicode representation of the emoji
- `v`: Optional array of skin tone variations (using the u- prefix to save space)

## 📐 TypeScript Support

The project includes full TypeScript support with automatically generated type definitions:

- **Dynamic Types**: Types are generated based on the actual data, ensuring type safety
- **Category-Specific Types**: Each emoji category has its own type
- **Type-Safe Access**: Use the EmojiCategoryType union for type-safe category access

```typescript
import { EmojiCategories, EmojiCategoryType, CompactEmoji } from './emojiTypes';
import emojiData from './EmojiData.json';

// Type-safe data
const data = emojiData as EmojiCategories;

// Type-safe category access
const category: EmojiCategoryType = 'Smileys & Emotion';
const smileys = data[category];
```

## 🧪 Testing

The project includes a comprehensive test suite to ensure all functionality works correctly. Run the tests with:

```bash
yarn test
# or if you don't have yarn installed
npx ts-node emojiTests.ts
```

Tests include:

- **Category Tests**: Verifies all expected emoji categories exist
- **Search Tests**: Ensures emoji can be found by name correctly
- **Skin Tone Tests**: Verifies skin tone variations work properly
- **Unicode Tests**: Checks conversion between unicode and emoji characters
- **Random Tests**: Ensures random emoji selection works as expected
- **Count Tests**: Validates emoji counting functions
- **Type Tests**: Verifies TypeScript types are working correctly

Test output includes clear pass/fail indicators and a summary of results.

## 📜 License

This project is available under the MIT License. The original emoji data is from iamcal's emoji-data project. 