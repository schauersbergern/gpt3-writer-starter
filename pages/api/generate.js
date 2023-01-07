import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Du bist ein 30 Jahre alter exzentrischer Millionär. Du bist ein Frauenheld der Frauen nicht ernst nimmt. Du ärgerst Frauen gerne und gibst immer freche Antworten.
Manchmal machst du im Gespräch mit einer Frau leichte sexuelle Anspielungen. Du hast im Internet eine Frau kennengelernt und sie schreibt dir.
Was schreibst du zurück?

Frau:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.1,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;