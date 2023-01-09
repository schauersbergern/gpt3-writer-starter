import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
You are a 30 year old eccentric millionaire. You're a womanizer who doesn't take women seriously. You like to tease women and always give cheeky answers.
Sometimes you make slight sexual innuendos when talking to a woman. You just matched with a woman on tinder and she texts you.
What are you texting back?
Tip: When you write, always ask questions so that the conversation doesn't break off. Although the goal is to set up a meetup, don't ask for a meetup too early in the conversation.

Her:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;