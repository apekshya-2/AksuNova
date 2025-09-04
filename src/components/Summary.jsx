import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";
import Loader from "./Loader";

function Summary({ file }) {
  const [summary, setSummary] = useState("Loading summary...");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!file) return;

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function getSummary() {
      setStatus("loading");
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

        setStatus("success");
        setSummary(await result.response.text());
      } catch (err) {
        console.error(err);
        setStatus("error");
        setSummary("❌ Failed to generate summary: " + err.message);
      }
    }

    getSummary();
  }, [file]);

  return (
    <section className="summary">
      <h3>File Preview</h3>
      {file?.type?.includes("image") ? (
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

      <h2>Summary</h2>
      {status === "loading" && <Loader />}
      {status === "success" && <p>{summary}</p>}
      {status === "error" && <p>{summary}</p>}
    </section>
  );
}

export default Summary;
