/**
 * 🧪 Emoji Tests
 * 
 * Tests for the emoji utility functions and type safety
 * Run with: yarn test or npx ts-node emojiTests.ts
 */

import * as fs from 'fs';
import emojiUtil from './emojiUtil';
import emojiData from './EmojiData.json';
import { CompactEmoji, EmojiCategories, EmojiCategoryType } from './emojiTypes';

// Helper for test output
const logSuccess = (msg: string) => console.log(`✅ ${msg}`);
const logFailure = (msg: string) => console.log(`❌ ${msg}`);
const logHeading = (msg: string) => console.log(`\n🔍 ${msg}`);

// Cast the emoji data to its type
const typedEmojiData = emojiData as EmojiCategories;

// Test counter
let passed = 0;
let failed = 0;

// Run all tests
const runTests = () => {
  logHeading('Running Emoji Utility Tests');
  
  // Test 1: Check that all categories exist
  testCategories();
  
  // Test 2: Test finding emoji by name
  testFindEmoji();
  
  // Test 3: Test emoji with skin tones
  testSkinTones();
  
  // Test 4: Test unicode conversion
  testUnicodeConversion();
  
  // Test 5: Test random emoji
  testRandomEmoji();
  
  // Test 6: Test count functionality
  testCount();
  
  // Test 7: Test type safety
  testTypeChecking();
  
  // Summary
  logHeading(`Test Summary: ${passed} passed, ${failed} failed`);
  
  // Return success or failure
  process.exit(failed > 0 ? 1 : 0);
};

// Test category functionality
const testCategories = () => {
  logHeading('Testing Categories');
  
  const categories = emojiUtil.getCategories();
  
  // Ensure we have categories
  if (categories.length > 0) {
    logSuccess(`Found ${categories.length} categories`);
    passed++;
  } else {
    logFailure('No categories found');
    failed++;
  }
  
  // Check if specific expected categories exist
  const expectedCategories = ['Smileys & Emotion', 'People & Body', 'Animals & Nature'];
  
  for (const category of expectedCategories) {
    if (categories.includes(category as EmojiCategoryType)) {
      logSuccess(`Found expected category: ${category}`);
      passed++;
    } else {
      logFailure(`Missing expected category: ${category}`);
      failed++;
    }
  }
};

// Test finding emoji by name
const testFindEmoji = () => {
  logHeading('Testing Emoji Search');
  
  // Test specific emoji search
  const thumbsUp = emojiUtil.findEmojiByName('thumbs up');
  if (thumbsUp && thumbsUp.u === '1F44D') {
    logSuccess('Found thumbs up emoji');
    passed++;
  } else {
    logFailure('Failed to find thumbs up emoji');
    failed++;
  }
  
  // Test searching for multiple emoji
  const smiles = emojiUtil.findAllEmojisByName('smile');
  if (smiles.length > 3) {
    logSuccess(`Found ${smiles.length} smile-related emoji`);
    passed++;
  } else {
    logFailure('Failed to find enough smile-related emoji');
    failed++;
  }
  
  // Test getting emoji by category
  const faces = emojiUtil.getEmojisByCategory('Smileys & Emotion');
  if (faces.length > 0) {
    logSuccess(`Found ${faces.length} emoji in Smileys & Emotion category`);
    passed++;
  } else {
    logFailure('Failed to get emoji from Smileys & Emotion category');
    failed++;
  }
};

// Test skin tone variations
const testSkinTones = () => {
  logHeading('Testing Skin Tone Variations');
  
  // Find emoji with skin tones
  const emojiWithSkinTones = Object.values(typedEmojiData)
    .flat()
    .find(emoji => emoji.v && emoji.v.length > 0);
  
  if (emojiWithSkinTones) {
    logSuccess(`Found emoji with skin tones: ${emojiWithSkinTones.n[0]}`);
    passed++;
    
    // Test skin tone conversion
    const skinToneEmoji = emojiUtil.getSkinToneEmoji(emojiWithSkinTones, 0);
    if (skinToneEmoji) {
      logSuccess('Successfully converted skin tone variation');
      passed++;
    } else {
      logFailure('Failed to convert skin tone variation');
      failed++;
    }
  } else {
    logFailure('Could not find any emoji with skin tones');
    failed++;
  }
};

// Test unicode conversion
const testUnicodeConversion = () => {
  logHeading('Testing Unicode Conversion');
  
  const thumbsUp = emojiUtil.unicodeToEmoji('1F44D');
  if (thumbsUp === '👍') {
    logSuccess('Successfully converted unicode to emoji character');
    passed++;
  } else {
    logFailure(`Unicode conversion failed: expected 👍 but got ${thumbsUp}`);
    failed++;
  }
};

// Test random emoji functionality
const testRandomEmoji = () => {
  logHeading('Testing Random Emoji');
  
  // Get a few random emoji to ensure we get different ones
  const random1 = emojiUtil.getRandomEmoji();
  const random2 = emojiUtil.getRandomEmoji();
  const random3 = emojiUtil.getRandomEmoji();
  
  if (random1 && random2 && random3) {
    logSuccess('Successfully retrieved random emoji');
    passed++;
    
    // Check that we got at least one different emoji (low chance of failure still)
    if (random1.u !== random2.u || random2.u !== random3.u || random1.u !== random3.u) {
      logSuccess('Random emoji function appears to return different emoji');
      passed++;
    } else {
      logFailure('Random emoji function returned the same emoji 3 times (unlikely but possible)');
      failed++;
    }
  } else {
    logFailure('Failed to retrieve random emoji');
    failed++;
  }
};

// Test count functionality
const testCount = () => {
  logHeading('Testing Count Functions');
  
  const totalCount = emojiUtil.getTotalEmojiCount();
  if (totalCount > 1000) {  // We expect many emoji
    logSuccess(`Found ${totalCount} total emoji`);
    passed++;
  } else {
    logFailure(`Only found ${totalCount} emoji, expected >1000`);
    failed++;
  }
  
  // Verify the count by summing manually
  let manualCount = 0;
  Object.values(typedEmojiData).forEach(categoryEmojis => {
    manualCount += categoryEmojis.length;
  });
  
  if (totalCount === manualCount) {
    logSuccess('Total count matches manual count');
    passed++;
  } else {
    logFailure(`Count mismatch: utility reports ${totalCount}, manual count is ${manualCount}`);
    failed++;
  }
};

// Test TypeScript type safety
const testTypeChecking = () => {
  logHeading('Testing Type Safety');
  
  // This is mostly a compile-time check - we can check some basic type assignments
  try {
    // Test assigning a valid category
    const category: EmojiCategoryType = 'Smileys & Emotion';
    
    // Test accessing data with the category
    const smileys = typedEmojiData[category];
    
    // Check an emoji in the category has the right properties
    if (smileys.length > 0) {
      const firstEmoji = smileys[0];
      if (
        Array.isArray(firstEmoji.n) && 
        typeof firstEmoji.u === 'string' && 
        (!firstEmoji.v || Array.isArray(firstEmoji.v))
      ) {
        logSuccess('Emoji types are structured correctly');
        passed++;
      } else {
        logFailure('Emoji type structure is incorrect');
        failed++;
      }
    }
    
    logSuccess('Type checking passed');
    passed++;
  } catch (error) {
    logFailure(`Type checking failed: ${error}`);
    failed++;
  }
};

// Run all tests
runTests(); 