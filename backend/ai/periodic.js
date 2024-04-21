const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyDOHnsTtQ0E-vkU9DOPuVdydWDEvh8UfAE";

async function run() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.0,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1024,
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

  // from front-end daily journal entry
  const journals = ["Today was tough. I found myself struggling to get out of bed this morning, feeling overwhelmed by the mere thought of facing the day ahead. Work seemed like an insurmountable task, and my mind was clouded with negative thoughts. Every small setback felt like a major disaster. It’s hard to see any light when everything feels so dark. I know I need to try some coping strategies, but today, I just couldn’t find the energy.", "This week has been slightly better. I've started to incorporate a short walk into my daily routine, as suggested by my therapist. It's not always easy, but I’m trying to make an effort. The fresh air helps a bit, and I find that I'm not as anxious when I get back home. I still have moments of doubt and fear, but they seem a bit more manageable than before. I'm holding onto small victories.", "I’ve noticed that writing down my thoughts is surprisingly helpful. It’s like each word I write down is a small piece of the heavy burden I carry, taken off my shoulders. I still have days where I feel like I’m covered in a cloud of worry, but now there are also moments of clarity and calm. Today, I actually felt a spark of creativity and jotted down some ideas for a project I've been postponing for months.", "Today was a good day. I spoke with an old friend, and it was refreshing to connect with someone who understands. We talked about the ups and downs of life, and sharing my journey made me realize that I am not alone in this. It’s therapeutic to have someone listen and just be there. My mood swings are less frequent, and I feel more stable than the last few weeks.", "I'm beginning to feel like I can manage my stress better. The coping techniques my therapist recommended, especially mindfulness meditation, are becoming a vital part of my daily life. I find myself looking forward to these moments of peace. It’s not that the problems have disappeared, but I feel more equipped to handle them. My self-talk has become more positive and forgiving."];

  // replace from the first function output
  const analysis = [
    {
      "Themes Detected": ["work", "health"],
      "Emotional Intensity": ["high"],
      "Mentions of Social Interaction": ["no"],
      "Cognitive Patterns": ["negative self-talk", "catastrophizing"],
      "Coping Strategies": [],
      "Emotional Triggers": ["stressful situations"],
      "Mood Stability": ["fluctuating moods"],
      "Risk Factors": ["chronic stress"]
    },
    {
      "Themes Detected": ["health", "change"],
      "Emotional Intensity": ["low"],
      "Mentions of Social Interaction": ["no"],
      "Cognitive Patterns": ["doubt", "negative self-talk", "optimism"],
      "Coping Strategies": ["exercise", "therapy"],
      "Emotional Triggers": ["past events"],
      "Mood Stability": ["stable with minor fluctuations"],
      "Risk Factors": ["mental health history"]
    },
    {
      "Themes Detected": ["health", "creativity"],
      "Emotional Intensity": ["low"],
      "Mentions of Social Interaction": ["no"],
      "Cognitive Patterns": ["positive self-talk", "optimism"],
      "Coping Strategies": ["writing"],
      "Emotional Triggers": ["stressful situations"],
      "Mood Stability": ["fluctuating moods"],
      "Risk Factors": ["None"]
    },
    {
      "Themes Detected": ["friends", "health"],
      "Emotional Intensity": ["low"],
      "Mentions of Social Interaction": ["yes"],
      "Cognitive Patterns": ["positive self-talk"],
      "Coping Strategies": ["social support"],
      "Emotional Triggers": ["None"],
      "Mood Stability": ["stable with minor fluctuations"],
      "Risk Factors": ["None"]
    },
    {
      "Themes Detected": ["health", "achievement"],
      "Emotional Intensity": ["low"],
      "Mentions of Social Interaction": ["no"],
      "Cognitive Patterns": ["positive self-talk"],
      "Coping Strategies": ["meditation"],
      "Emotional Triggers": ["None"],
      "Mood Stability": ["stable with minor fluctuations"],
      "Risk Factors": ["None"]
    }
  ];

  let prompt = `Let's analyze the series of past daily journal entries and their analyses to extract actionable insights that can aid in clinical decision-making. The focus will be on identifying key patterns, significant changes in mental state, and emerging trends in emotional and cognitive behaviors that are crucial for psychiatric evaluation. Ensure that all information remains confidential and that insights are presented in a manner that is immediately applicable in a therapeutic context.

1. Integrated Thematic Analysis:
Definition: Synthesize themes across multiple entries to identify overarching narratives or conflicts.
Insight: Discuss the interplay between themes and their cumulative impact on the subject's well-being.

2. Emotional and Thematic Interrelation:
Definition: Explore how different themes correlate with emotional responses over time.
Insight: Provide examples of causative relationships or dependencies that have emerged.

3. Subtle Shifts in Mood and Tone:
Definition: Detect changes in mood and tone throughout the entries.
Insight: Relate these shifts to specific events or thematic elements in the journal.

4. Evolution of Self-Perception:
Definition: Analyze changes in the writer’s self-perception and identity indicators.
Insight: Reflect on how these changes correlate with major life events or internal conflicts.

5. Predictive Insights on Mental Health:
Definition: Based on patterns observed, predict potential future mental health states or turning points.
Insight: Suggest proactive measures or areas for attention.

6. Coping Strategy Effectiveness:
Definition: Qualitatively assess the effectiveness of discussed coping strategies in managing specific stressors.
Insight: Recommend adjustments or new strategies based on observed outcomes.

Complete the analysis in the JSON dictionary format.
Format for a mental health report:
{
  Integrated Thematic Analysis: [Insight],
  Emotional and Thematic Interrelation: [Insight],
  Subtle Shifts in Mood and Tone: [Insight],
  Evolution of Self-Perception: [Insight],
  Predictive Insights on Mental Health: [Insight],
  Coping Strategy Effectiveness: [Insight],
}


`;
  for (let i = 0; i < journals.length; i++) {
    prompt += `Daily ${i + 1} Journal Entry: ` + journals[i] + "\n\n";
    prompt += `Daily ${i + 1} Analysis: ` + JSON.stringify(analysis[i]) + "\n\n";
  }
  console.log(prompt)
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
