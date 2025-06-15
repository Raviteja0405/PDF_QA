import PDFUpload from "./PDFUpload";

const Navbar = ({ setDocumentId}) => (
  <header className="bg-white shadow px-4 sm:px-20 py-3 sm:py-4 flex items-center justify-between">
    <div className="text-xl font-bold text-green-700 flex items-center">
      <img src="/logo.png" alt="logo" className="h-11 w-30 mr-2" />
    </div>
    <PDFUpload setDocumentId={setDocumentId}/>
  </header>
);

export default Navbar;
