import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
