import PDFUpload from "./PDFUpload";

const Navbar = () => (
  <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
    <div className="text-xl font-bold text-green-700 flex items-center">
      <img src="/logo.png" alt="logo" className="h-11 w-30 mr-2" />
    </div>
    <PDFUpload/>
  </header>
);

export default Navbar;
