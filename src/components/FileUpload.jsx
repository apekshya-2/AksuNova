import { Buffer } from "buffer";

function FileUpload({ setFile }) {
  async function handleFileUpload(event) {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const fileBuffer = await uploadedFile.arrayBuffer();

    const file = {
      type: uploadedFile.type,
      file: Buffer.from(fileBuffer).toString("base64"), // ✅ base64 string
      imageUrl: URL.createObjectURL(uploadedFile),     // ✅ preview URL
    };

    setFile(file);
  }

  return (
    <section>
      <h2>Get Started</h2>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
      />
    </section>
  );
}

export default FileUpload;
