import { Buffer } from "buffer";
import { useEffect, useState } from "react";

function FileUpload({ setFile }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  async function handleFileUpload(event) {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const fileBuffer = await uploadedFile.arrayBuffer();

    const file = {
      type: uploadedFile.type,
      file: Buffer.from(fileBuffer).toString("base64"), // ✅ base64 string
      imageUrl: uploadedFile.type.includes("pdf")
        ? "/pdf.png" // placeholder
        : URL.createObjectURL(uploadedFile),
      name: uploadedFile.name,
    };

    console.log(file);
    setFile(file);
    setPreviewUrl(file.imageUrl);
    setFileType(file.type);
  }

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (previewUrl && !fileType?.includes("pdf")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, fileType]);

  return (
    <section>
      <h2>Get Started</h2>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
      />

      {previewUrl && (
        <div style={{ marginTop: "1rem" }}>
          {fileType?.includes("pdf") ? (
            <img
              src="/pdf.png"
              alt="PDF Placeholder"
              style={{ maxWidth: "100px", marginTop: "1rem" }}
            />
          ) : (
            <img
              src={previewUrl}
              alt="Uploaded Preview"
              style={{ maxWidth: "200px", marginTop: "1rem" }}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default FileUpload;
