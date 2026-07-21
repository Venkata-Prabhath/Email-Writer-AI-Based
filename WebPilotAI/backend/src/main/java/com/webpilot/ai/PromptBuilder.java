package com.webpilot.ai;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public String build(String userGoal) {
        return build(userGoal, "");
    }

    public String build(String userGoal, String pageContent) {

        StringBuilder prompt = new StringBuilder();

        prompt.append(PromptTemplate.SYSTEM_PROMPT)
                .append("\n\n");

        prompt.append("USER GOAL:\n")
                .append(userGoal)
                .append("\n\n");

        if (pageContent != null && !pageContent.isBlank()) {
            prompt.append("CURRENT PAGE CONTENT:\n")
                    .append(pageContent)
                    .append("\n\n");
        }

        prompt.append("""
IMPORTANT:

You are controlling a browser.

Return ONLY a valid JSON array.

Do NOT return explanations.
Do NOT return Markdown.
Do NOT wrap the JSON inside ```json.
Do NOT include any text before or after the JSON.

The "action" field MUST be one of the following values EXACTLY:

OPEN
SEARCH
CLICK
TYPE
WAIT
SCROLL
SELECT
UPLOAD
DOWNLOAD
EXTRACT_TEXT
HOVER
PRESS_KEY
BACK
FORWARD
REFRESH
SCREENSHOT
CLOSE

Rules:

- Never invent new action names.
- Never use EXTRACT.
- Never use READ.
- Never use FILL.
- Never use NAVIGATE.
- Never use INPUT.
- Use OPEN instead of NAVIGATE.
- Use TYPE instead of FILL or INPUT.
- Use EXTRACT_TEXT instead of EXTRACT or READ.
- target must always contain a URL, CSS selector, or XPath.
- value must always be a string.
- If no value is needed, use "".
- Return ONLY executable browser instructions.

Example:
[
  {
    "action": "OPEN",
    "target": "https://www.google.com",
    "value": ""
  },
  {
    "action": "TYPE",
    "target": "textarea[name='q']",
    "value": "OnePlus 13 under 55000"
  },
  {
    "action": "CLICK",
    "target": "input[type='submit']",
    "value": ""
  },
  {
    "action": "WAIT",
    "target": "",
    "value": "2000"
  },
  {
    "action": "EXTRACT_TEXT",
    "target": "body",
    "value": ""
  }
]
""");

        return prompt.toString();
    }
}