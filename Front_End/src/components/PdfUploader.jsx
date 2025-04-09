import React, { useState } from "react";
import pdfParse from "pdf-parse";

const PdfUploader = ({ onTextExtracted }) => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      extractTextFromPDF(file);
    }
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const pdf = await pdfParse(data);
      onTextExtracted(pdf.text);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mb-4">
      <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
        Chọn tệp PDF
        <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
      </label>
      {pdfFile && <p className="text-gray-700 mt-2">Tệp đã chọn: {pdfFile.name}</p>}
    </div>
  );
};

export default PdfUploader;