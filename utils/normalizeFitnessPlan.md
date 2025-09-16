# Explanation of `normalizeFitnessPlan()`

The purpose of this function is to **take the raw output from the Gemini model** and make sure it is safe, consistent, and usable in the rest of the application.  

1. **Parsing the input**  
   - The function first checks if the input is a string. If it is, it attempts to parse it as JSON.  
   - This is important because large language models often return text, and we need to ensure it becomes a proper JavaScript object.  

2. **Error handling**  
   - If parsing fails, the function catches the error and returns a fallback object with empty strings.  
   - This prevents the application from crashing if the model returns invalid JSON.  

3. **Schema enforcement**  
   - The function guarantees that the returned object always has three fields:  
     - `workout`  
     - `diet`  
     - `recovery`  
   - If any of these fields are missing, it fills them with default placeholder text.  

In short, this function acts as a **safety net**. It ensures that no matter what the model outputs, the rest of the application can rely on a predictable structure.  

---

### Suggested Improvements

1. **Stricter Validation**  
   - Right now, the function only checks if the fields exist. You could add validation to ensure each field is a string and not something unexpected (like a number or object).  

   ```js
   function safeString(value, fallback) {
     return typeof value === "string" && value.trim() !== "" ? value : fallback;
   }
   ```

   Then apply it when returning the object.  

2. **Trimming and Cleaning**  
   - Sometimes model outputs include extra whitespace or line breaks. Adding a `.trim()` would make the text cleaner for display.  

3. **Logging for Debugging**  
   - If parsing fails, you might want to log the raw response (in development mode only). This helps students see what went wrong and learn from it.  

4. **Extensibility**  
   - If later you decide to expand the schema (e.g., add `warnings` or `example_meals`), you can design the function so it’s easy to extend without rewriting everything.  

---

### Note  

**normalization is about trust**. We cannot fully trust the model’s output to always be in the right shape. By normalizing, we create a contract: *“No matter what comes in, the rest of the app will always get a clean, predictable object.”*  

