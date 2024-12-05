import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default openai;

// Testing
// import OpenAI from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function testOpenAI() {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: "What are the symptoms of diabetes?" }
//       ],
//       temperature: 0.7,
//       max_tokens: 500,
//     });
//     console.log('Response:', response.choices[0].message.content);
//   } catch (error) {
//     console.error('Test Error:', error.response?.data || error.message);
//   }
// }

// testOpenAI();
