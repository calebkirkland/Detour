const axios = require('axios');
const config = require('../config');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const groqAxios = axios.create({
  baseURL: GROQ_API_URL,
  headers: {
    'Authorization': `Bearer ${config.GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

exports.generateSuggestions = async (preferences, currentLocation) => {
  try {
    const prompt = `Generate 5 suggestions for stops near ${currentLocation} based on these preferences: ${preferences.join(', ')}. For each suggestion, provide a name, brief description, and type (e.g., natural sight, restaurant, etc.).`;

    const response = await groqAxios.post('', {
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }]
    });

    const suggestions = parseSuggestions(response.data.choices[0]?.message?.content || '');
    return suggestions;
  } catch (error) {
    console.error('Error generating suggestions with Groq:', error);
    throw new Error('Error generating suggestions with Groq');
  }
};

exports.generateSingleSuggestion = async (preferences, currentLocation) => {
  try {
    const prompt = `Generate 1 suggestion for a stop near ${currentLocation} based on these preferences: ${preferences.join(', ')}. Provide a name, brief description, and type (e.g., natural sight, restaurant, etc.).`;

    const response = await groqAxios.post('', {
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }]
    });

    const suggestion = parseSingleSuggestion(response.data.choices[0]?.message?.content || '');
    return suggestion;
  } catch (error) {
    console.error('Error generating single suggestion with Groq:', error);
    throw new Error('Error generating single suggestion with Groq');
  }
};

function parseSuggestions(text) {
  // Implement parsing logic to extract suggestions from the Groq response
  // This may need to be adjusted based on the actual response format
  const suggestions = text.split('\n').filter(line => line.trim() !== '').map(line => {
    const [name, description, type] = line.split(' - ');
    return { name, description, type };
  });
  return suggestions;
}

function parseSingleSuggestion(text) {
  // Implement parsing logic for a single suggestion
  const [name, description, type] = text.split(' - ');
  return { name, description, type };
}