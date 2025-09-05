import { useState } from "react"; 
import './Chat.css'
import { GoogleGenerativeAI } from "@google/generative-ai";

function Chat({ file }) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function handleSendMessage() {
    if (!input.trim()) return;

    // Add user message
    let chatMessages = [...messages, { role: "user", text: input },{ role: "loader", text: "" }];
    setMessages(chatMessages);
    setInput("");

    try {
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  data: file.file,
                  mimeType: file.type,
                },
              },
              {
                text: `Answer this question about the attached document: ${input}.
                Answer as a chatbot with short message and text only (no markdowns, tags or symbols).
                Chat history: ${JSON.stringify(messages)}`,
              },
            ],
          },
        ],
      });

      const modelReply = result.response.text(); // or await if needed
      chatMessages = [...chatMessages.filter((msg)=>msg.role != 'loader'), { role: "model", text: modelReply }];
      setMessages(chatMessages);

    } catch (err) {
      chatMessages = [...chatMessages, { role: "error", text: "Error sending message. Please try again later." }];
      setMessages(chatMessages);
      console.error(err);
    }
  }

  return (
    <section className="chat-window">
      <h2>Chat</h2>
      {messages.length ? (
        <div className="chat">
          {messages.map((msg, idx) => (
            <div className={msg.role} key={idx}> 
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Ask any question about the uploaded document..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </section>
  );
}

export default Chat;
