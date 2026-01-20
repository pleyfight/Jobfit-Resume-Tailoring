const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) process.env[key.trim()] = value.trim();
  });
}

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  console.log('API Key loaded:', key ? 'Yes' : 'No');

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key);
    const data = await response.json();
    if (data.models) {
      console.log('Available models:');
      data.models.forEach(m => console.log(' -', m.name));
    } else {
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();
