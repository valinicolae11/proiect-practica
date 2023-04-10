import './App.css';
import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from 'react';
import Header from './Header';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';

function App() {

  const [prompt, setPrompt] = useState("");
  const [chatData, setChatData] = useState({ "history": [{ "type": "openai", "data": "I'm a chatbot, ask me anything!" }], "response": "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const configuration = new Configuration({
    apiKey: "cheie api",
  });

  const openai = new OpenAIApi(configuration);

  const generateResponse = async () => {
    if (prompt === "" || isProcessing)
      return false;


    setIsProcessing(true);

    let newChatData = Object.assign({}, chatData);
    if (chatData.response !== "")
      newChatData.history.push({ "type": "openai", "data": chatData.response });
    newChatData.history.push({ "type": "user", "data": prompt });

     // check if question already exists in cache. If not, continue with the api request and save it.
    const cachedResponse = localStorage.getItem(prompt);
    if (cachedResponse !== null) {
      newChatData.response = cachedResponse;
    } else {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: [prompt],
        max_tokens: 256, // limit token usage
      })
      console.log('response', response);

      let processedResponse = await response.data.choices[0].text;
      newChatData.response = processedResponse.length === 0 ? "API Error. No response received." : processedResponse;

      // save response to cache
      await localStorage.setItem(prompt, newChatData.response);
    }
    await setChatData(newChatData);

    setIsProcessing(false);
  };

  useEffect(() => {
    if (chatData.response !== "") {
      setChatData((prevChatData) => {
        const newHistory = [...prevChatData.history, { type: "openai", data: chatData.response }];
        return {
          history: newHistory,
          response: ""
        };
      });
    }
  }, [chatData]);

  return (
    <div className="App">
      <Header></Header>
      <div className='chat-container'>
        <ChatHistory chatHistory={chatData.history} response={chatData.response} />
        <ChatInput handleChange={setPrompt} handleClick={generateResponse} isProcessing={isProcessing}></ChatInput>
      </div>
    </div>
  );
}
export default App;