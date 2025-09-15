## **Step‑by‑Step Explanation**

```js
function normalizeFitnessPlan(plan) {
  let fitnessPlan = plan;
```
- The function takes a `plan` object (parsed from Gemini’s JSON output).
- It assigns it to `fitnessPlan` so you can reassign it later without mutating the original reference directly.

---

```js
  // Flatten nested keys if needed
  if (fitnessPlan.plan && fitnessPlan.plan.fitness_plan) {
    fitnessPlan = fitnessPlan.plan.fitness_plan;
  }
```
- Sometimes Gemini might wrap the actual plan inside `plan.fitness_plan`.
- This check “flattens” the structure so `fitnessPlan` points directly to the `fitness_plan` object.

---

```js
  // Standardize caloric intake
  if (fitnessPlan.diet_recommendations?.caloric_intake) {
    const intakeRange = fitnessPlan.diet_recommendations.caloric_intake.match(/\d+/g);
    fitnessPlan.diet_recommendations.caloric_intake = {
      range: intakeRange ? intakeRange.join("-") : "Unknown",
      unit: "calories",
      notes: "Adjust based on individual needs and metabolism",
    };
  }
```
- If a caloric intake string exists (e.g., `"2000-2200 calories"`), it extracts all numbers using a regex.
- Joins them with a dash to create a range (e.g., `"2000-2200"`).
- Wraps it in a structured object with `range`, `unit`, and `notes` fields.
- If no numbers are found, sets `range` to `"Unknown"`.

---

```js
  // Normalize reps
  fitnessPlan.workout_split?.forEach((day) => {
    day.exercises.forEach((exercise) => {
      if (typeof exercise.reps === "string" && exercise.reps.includes("-")) {
        const [min, max] = exercise.reps.split("-").map(Number);
        exercise.reps = { min, max };
      } else if (!isNaN(exercise.reps)) {
        exercise.reps = { min: Number(exercise.reps), max: Number(exercise.reps) };
      }
    });
  });
```
- Loops through each workout day and its exercises.
- If `reps` is a string with a dash (e.g., `"8-12"`), splits it into `{ min: 8, max: 12 }`.
- If `reps` is a single number or numeric string, sets both `min` and `max` to that number.
- This ensures `reps` is always an object with numeric `min` and `max`.

---

```js
  // Improve warnings format
  if (Array.isArray(fitnessPlan.warnings)) {
    fitnessPlan.warnings = fitnessPlan.warnings.map((warning) => ({
      category: warning.includes("injuries") ? "Injury Prevention" : "General",
      message: warning,
    }));
  }
```
- If `warnings` is an array of strings, converts each into an object with:
  - `category`: `"Injury Prevention"` if the warning mentions “injuries”, otherwise `"General"`.
  - `message`: the original warning text.

---

```js
  return fitnessPlan;
}
```
- Returns the normalized plan object.

---

```js
module.exports = { normalizeFitnessPlan };
```
- Exports the function so it can be used in your controller.

---

## **Reflection — How to Improve**

Here’s how we can make this more robust and maintainable:

---

### 1. **Defensive Checks**
Right now, the function assumes `plan` is an object with certain properties.  
If Gemini returns something unexpected, you could get runtime errors.  
Add early validation:
```js
if (!plan || typeof plan !== "object") {
  throw new Error("Invalid plan format");
}
```

---

### 2. **Immutable Transformation**
Currently, we mutate `fitnessPlan` in place.  
For safer, testable code, consider returning a **new object** instead of mutating the input.

---

### 3. **Extract Helpers**
The caloric intake parsing, reps normalization, and warnings formatting could each be their own small functions.  
This makes them easier to test individually.

Example:
```js
function parseCaloricIntake(str) { ... }
function normalizeReps(reps) { ... }
function formatWarnings(warnings) { ... }
```

---

### 4. **Regex Safety**
The caloric intake regex `match(/\d+/g)` will fail if the value is not a string.  
Add a type check before calling `.match()`.

---

### 5. **Flexible Warning Categorization**
Right now, warnings are categorized only by the presence of `"injuries"`.  
You could expand this to detect other categories (e.g., `"nutrition"`, `"overtraining"`).

---

### 6. **Optional Debug Logging**
When debugging AI output, it’s useful to log the plan before and after normalization:
```js
if (process.env.DEBUG_NORMALIZE === "true") {
  console.log("Before normalization:", JSON.stringify(plan, null, 2));
  console.log("After normalization:", JSON.stringify(fitnessPlan, null, 2));
}
```
