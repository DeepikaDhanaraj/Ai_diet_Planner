import OpenAI from "openai"


const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
})

export const CalculateCaloriesAI = async (PROMPT) => await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{ role: "user", content: PROMPT }],
      
    });


