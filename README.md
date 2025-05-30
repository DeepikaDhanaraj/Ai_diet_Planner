# 🥗 AI Diet Planner

**AI Diet Planner** is a mobile application built using **React Native** and **Expo**, designed to help users create personalized meal plans, generate AI-powered recipes, and track dietary progress. The app uses OpenAI and Gemini for AI recipe and calorie estimation, Firebase for authentication, and Convex for database and backend logic.

---

## 🚀 Features

- 🤖 **AI-Powered Recipe Generation**  
  Generate personalized recipes using AI, including ingredients, instructions, cooking time, serving size, and AI-generated images.

- 🗓️ **Meal Planning**  
  Add selected recipes to a daily meal plan.

- 🔐 **User Authentication**  
  Secure sign-up and login via **Firebase Authentication**.

- ⚙️ **Dietary Preferences**  
  Set dietary goals, gender, weight, height, and daily calorie targets.

- 📊 **Calorie & Progress Tracking**  
  Track daily calorie intake and visualize your progress with a dynamic progress bar.

- 📋 **Recipe View**  
  Access full recipe details including ingredients, instructions, and nutritional data.

- 🔍 **Recipe History**  
  View all your generated recipes in one place.

- 👤 **User Profile**  
  Manage and update user details and preferences.

---

## 🛠️ Tech Stack

| Category           | Technology                                                                 |
|-------------------|------------------------------------------------------------------------------|
| **Frontend**       | React Native, Expo, Expo Router                                              |
| **Authentication** | Firebase Authentication                                                      |
| **Backend & DB**   | Convex (Database & Serverless Functions)                                     |
| **AI Models**      | GPT-3.5 Turbo & Google Gemini Flash via OpenRouter, AI Guru Lab (image API)  |
| **State Management** | React Context API                                                        |
| **UI Components**  | Custom Components, @expo/vector-icons, @hugeicons/react-native               |

---

## 📁 Project Structure

| Folder/Path               | Purpose/Description                                                                 |
|---------------------------|--------------------------------------------------------------------------------------|
| `app/`                    | Contains screen components organized using Expo Router                              |
| `app/auth/`               | Sign In and Sign Up authentication screens                                          |
| `app/generate-ai-recipe/` | Interface for AI-based recipe generation                                            |
| `app/preference/`         | User setup for dietary preferences (weight, height, gender, goals)                 |
| `app/recipe-detail/`      | Screen to display detailed recipe information                                       |
| `app/tabs/`               | Main navigation tabs: Home, Meals, Profile, Progress                                |
| `assets/`                 | Static assets like fonts and images                                                 |
| `components/`             | Reusable UI components used across the app                                          |
| `context/`                | React Context API setup for user data and refresh logic                             |
| `convex/`                 | Convex backend logic: database schema, mutations, and queries                        |
| `convex/MealPlan.js`      | Backend logic for creating and managing meal plans                                  |
| `convex/Recipes.js`       | Backend logic for generating and saving recipes                                     |
| `convex/Users.js`         | Backend logic for user data management                                              |
| `convex/schema.js`        | Convex database schema definition                                                   |
| `Services/`               | Integrations with AI models and Firebase                                            |
| `Services/Ai1_model.jsx`  | GPT-3.5 Turbo & AI Guru image generation integration                                |
| `Services/AiModel.jsx`    | Gemini Flash integration for calorie calculation                                   |
| `Services/fireBaseConfig.jsx` | Firebase project setup and configuration                                   |
| `shared/`                 | Shared resources like color palette and AI prompt templates                        |
| `package.json`            | Project dependencies and scripts                                                    |
| `expo-env.d.ts`           | TypeScript definitions for environment variables                                    |
| `README.md`               | Project documentation                                                               |

## 📦 Installation & Setup

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Clone the repository and navigate into the project
git clone https://github.com/DeepikaDhanaraj/Ai_diet_Planner.git
cd Ai_diet_Planner/AI_Diet_Planner

# Install dependencies
npm install
# or
yarn install

# Configure environment variables and API keys as per project requirements:
# - Set EXPO_PUBLIC_CONVEX_URL in your environment or app/_layout.jsx
# - Add OpenRouter API key in Services/Ai1_model.jsx and Services/AiModel.jsx
# - Add AI Guru Lab API key (x-api-key) in Services/Ai1_model.jsx
# - Set up Firebase project, enable Email/Password auth, update fireBaseConfig.jsx accordingly

# Start Convex backend (local development)
npx convex dev

# Start the Expo application
npx expo start


### 📱 APK File

An APK file for Android devices is available for direct installation without the need to run the app via Expo.

You can find the APK in the `release/` folder, ready to install on Android devices.

## 🛠️ Build

To generate the APK file for Android, follow these steps:

1. Make sure you have all dependencies installed and the project configured properly (API keys, environment variables).

2. Build a production-ready APK using Expo CLI:

```bash
expo build:android -t apk
eas build -p android --profile production

## 📚 Documentation Reference

- **React Native & Expo**  
  [React Native Documentation](https://reactnative.dev/docs/getting-started)  
  [Expo Documentation](https://docs.expo.dev/)

- **Firebase Authentication**  
  [Firebase Auth Docs](https://firebase.google.com/docs/auth)

- **Convex Backend**  
  [Convex Documentation](https://docs.convex.dev/)

- **OpenAI & AI Models**  
  [OpenAI API Documentation](https://platform.openai.com/docs)  
  [OpenRouter Documentation](https://docs.openrouter.ai/)

- **AI Guru Lab Image Generation API**  
  [Aigurulab API Docs](https://aigurulab.tech/documentation)
