import { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import './App.css';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(""); // For displaying formatted answer
  const [rawAnswer, setRawAnswer] = useState(""); // For storing raw answer


  async function generateAnswer() {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    setAnswer(" (Might take few seconds) loading...");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const rawAnswerText = response.data.candidates[0].content.parts[0].text;
      const formattedAnswer = formatAnswer(rawAnswerText);
      setAnswer(formattedAnswer);
      setRawAnswer(rawAnswerText);
    } catch (error) {
      setAnswer("Error generating answer.");
      console.error(error);
    }
  }


  // Function to format the answer by making text within ** bold
  function formatAnswer(answer) {
    const regex = /\*\*(.*?)\*\*/g; // Regex to find text within **
    const formattedText = answer.split(regex).map((part, index) => {
      if (index % 2 === 1) { // If it's in between **
        return <strong key={index}>{part}</strong>; // Return bold text
      }
      return part; // Return the plain text
    });
    return <>{formattedText}</>; // Wrap in a fragment to return as valid JSX
  }

  // Function to copy the raw answer to clipboard
  function copyToClipboard() {
    if (rawAnswer) { // Check if rawAnswer is not empty
      navigator.clipboard.writeText(rawAnswer)
        .then(() => {
          alert("Answer copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying to clipboard: ", error);
        });
    } else {
      alert("No answer to copy.");
    }
  }

  // Function to start speech recognition
  const startSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onstart = () => {
      console.log("Voice recognition started. Try speaking into the microphone.");
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setQuestion(spokenText); // Set the recognized text to the question state
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: ", event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
    };

    recognition.start();
  };

  // Function to speak the answer aloud using SpeechSynthesis
  const speakAnswer = () => {
    const speech = new SpeechSynthesisUtterance(rawAnswer); // Use rawAnswer for speaking
    speech.lang = 'en-US'; // Set language if needed
    window.speechSynthesis.speak(speech);
  };

  // Function to stop the ongoing speech synthesis
  const stopSpeaking = () => {
    window.speechSynthesis.cancel(); // Stops any ongoing speech synthesis
  };

  async function generateRealTimeAnswer() {
    setAnswer(" (Fetching real-time data) loading...");

    try {
      const response = await axios.post("https://ai-logic.onrender.com/api/realtime", {
        question: question,
      });

      const rawAnswerText = response.data.answer;
      const formattedAnswer = formatAnswer(rawAnswerText);
      setAnswer(formattedAnswer);
      setRawAnswer(rawAnswerText);
      //setQuestion(""); // clear textarea
    } catch (error) {
      setAnswer("Error fetching real-time answer.");
      console.error(error);
    }
  }




  return (
    <>
      <h1 className="text-3xl font-bold mb-10 text-white">CHAT AI</h1>

      <div className="w-full max-w-2xl">
        <textarea
          className="border border-blue-300 p-4 rounded mb-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out bg-gray-800 text-white hover:bg-gray-700"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          cols="75"
          rows="5"
          placeholder="Ask anything..."
        ></textarea>

        <div className="flex mb-10 space-x-4">
          <button className="stylish-button" onClick={generateAnswer}>
            Generate Answer
          </button>

          <button className="stylish-button bg-yellow-500 hover:bg-yellow-700" onClick={startSpeechRecognition}>
            🎤 Speak
          </button>

          <button
            className="btn bg-green-500 hover:bg-green-700"
            onClick={generateRealTimeAnswer}
          >
            Real-Time
          </button>
          <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
            <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Try this for real-time data
            </span>
          </div>

        </div>

        {answer && (
          <div className="transition-opacity duration-500 ease-in-out opacity-100">
            <h2 className="text-purple-600 font-bold mb-2">Answer:</h2>
            <pre className="border border-blue-300 p-4 rounded shadow-md bg-gray-800 text-white overflow-hidden whitespace-pre-wrap text-left transition duration-300 ease-in-out transform hover:scale-105">
              {answer}
            </pre>
            <div className="flex space-x-4">
              <button className="stylish-button bg-green-500 hover:bg-green-700 mt-4" onClick={copyToClipboard}>
                Copy
              </button>
              <button className="stylish-button bg-blue-500 hover:bg-blue-700 mt-4" onClick={speakAnswer}>
                🔊 Speak Answer
              </button>
              <button className="stylish-button bg-red-500 hover:bg-red-700 mt-4" onClick={stopSpeaking}>
                🔇 Stop Speaking
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
