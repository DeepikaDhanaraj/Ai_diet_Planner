const Prompt = {
  CALORIES_PROMPT: `Based on Weight, Height, Gender, and Goal, give me calories and protein requirements per day. Assume Age is 28. Respond in JSON format using this schema:
{
  "calories": <number>,
  "proteins": <number>
}`,

  GENERATE_RECIPE_OPTION_PROMPT: `Based on the user's instruction, create exactly 3 different healthy recipe variants in JSON array format only. Each object should include:

- "recipeName" (with emoji),
- "description" (2 short lines),
- "ingredients" (array of strings, no quantities).

⚠️ Return ONLY a JSON array. No markdown, no explanation, no extra text.

Example:

[
  {
    "recipeName": "🌿 Green Smoothie Bowl",
    "description": "A fresh and energizing start to your day.\\nPacked with spinach, fruits, and seeds.",
    "ingredients": ["Spinach", "Banana", "Chia seeds", "Almond milk", "Honey"]
  }
]`,

  GENERATE_COMPLETE_RECIPE_PROMPT: ({ recipeName, description }) => `As per the following recipeName and description, generate:
- "recipeName"
- emoji icons for each ingredient as "icon", with "ingredient" name and "quantity"
- Total calories as "calories" (only number), "cookTime" in minutes
-A descriptive and realistic image prompt in natural language as "imagePrompt" (e.g. "A steaming bowl of lentil soup with cilantro garnish on a rustic table")
- Category list for the recipe from ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"]
- Response only in valid JSON format

RecipeName: ${recipeName}
Description: ${description}

JSON Schema Format:
{
  "description": "string",
  "recipeName": "string",
  "calories": number,
  "category": ["string"],
  "cookTime": number,
  "imagePrompt": "string",
  "ingredients": [
    {
      "icon": "string",
      "ingredient": "string",
      "quantity": "string"
    }
  ],
  "calories": <Single person serve>,
  "proteins": <Single person serve>,
  "serveTo": number,
  "steps": ["string"]
}`
  
}

export default Prompt;
