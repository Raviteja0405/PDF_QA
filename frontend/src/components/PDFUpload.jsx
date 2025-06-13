const PDFUpload = () => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:8000/api/pdf", {
      method: "POST",
      body: formData,
    });

    alert("Uploaded successfully!");
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer">
        Upload PDF
        <input type="file" accept="application/pdf" className="hidden" onChange={handleUpload} />
      </label>
    </div>
  );
};

export default PDFUpload;
