import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
function App() {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
