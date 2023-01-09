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

    setApiOutput(`\n\nMe: ${output.text.replace(/\s+/g, ' ').replace('Me:', '').trim()}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setApiOutput("");
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 based conversation and flirt assistant</title>
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
          placeholder="Enter the first text here that the woman wrote. After generating a reply, continue the conversation with 'Her: (woman's reply)'."
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
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
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
