const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyDOHnsTtQ0E-vkU9DOPuVdydWDEvh8UfAE";

async function run(journal) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.0,
    topK: 1,
    topP: 1,
    maxOutputTokens: 512,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

  const prompt = `Let's analyze the journal entry for a summary on mental health, avoiding direct quotes and ensuring confidentiality. Follow the definition of each point and select the most likely choice based on the given categories.

  Themes Detected:
  Definition: Identify main topics discussed in the entry.
  Categories: [family, friends, money, work, health, loss, change, achievement, nature, creativity, others, none]

  Emotional Intensity:
  Definition: Assess the strength of emotions expressed.
  Categories: [high, low, others, none]

  Mentions of Social Interaction:
  Definition: Note any social interactions mentioned.
  Categories: [yes, no, others, none]

  Cognitive Patterns:
  Definition: Identify recurring thought patterns.
  Categories: [positive self-talk, negative self-talk, rumination, doubt, self-blame, optimism, pessimism, catastrophizing, others, none]

  Coping Strategies:
  Definition: Describe methods mentioned for managing stress or challenges.
  Categories: [exercise, meditation, substance use, avoidance, social support, hobbies, others, none]

  Emotional Triggers:
  Definition: Identify events that provoke strong emotions.
  Categories: [conflicts, past events, stressful situations, financial issues, health concerns, others, none]

  Mood Stability:
  Definition: Assess the stability of the writer's emotional state.
  Categories: [consistent mood, fluctuating moods, stable with minor fluctuations, others, none]

  Risk Factors:
  Definition: Identify factors that may increase mental health risks.
  Categories: [trauma, substance use, mental health history, chronic stress, poor social support, others, none]

Complete the analysis in the JSON dictionary format.
Journal Entry: ${journal}
`;

  const parts = [{ text: prompt }];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const rawOutput = result.response.text();
  console.log("Raw output:", rawOutput);  // Log the raw output to check its format

  const preprocessOutput = (text) => {
    // Remove leading non-JSON characters and text, specifically targeting unwanted markdown or preliminary labels like "json"
    const cleanedText = text.substring(text.indexOf('{'));  // This finds the first occurrence of '{' and cuts everything before it
    return cleanedText.replace(/`/g, '');  // Remove backticks or other non-JSON characters
  };
  

  const cleanedOutput = preprocessOutput(rawOutput);
  console.log("Cleaned output:", cleanedOutput);

  try {
    const responseJson = JSON.parse(cleanedOutput);  // Parse the cleaned output to JSON
    return responseJson;
  } catch (error) {
    console.error("Failed to parse response into JSON:", error);
    console.error("Cleaned output for review:", cleanedOutput);
    throw new Error("Failed to parse response into JSON");
  }
}

module.exports = { run };
