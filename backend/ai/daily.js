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

  //const journal = `I'm beginning to feel like I can manage my stress better. The coping techniques my therapist recommended, especially mindfulness meditation, are becoming a vital part of my daily life. I find myself looking forward to these moments of peace. It’s not that the problems have disappeared, but I feel more equipped to handle them. My self-talk has become more positive and forgiving.`

  const prompt = `Let's analyze the journal entry for a summary on mental health, avoiding direct quotes and ensuring confidentiality. Follow the defition of each point and select the most likely choice based on the given categories.

1. Themes Detected:
  Definition: Identify main topics discussed in the entry.
  Categories: [family, friends, money, work, health, loss, change, achievement, nature, creativity, others, none]

2. Emotional Intensity:
  Definition: Assess the strength of emotions expressed.
    Categories: [high, low, others, none]

3. Mentions of Social Interaction:
  Definition: Note any social interactions mentioned.
  Categories: [yes, no, others, none]

4. Cognitive Patterns:
  Definition: Identify recurring thought patterns.
  Categories: [positive self-talk, negative self-talk, rumination, doubt, self-blame, optimism, pessimism, catastrophizing, others, none]

5. Coping Strategies:
  Definition: Describe methods mentioned for managing stress or challenges.
  Categories: [exercise, meditation, substance use, avoidance, social support, hobbies, others, none]

6. Emotional Triggers:
  Definition: Identify events that provoke strong emotions.
  Categories: [conflicts, past events, stressful situations, financial issues, health concerns, others, none]

7. Mood Stability:
  Definition: Assess the stability of the writer's emotional state.
  Categories: [consistent mood, fluctuating moods, stable with minor fluctuations, others, none]

8. Risk Factors:
  Definition: Identify factors that may increase mental health risks.
  Categories: [trauma, substance use, mental health history, chronic stress, poor social support, others, none]

Complete the analysis in the JSON dictionary format.
Format for each journal:
{
  Themes Detected: [Themes Detected Category],
  Emotional Intensity: [Emotional Intensity Category],
  Mentions of Social Interaction: [Mentions of Social Interaction Category],
  Cognitive Patterns: [Cognitive Patterns Category],
  Coping Strategies: [Coping Strategies],
  Emotional Triggers: [Emotional Triggers Category],
  Mood Stability: [Mood Stability Category],
  Risk Factors: [Risk Factors Category]
}

Journal Entry: ${journal}
`
  // console.log(prompt)
  const parts = [
    { text: prompt },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
}

run();
