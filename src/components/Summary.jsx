import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";

function Summary({ file }) {
  const [summary, setSummary] = useState("Loading summary...");

  useEffect(() => {
    if (!file) return;

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function getSummary() {
      try {
        const result = await model.generateContent([
          {
            inlineData: {
              data: file.file,
              mimeType: file.type,
            },
          },
          "Summarize this document",
        ]);

        setSummary(result.response.text());
      } catch (err) {
        console.error(err);
        setSummary("❌ Failed to generate summary.");
      }
    }

    getSummary();
  }, [file]);

  return (
    <section className="summary">
      <h2>Summary</h2>
      <p>{summary}</p>

      <h3>File Preview</h3>
      {file.type.includes("image") ? (
        <img
          src={`data:${file.type};base64,${file.file}`}
          alt="preview"
          style={{ maxWidth: "400px", border: "1px solid #ccc" }}
        />
      ) : (
        <embed
          src={`data:${file.type};base64,${file.file}`}
          width="100%"
          height="500px"
          type={file.type}
        />
      )}
    </section>
  );
}

export default Summary;
