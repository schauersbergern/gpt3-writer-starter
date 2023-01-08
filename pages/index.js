import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {

  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`\n\nIch: ${output.text.replace(/\s+/g, ' ').replace('Ich:', '').trim()}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setApiOutput("");
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Super Flirt assistant</h1>
          </div>
          <div className="header-subtitle">
            <h2>Be the Tinder chief with AI assistance</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="Gib hier den ersten Text ein, den die Frau geschrieben hat. Nachdem du eine Antwort generiert hast führe die Konversation mit 'Frau: (Antwort der Frau)' fort."
          className="prompt-box"
          value={userInput + apiOutput}
          onChange={onUserChangedText}
        />
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Antwort generieren</p>}
            </div>
          </a>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.schauersberger.software/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>build by Schauersberger Softwaredesign</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
