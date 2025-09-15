# Fitness Plan Generator – Full‑Stack AI Integration

## 📖 Overview
This project is a **Node.js/Express** backend that integrates with **Google Gemini** to generate structured, personalized fitness plans in JSON format.  
It demonstrates a clean separation of concerns between:

- **Controller layer** – Handles HTTP requests/responses and validation.
- **Service layer** – Builds prompts and calls the Gemini API.
- **Utility layer** – Normalizes and cleans AI‑generated JSON into a consistent format.

The output includes:
- Workout splits with exercises, sets, and reps.
- Dietary recommendations with caloric intake and macronutrient breakdown.
- Recovery tips and warnings.

---

## 🗂 Project Structure

```
project-root/
│
├── app.js                      # Express app entry point
│
├── services/
│   ├── gemini.js               # Gemini API wrapper
│   ├── fitnessService.js       # Builds prompt & calls Gemini
│   ├── gemini.md               # Explanation & improvement reflections
│   ├── fitnessService.md       # Explanation & improvement reflections
│
├── controllers/
│   ├── fitnessController.js    # Handles /api/generate-text3-v2 route
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
   - Validates input.
   - Calls `generateFitnessPlan()` from the service layer.
   - Extracts JSON from Gemini’s markdown output.
   - Parses and normalizes the plan before sending it back.

3. **Service (`fitnessService.js`)**  
   - Builds a detailed prompt with schema requirements.
   - Calls the Gemini API via `gemini.js`.
   - Returns the AI’s raw text output.

4. **Gemini Wrapper (`gemini.js`)**  
   - Handles API key setup and model selection.
   - Sends structured `contents` to Gemini.
   - Returns the full API response to the service.

5. **Utility (`normalizeFitnessPlan.js`)**  
   - Flattens nested keys.
   - Standardizes caloric intake format.
   - Converts reps into `{ min, max }` objects.
   - Categorizes warnings.

---

## 📄 File‑by‑File Explanations

Each `.js` file in `services/`, `controllers/`, and `utils/` has a **matching `.md` file** in the same folder.  
These `.md` files contain:

- **Line‑by‑line explanations** of what the code does.
- **Reflections on how it could be improved**, suggested by **Bing Copilot in Smart GPT‑5 mode**.

Example:
- `services/gemini.js` → `services/gemini.md`
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
   npm run dev # node app.js
   ```

4. **Test the endpoint**
You can easily test the API with [Postman](https://www.postman.com/):

- **Open Postman** and create a new request.
- Set the **method** to `POST`.
- Enter the URL:
   ```
   http://localhost:3000/api/generate-text-v2
   ```
- Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown.
- Paste the following JSON payload:
   ```json
   {
     "fitnessType": "strength training",
     "frequency": 4,
     "experience": "beginner",
     "goal": "build muscle"
   }
   ```
- Click **Send**.
- You should receive a structured JSON response containing the generated fitness plan.

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

