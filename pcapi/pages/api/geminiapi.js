// export default function handler(req, res) {
//   const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

//   const MODEL_NAME = "gemini-pro";
//   const API_KEY = "AIzaSyCL2N8Ne2ERsONoo_IdEP6TbCek42mT8Q4";

//   async function runChat(userInput) {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };

//     const safetySettings = [
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ];

//     const chat = model.startChat({
//       generationConfig,
//       safetySettings,
//       history: [],
//     });

//     const result = await chat.sendMessage(userInput);
//     const response = result.response;
//     res.status(200).json(response.text());
//   }

//   // Assuming the user input is passed as a query parameter named 'query'
//   const userInput = req.query.query;

//   if (!userInput) {
//     res.status(400).json({ error: "User input (query) is required." });
//     return;
//   }

//   runChat(userInput);
// }

const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = 'AIzaSyCL2N8Ne2ERsONoo_IdEP6TbCek42mT8Q4'

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});



export default function handler(req, res) {
    let messages = [{ content: req.query.ques }];
  
client.generateMessage({
  // required, which model to use to generate the result
  model: MODEL_NAME,
  // optional, 0.0 always uses the highest-probability result
  temperature: 0.25,
  // optional, how many candidate results to generate
  candidateCount: 1,
  // optional, number of most probable tokens to consider for generation
  top_k: 40,
  // optional, for nucleus sampling decoding strategy
  top_p: 0.95,
  prompt: {
    messages: messages,
  },
}).then(result => {
    console.log("First Response:", result[0].candidates[0]?.content);

    messages.push({ content: result[0].candidates[0]?.content });
   // console.log(JSON.stringify(result, null, 2));
    res.status(200).json({ resp: messages })
});
}

