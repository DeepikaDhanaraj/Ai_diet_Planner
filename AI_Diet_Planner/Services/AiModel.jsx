import OpenAI from "openai"


const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:,
})

export const CalculateCaloriesAI = async (PROMPT) => await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{ role: "user", content: PROMPT }],
      
    });


