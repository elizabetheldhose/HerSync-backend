const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDih3LJfRLcHyAU3Xq6UrYcyoY9NAp-92U");

async function generateChatResponse(message, history) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  const prompt = `
You are a women's health assistant.

Conversation so far:
${JSON.stringify(history)}

User: ${message}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}

module.exports = { generateChatResponse };
