// src/common/askAI.js

/**
 * Standardised AI request + DB persistence
 *
 * @param {Object} params
 * @param {string} params.userInput - The student's text
 * @param {string} params.promptType - "schrijven" | "chatbot" | "dagboek" | etc.
 * @param {string} params.exerciseType - Whatever your DB expects
 * @param {string} params.originComponent - Component name
 * @param {number} params.difficultyLevel
 * @param {number} params.userId
 * @param {string} params.apiBase - DB API endpoint (POST + PUT)
 * @param {string} params.aiEndpoint - AI endpoint (POST)
 *
 * @returns fully normalised DB object (same shape for every component)
 */
export async function DutchLanguage_AI_Evaluator_Chatbot({
  userInput,
  promptType = "general",
  exerciseType = "unknown",
  originComponent = "unknown",
  difficultyLevel = 1,
  userId = 123,
  apiBase,
  aiEndpoint,
}) {
  if (!userInput || !userInput.trim()) {
    throw new Error("userInput cannot be empty");
  }
  if (!apiBase) throw new Error("apiBase is required");
  if (!aiEndpoint) throw new Error("aiEndpoint is required");

  // -------------------------------------------------------
  // 1. CREATE DB ROW FIRST (empty scores)
  // -------------------------------------------------------
  const createRes = await fetch(apiBase, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      originComponent,
      exerciseType,
      difficultyLevel,
      userInput,
      aiCorrection: "",
      aiFeedback: "",
      scoreWordorder: 0,
      scoreGrammar: 0,
      scoreVocabulary: 0,
      scoreSpelling: 0,
      scoreComprehensibility: 0,
      scoreNoun: 0,
      scoreArticle: 0,
      timeSpentMs: 0,
      wordCount: userInput.split(" ").length,
      charCount: userInput.length,
      userRollingAccuracy: 0,
      userAvgScore: 0,
      wasHintUsed: null,
      answerCorrect: null,
    }),
  });

  if (!createRes.ok) throw new Error("In <DutchLanguage_AI_Evaluator_Chatbot> Failed to create DB entry");

  const dbRecord = await createRes.json();
  const savedId = dbRecord.id;

  // -------------------------------------------------------
  // 2. Build Universal AI Prompt
  // -------------------------------------------------------
  const prompt = `
You are a Dutch NT2/B2 language teacher and evaluator.  Student text: "${userInput}". Score the student's written text using the following scoring rules:

5 = Excellent, no or tiny mistakes
4 = Good, minor issues
3 = Understandable but several mistakes
2 = Many mistakes, meaning partly unclear
1 = Major errors, meaning unclear
0 = Completely incorrect or unrelated

Respond ONLY in raw JSON with these exact keys:
{
  "aiCorrection": "corrected version in Dutch",
  "aiFeedback": "conversational about the topic, not linguistic feedback, always in Dutch, encourage responses to be in the future tense or past tense",
  "scoreGrammar": 0-5,
  "scoreVocabulary": 0-5,
  "scoreSpelling": 0-5,
  "scoreComprehensibility": 0-5,
  "scoreWordorder": 0-5,
  "scoreNoun": 0-5,
  "scoreArticle": 0-5
}
  
IMPORTANT:
Return ONLY valid JSON.
Do NOT include explanation text before or after.
Do NOT wrap in markdown.
Do NOT include code fences.
`;

  // -------------------------------------------------------
  // 3. AI Request
  // -------------------------------------------------------
  const aiRes = await fetch(aiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: prompt }),
  });

  const aiData = await aiRes.json();
  let aiText = aiData.answer || aiData.response || JSON.stringify(aiData);

  // remove wrapping junk
  aiText = aiText
    .replace(/^Optional\[/, "")
    .replace(/\]$/, "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let parsed = {};
try {
  // Extract JSON object between the first { and the last }
  const jsonMatch = aiText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in AI output");

  const cleanJson = jsonMatch[0];
  parsed = JSON.parse(cleanJson);
} catch (err) {
  console.warn("❌ AI JSON failed, fallback:", err);
  parsed = {
    aiCorrection: "",
    aiFeedback: aiText, // show raw text instead of empty
    scoreGrammar: 0,
    scoreVocabulary: 0,
    scoreSpelling: 0,
    scoreComprehensibility: 0,
    scoreWordorder: 0,
    scoreNoun: 0,
    scoreArticle: 0,
  };
}


  const safe = (val) => Math.max(0, Math.min(5, Number(val) || 0));

  // -------------------------------------------------------
  // 4. UPDATE DB RECORD WITH AI RESULTS
  // -------------------------------------------------------
  const updatePayload = {
    userId,
    originComponent,
    exerciseType,
    difficultyLevel,
    userInput,
    aiCorrection: parsed.aiCorrection || "",
    aiFeedback: parsed.aiFeedback || "",
    scoreWordorder: safe(parsed.scoreWordorder),
    scoreGrammar: safe(parsed.scoreGrammar),
    scoreVocabulary: safe(parsed.scoreVocabulary),
    scoreSpelling: safe(parsed.scoreSpelling),
    scoreComprehensibility: safe(parsed.scoreComprehensibility),
    scoreNoun: safe(parsed.scoreNoun),
    scoreArticle: safe(parsed.scoreArticle),
    timeSpentMs: 0,
    wordCount: userInput.split(" ").length,
    charCount: userInput.length,
  };

  const updateRes = await fetch(`${apiBase}/${savedId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatePayload),
  });

  if (!updateRes.ok) {
    console.error(await updateRes.text());
    throw new Error("Failed to update DB with AI results");
  }

  const updated = await updateRes.json();

  return updated;
}

