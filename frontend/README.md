# 🖥️ Frontend – PDF Chatbot (React + Tailwind)

This is the frontend of the PDF Chatbot application, built using **React**, **Tailwind CSS**, and **react-hot-toast**.

---

## 🚀 Features

- 📄 Upload PDF and show filename  
- 💬 Ask questions based on uploaded PDF  
- 🔐 Disable input until PDF is uploaded  
- 🔄 Show loading state while waiting for response  
- 🔔 Toast notifications for errors and feedback  

---

## 🧪 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Dev Server

```bash
npm run dev
```

### 3. Project Structure

```
src/
├── components/
│   ├── ChatInput.jsx
│   ├── ChatMessage.jsx
│   ├── Navbar.jsx
│   └── PDFUpload.jsx
├── pages/
│   └── ChatPage.jsx
├── App.jsx
└── main.jsx
```

---

## ⚙️ Configuration

Make sure your backend is running at:

```
http://localhost:8000
```

If not, update the API URLs in `ChatPage.jsx` and `PDFUpload.jsx`.

---

## 🧑‍💻 Tech Stack

- React  
- Tailwind CSS  
- react-hot-toast  
- Vite  

---

## 📁 Notes

- The `document_id` is passed from `Navbar` → `ChatPage` → `ChatInput`
- Toasts notify the user when:
  - No PDF is uploaded  
  - Assistant is still responding  
  - A fetch error occurs  

---

## 🤝 Author

Built with ❤️ by D. Ravi Teja.
