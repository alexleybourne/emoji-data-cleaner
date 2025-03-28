# Emoji Data Optimizer

A utility to optimize emoji data for efficient use in applications. This tool takes the raw emoji data and transforms it into a compact, optimized format while preserving all essential information.

## Overview

This project optimizes the [emoji-data](https://github.com/iamcal/emoji-data) dataset from iamcal, transforming the verbose format into a minimal JSON structure that:

- Reduces file size significantly
- Maintains all searchable names
- Preserves skin tone variations
- Keeps category organization

The optimized format is ideal for applications that need to include emoji data while minimizing bundle size.

## Data Source

Raw emoji data (`RawEmojiData.json`) is sourced from [iamcal/emoji-data](https://github.com/iamcal/emoji-data/blob/master/emoji.json).

## Usage

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-directory>

# Install dependencies
yarn install
```

### Commands

```bash
# Process and optimize the emoji data
yarn emoji clean

# Show statistics about the emoji data
yarn emoji info

# Display help information
yarn emoji help
```

### Using the Optimized Data

Once processed, you can import and use the optimized data in your project:

```typescript
import emojiData from './EmojiData.json';

// Access emojis by category
const peopleEmojis = emojiData['People & Body'];

// Search for emojis by name
const findEmojiByName = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  for (const category in emojiData) {
    const result = emojiData[category].find(
      emoji => emoji.n.some(name => name.includes(term))
    );
    if (result) return result;
  }
  return null;
};

// Look up an emoji
const thumbsUp = findEmojiByName('thumbs up');
```

## Data Format

The optimized `EmojiData.json` uses the following compact structure:

```typescript
{
  "Category Name": [
    {
      "n": ["emoji name", "alternative name", "another name"],
      "u": "1F44D",  // Unicode codepoint
      "v": ["1F44D-1F3FB", "1F44D-1F3FC"]  // Optional skin tone variations
    },
    // More emojis...
  ],
  // More categories...
}
```

Where:
- `n`: Array of names, including the primary name and alternatives
- `u`: Unicode representation of the emoji
- `v`: Optional array of skin tone variations

## License

This project is available under the MIT License. The original emoji data is from iamcal's emoji-data project. 