const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDz6na52TVlOVfHQmiy4XhQJg0g5IDLo3c");

async function generateHealthInsight(data) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // fast + good for summaries
    });

    const prompt = `
You are a professional women's wellness assistant.

Analyze this health data and provide:
- Cycle pattern observation
- Mood trend
- Sleep insight
- General advice

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
