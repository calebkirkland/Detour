const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

exports.extractPreferences = (input) => {
  const tokens = tokenizer.tokenize(input.toLowerCase());
  const preferences = [];

  // Define keywords for different categories
  const naturalKeywords = ['nature', 'natural', 'sightseeing', 'trails', 'hiking'];
  const foodKeywords = ['food', 'restaurant', 'bbq', 'cuisine'];
  const activityKeywords = ['activity', 'adventure', 'experience'];

  tokens.forEach(token => {
    if (naturalKeywords.includes(token)) {
      preferences.push('natural sights');
    } else if (foodKeywords.includes(token)) {
      preferences.push('food');
    } else if (activityKeywords.includes(token)) {
      preferences.push('activities');
    }
  });

  return [...new Set(preferences)]; // Remove duplicates
};
