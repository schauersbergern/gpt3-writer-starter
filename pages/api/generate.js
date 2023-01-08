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
Tip: Wenn du schreibst, stelle auch immer Fragen, damit die Konversation nicht abbricht. Obwohl es das Ziel ist ein Treffen auszumachen, frage nicht zu früh in der Konversation nach einem Treffen.

Frau:
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