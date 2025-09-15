## **Step‑by‑Step Explanation**

```js
const { generateFitnessPlan } = require("../services/fitnessService");
const { normalizeFitnessPlan } = require("../utils/normalizeFitnessPlan");
```
- Imports:
  - `generateFitnessPlan` from the service layer — builds the prompt, calls Gemini, and returns the AI’s output.
  - `normalizeFitnessPlan` from the utils — cleans and standardizes the parsed JSON.

---

```js
async function generateText(req, res) {
```
- Defines the controller function for the `/api/generate-text-v2` route.
- Handles the HTTP request and sends the HTTP response.

---

```js
    const { fitnessType, frequency, experience, goal } = req.body;

    if (!fitnessType || !frequency || !experience || !goal) {
      return res.status(400).json({ message: "All fields are required." });
    }
```
- Extracts the required fields from the request body.
- Validates that none are missing; if any are, responds with **400 Bad Request**.

---

```js
    const rawResponse = await generateFitnessPlan(fitnessType, frequency, experience, goal);
```
- Calls the service to get the AI’s output.
- `rawResponse` should be a string containing Gemini’s generated text (possibly with ```json fences).

---

```js
    // Try to extract JSON from markdown fences
    const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : rawResponse;
    console.log(jsonString);
```
- Uses a regex to extract JSON from inside ```json … ``` code fences.
- If no match is found, assumes the entire response is JSON.
- Logs the extracted string for debugging.

---

```js
    let parsedPlan;
    try {
      parsedPlan = JSON.parse(jsonString);
    } catch (err) {
      return res.status(500).json({ error: "Error parsing JSON response." });
    }
```
- Attempts to parse the extracted string into a JavaScript object.
- If parsing fails, responds with **500 Internal Server Error**.

---

```js
    const normalizedPlan = normalizeFitnessPlan(parsedPlan);
    res.json(normalizedPlan);
```
- Passes the parsed object to the normalization utility.
- Sends the normalized plan as the JSON response.

---

```js
  } catch (err) {
    console.error("Error in fitnessController:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}
```
- Catches any unexpected errors and sends a **500** with a generic message.

---

```js
module.exports = generateText;
```
- Exports the controller function so it can be used in `app.js`.

---

## **Reflection — How to Improve**

Here’s how we can make this controller more robust and maintainable:

---

### 1. **More Resilient JSON Extraction**
Right now, if Gemini returns valid JSON with extra text before/after, parsing will fail.  
You could:
- Try parsing the whole string first.
- If that fails, fall back to regex extraction.
- Optionally use a JSON “repair” library to handle minor formatting issues.

---

### 2. **Debug Logging Control**
`console.log(jsonString)` will always run.  
Wrap it in a debug flag so it only logs when needed:
```js
if (process.env.DEBUG_GEMINI === "true") {
  console.log("Extracted JSON string:", jsonString);
}
```

---

### 3. **Consistent Error Responses**
Right now, some errors return `{ message: ... }` and others `{ error: ... }`.  
Pick one format for all errors so the frontend can handle them consistently.

---

### 4. **Safe Normalization**
If `normalizeFitnessPlan` throws (e.g., unexpected structure), catch it and return a clear error instead of letting it bubble up.

---

### 5. **Stronger Input Validation**
Currently you only check for presence.  
You could also validate types and ranges (e.g., `frequency` is a positive integer) using a library like `Joi` or `zod`.
