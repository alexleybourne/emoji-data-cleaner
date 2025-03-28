#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const args = process.argv.slice(2);
const command = args[0];

// Display usage information
const showHelp = () => {
  console.log(`
🔠 Emoji Data Manager CLI

Usage:
  yarn emoji [command]

Commands:
  clean      Clean and optimize emoji data
  info       Display information about the emoji data
  types      Generate TypeScript type definitions
  help       Show this help message
  
Examples:
  yarn emoji clean     # Process RawEmojiData.json to create optimized EmojiData.json
  yarn emoji info      # Show statistics about the emoji data files
  yarn emoji types     # Generate TypeScript types based on the emoji data
`);
};

// Process emoji data
const clean = () => {
  try {
    // Use spawn to run the cleanEmoji.ts script
    const { spawnSync } = require('child_process');
    const result = spawnSync('npx', ['ts-node', 'cleanEmoji.ts'], { stdio: 'inherit' });
    
    if (result.error) {
      console.error('❌ Error executing clean script:', result.error);
      return;
    }
    
    if (result.status !== 0) {
      console.error('❌ Clean script exited with code:', result.status);
      return;
    }
  } catch (err) {
    console.error('❌ Error running clean script:', err);
  }
};

// Generate type definitions
const generateTypes = () => {
  try {
    console.log('🔄 Generating type definitions...');
    execSync('npx ts-node generateEmojiTypes.ts', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Error generating type definitions:', err);
  }
};

// Format file size to appropriate units
const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`;
  }
  return `${(size / 1024 / 1024).toFixed(2)}MB`;
};

// Show information about the emoji data
const showInfo = () => {
  try {
    if (!fs.existsSync('./RawEmojiData.json')) {
      console.log('❌ Original RawEmojiData.json file not found!');
      return;
    }

    const originalData = JSON.parse(fs.readFileSync('./RawEmojiData.json', 'utf8'));
    const originalSize = fs.statSync('./RawEmojiData.json').size;
    
    console.log(`📊 Original Emoji Data:`);
    console.log(`   - Size: ${formatFileSize(originalSize)}`);
    console.log(`   - Emoji Count: ${originalData.length}`);
    
    if (fs.existsSync('./EmojiData.json')) {
      const compactData = JSON.parse(fs.readFileSync('./EmojiData.json', 'utf8'));
      const compactSize = fs.statSync('./EmojiData.json').size;
      const reduction = (((originalSize - compactSize) / originalSize) * 100).toFixed(2);
      
      // Count total emojis in the compact data
      let totalEmojis = 0;
      Object.keys(compactData).forEach(category => {
        if (Array.isArray(compactData[category])) {
          totalEmojis += compactData[category].length;
        }
      });
      
      console.log(`\n📊 Optimized Emoji Data:`);
      console.log(`   - Size: ${formatFileSize(compactSize)} (${reduction}% reduction)`);
      console.log(`   - Emoji Count: ${totalEmojis}`);
      console.log(`   - Categories: ${Object.keys(compactData).length}`);
    } else {
      console.log('\n❌ Optimized emoji data not found! Run "yarn emoji clean" first.');
    }
  } catch (err) {
    console.error('❌ Error reading emoji data:', err);
  }
};

// Process the command
switch (command) {
  case 'clean':
    clean();
    break;
  case 'info':
    showInfo();
    break;
  case 'types':
    generateTypes();
    break;
  case 'help':
  default:
    showHelp();
    break;
} 