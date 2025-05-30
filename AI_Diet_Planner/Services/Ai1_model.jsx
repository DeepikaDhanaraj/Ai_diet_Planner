import OpenAI from "openai";
import axios from 'axios';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: , // ⚠️ Never expose this in production
});

export const GenerateRecipesOptionAIModel = async (PROMPT) => {
  return await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo", // ✅ working and stable model
    messages: [
      {
        role: "system",
        content: "You are a helpful fitness assistant that creates healthy recipes from user input.",
      },
      {
        role: "user",
        content: PROMPT,
      },
    ],
  });
};

// ✅ Calorie Calculator
export const CalculateCaloriesAI = async (PROMPT) => {
  return await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a nutritionist AI that calculates total calorie count of given meals or ingredients.",
      },
      {
        role: "user",
        content: PROMPT,
      },
    ],
  });
};

const BASE_URL='https://aigurulab.tech';
export const GenerateRecipeImage=async(prompt) => await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: prompt,
            model: 'sdxl',//'flux'
            aspectRatio:"1:1"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': , // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
//Output Result: Base 64 Image
