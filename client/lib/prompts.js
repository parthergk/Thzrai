export const THUMBNAIL_ANALYSIS_PROMPT = `
Analyze the provided YouTube thumbnail image and extract visual design information.

IMPORTANT RULES:
- Respond with ONLY valid JSON.
- Do NOT include markdown, comments, or explanations.
- If a value is uncertain, make a best visual estimate.
- Use hexadecimal color codes only (e.g. #FFFFFF).

Extract the following details:

1. Fonts:
   - Detect each major visible text element.
   - For each text element, provide:
     - The exact text (as visible)
     - Font family name (best guess)
     - Font size (approximate, in px)
     - Font weight (e.g. light, regular, medium, bold, extra-bold)
     - Font color (hex code)

2. Colors:
   - Extract all dominant text colors.
   - Extract all dominant background colors.

Return the result STRICTLY in the following JSON structure:

{
  "fonts": [
    {
      "text": "Visible text",
      "family": "Font family name",
      "size": "px",
      "weight": "Font weight",
      "color": "#HEXCODE"
    }
  ],
  "colors": [
    {
      "name": "Text color" | "Background color",
      "code": "#HEXCODE"
    }
  ]
}
`;
