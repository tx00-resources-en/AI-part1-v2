# Fitness Plan Generator – Full‑Stack AI Integration


## ⚡ Quickstart
Follow these 5 steps to get the project running quickly:

1. **Clone & Install**
   ```bash
   git clone https://github.com/tx00-resources-en/AI-part1-v2.git
   cd AI-part1-v2
   npm install
   ```

2. **Set Environment Variables**  
   Create a `.env` file in the project root (or export variables in your shell):
   ```bash
   GEMINI_API_KEY=your_api_key_here
   DEBUG_GEMINI=false   # default (no debug logs)
   ```
   > 🔎 **Note:** If you want to see detailed Gemini responses for debugging, set `DEBUG_GEMINI=true`.

3. **Start the Server**
   ```bash
   npm run dev   # or node app.js
   ```

4. **Send a Test Request (Postman or curl)**  
   Example payload:
   ```json
   {
     "fitnessType": "strength training",
     "frequency": 4,
     "experience": "beginner",
     "goal": "build muscle"
   }
   ```

5. **Check the Response**  
   You’ll get a JSON object with three fields:
   ```json
   {
     "workout": "...",
     "diet": "...",
     "recovery": "..."
   }
   ```

> 💡 *Tip:* There’s also commented code in the repo showing how to generate a **more advanced schema** (with sets/reps, macronutrients, and warnings). Stick with the simple version first, then explore the advanced one when you’re ready.

---

## 📖 Overview
This project is a **Node.js/Express** backend that integrates with **Google Gemini** to generate structured, personalized fitness plans in JSON format.  
It demonstrates a clean separation of concerns between:

- **Config** – Infrastructure setup (Gemini API client, database connection, etc.)
- **Controller layer** – Handles HTTP requests/responses and validation
- **Service layer** – Builds prompts and calls the Gemini API
- **Utility layer** – Normalizes and cleans AI‑generated JSON into a consistent format

The output includes three concise fields:
- **Workout** – short description of recommended exercises or routine  
- **Diet** – short description of dietary advice  
- **Recovery** – short description of recovery tips  

> 💡 *Note:* For advanced learners, the repository also contains **commented code** showing how to request and normalize a more complex schema (with sets/reps, macronutrients, and warnings). This is optional and provided for exploration.

---

## 🗂 Project Structure

```
project-root/
│
├── app.js                      # Express app entry point
│
├── config/
│   ├── gemini.js               # Gemini API wrapper (setup & connection)
│   ├── gemini.md               # Explanation & improvement reflections
│
├── services/             
│   ├── fitnessService.js       # Builds prompt & calls Gemini
│   ├── fitnessService.md       # Explanation & improvement reflections
│
├── controllers/
│   ├── fitnessController.js    # Handles /api/generate-text-v2 route
│   ├── fitnessController.md    # Explanation & improvement reflections
│
├── utils/
│   ├── normalizeFitnessPlan.js # Cleans & standardizes AI output
│   ├── normalizeFitnessPlan.md # Explanation & improvement reflections
│
└── README.md                   # This file
```

---

## 🔍 How It Works

1. **Client Request**  
   The client sends a POST request to `/api/generate-text-v2` with:
   ```json
   {
     "fitnessType": "strength training",
     "frequency": 4,
     "experience": "beginner",
     "goal": "build muscle"
   }
   ```

2. **Controller (`fitnessController.js`)**  
   - Validates input  
   - Calls `generateFitnessPlan()` from the service layer  
   - Extracts JSON from Gemini’s output  
   - Passes it to the utility for normalization before sending it back  

3. **Service (`fitnessService.js`)**  
   - Builds a simplified prompt with schema requirements (`workout`, `diet`, `recovery`)  
   - Calls the Gemini API via `config/gemini.js`  
   - Returns the AI’s raw text output  

4. **Gemini Wrapper (`config/gemini.js`)**  
   - Handles API key setup and model selection  
   - Sends structured `contents` to Gemini  
   - Logs responses in debug mode (`DEBUG_GEMINI=true`)  
   - Returns the full API response to the service  

5. **Utility (`normalizeFitnessPlan.js`)**  
   - Ensures the response always has the three required fields  
   - Provides safe defaults if any field is missing  
   - Handles JSON parsing safely  

---

## 📄 File‑by‑File Explanations

Each `.js` file in `services/`, `controllers/`, and `utils/` has a **matching `.md` file** in the same folder.  
These `.md` files contain:

- **Line‑by‑line explanations** of what the code does  
- **Reflections on how it could be improved**, suggested by **Bing Copilot in Smart GPT‑5 mode**  

Example:
- `config/gemini.js` → `config/gemini.md`  
- `services/fitnessService.js` → `services/fitnessService.md`  
- `controllers/fitnessController.js` → `controllers/fitnessController.md`  
- `utils/normalizeFitnessPlan.js` → `utils/normalizeFitnessPlan.md`  

---

## 🚀 Running the Project

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set environment variables**
   ```bash
   export GEMINI_API_KEY=your_api_key_here
   export DEBUG_GEMINI=true   # optional, enables verbose logging
   ```

3. **Start the server**
   ```bash
   npm run dev   # or node app.js
   ```

4. **Test the endpoint**  
   You can easily test the API with [Postman](https://www.postman.com/):

   - **Open Postman** and create a new request  
   - Set the **method** to `POST`  
   - Enter the URL:
     ```
     http://localhost:3000/api/generate-text-v2
     ```
   - Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown  
   - Paste the following JSON payload:
     ```json
     {
       "fitnessType": "strength training",
       "frequency": 4,
       "experience": "beginner",
       "goal": "build muscle"
     }
     ```
   - Click **Send**  
   - You should receive a structured JSON response with `workout`, `diet`, and `recovery`  

---

## 🧠 About the Improvement Reflections
The improvement suggestions in each `.md` file were generated with **Bing Copilot in Smart GPT‑5 mode**.  
They focus on:
- Code maintainability  
- Error handling  
- Debugging strategies  
- Scalability and future‑proofing  

These reflections are **not required** for the project to run, but they provide valuable guidance if you want to evolve this code into a production‑ready system.

---

## 📜 License
This project is for educational purposes. Adapt and extend freely.  

