const { GoogleGenerativeAI } = require("@google/generative-ai");

  // ✅ FIX 1: API key from environment variable — never hardcode in source
  // ✅ FIX 2: Correct model name — "gemini-3-flash-preview" does not exist
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateHealthInsight(data) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // ✅ valid, fast, cost-efficient model
    });

    const prompt = `
You are a professional women's wellness assistant.

Analyze this health data and provide:
- Cycle pattern observation
- Mood trend
- Sleep insight
- General advice

Keep your response concise (3-4 sentences max). Be warm, supportive, and specific to the data.

Health Data:
${JSON.stringify(data)}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

module.exports = { generateHealthInsight };