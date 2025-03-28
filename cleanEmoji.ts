import * as fs from 'fs';
import { CompactEmoji, EmojiCategories } from './emojiTypes';

// Read the original emoji data
const emojiData = JSON.parse(fs.readFileSync('./RawEmojiData.json', 'utf8'));

// Process and clean the data
const processEmojiData = () => {
	// Create a map to hold emojis grouped by category
	const categorizedEmojis: Record<string, any[]> = {};

	// Process each emoji
	emojiData.forEach((emoji: any) => {
		const {
			name,
			unified,
			category,
			sort_order,
			skin_variations,
			short_names,
		} = emoji;

		// Skip emojis without short_names (unlikely but for safety)
		if (!short_names || !short_names.length) return;

		// Format name to lowercase and ensure it's included in the names array
		const formattedName = name.toLowerCase();
		
		// Create array of searchable names
		const namesArray = [formattedName];
		
		// Add short_names to namesArray, but replace underscores with spaces
		// and avoid duplicates with the name
		short_names.forEach((shortName: string) => {
			// Format shortName to lowercase and replace underscores with spaces
			const formattedShortName = shortName.toLowerCase().replace(/_/g, ' ');
			
			// Only add if it's not already included and not the same as the formatted name
			if (!namesArray.includes(formattedShortName)) {
				namesArray.push(formattedShortName);
			}
		});

		// Create cleaned emoji object with unified code and names array
		const cleanedEmoji: CompactEmoji = {
			n: namesArray,
			u: unified,
		};

		// Process skin variations if they exist - flatten to array of codes for smaller size
		if (skin_variations) {
			const skinTones = ['1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'];
			const variations: string[] = [];

			// Create array of only the unified codes in predictable order
			skinTones.forEach((tone) => {
				if (skin_variations[tone]) {
					variations.push(skin_variations[tone].unified);
				}
			});

			// Only add if we have variations
			if (variations.length) {
				cleanedEmoji.v = variations;
			}
		}

		// Initialize category array if it doesn't exist
		if (!categorizedEmojis[category]) {
			categorizedEmojis[category] = [];
		}

		// Add the emoji to its category with sort_order for later sorting
		categorizedEmojis[category].push({
			...cleanedEmoji,
			sort_order,
		});
	});

	// Sort emojis within each category by sort_order
	Object.keys(categorizedEmojis).forEach((category) => {
		categorizedEmojis[category].sort((a, b) => a.sort_order - b.sort_order);

		// Remove sort_order after sorting
		categorizedEmojis[category] = categorizedEmojis[category].map(
			(emoji) => {
				const { sort_order, ...rest } = emoji;
				return rest;
			}
		);
	});

	const compactEmojis: Partial<EmojiCategories> = {};
	
	Object.keys(categorizedEmojis).forEach((category) => {
		// Keep original category names as is
		compactEmojis[category] = categorizedEmojis[category];
	});

	return compactEmojis;
};

// Process the data
const cleanedEmojiData = processEmojiData();

// Create compact version without pretty-printing
fs.writeFileSync('./EmojiData.json', JSON.stringify(cleanedEmojiData));

// Calculate before and after size
const originalSize = fs.statSync('./RawEmojiData.json').size;
const compactSize = fs.statSync('./EmojiData.json').size;
const reduction = (((originalSize - compactSize) / originalSize) * 100).toFixed(
	2
);

console.log(`🧹 EmojiScript: Processing complete!`);
console.log(
	`📊 Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB → Compact: ${
		compactSize < 1024 * 1024 
		? `${(compactSize / 1024).toFixed(2)}KB` 
		: `${(compactSize / 1024 / 1024).toFixed(2)}MB`
	} (${reduction}% reduction)`
); 