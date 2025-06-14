import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import toast from "react-hot-toast";

const PDFUpload = ({ setDocumentId }) => {
  const [fileName, setFileName] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const uploadToast = toast.loading("Uploading PDF...");

    try {
      const response = await fetch("http://localhost:8000/api/pdf/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFileName(data.filename);
      setDocumentId(data.document_id);

      toast.success("PDF uploaded successfully!", { id: uploadToast });
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("PDF upload failed!", { id: uploadToast });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {fileName && (
        <div className="hidden sm:flex items-center text-green-700 text-sm space-x-1">
          <CiFileOn className="text-xl" />
          <span className="truncate max-w-[150px]">{fileName}</span>
        </div>
      )}

      {/* Desktop Upload Button */}
      <label className="hidden sm:flex items-center border border-gray-400 px-5 py-2 rounded-full cursor-pointer hover:shadow transition">
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleUpload}
        />
        <span className="flex items-center space-x-2">
          <IoIosAddCircleOutline size={20} />
          <span>Upload PDF</span>
        </span>
      </label>

      {/* Mobile view */}
      <div className="sm:hidden flex items-center space-x-2">
        {fileName && (
          <div className="flex items-center text-green-700 text-sm">
            <CiFileOn className="mr-1" />
            <span className="truncate max-w-[100px]">{fileName}</span>
          </div>
        )}
        <label className="border-2 border-black p-2 rounded-md cursor-pointer hover:shadow transition">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleUpload}
          />
          <IoIosAddCircleOutline size={20} />
        </label>
      </div>
    </div>
  );
};

export default PDFUpload;
