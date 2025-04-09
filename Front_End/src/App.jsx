import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar, { UserProvider } from "./components/Navbar"; // Import UserProvider
import Home from "./components/Home";
import LearningPath from "./components/LearningPath";
import PlacementTest from "./components/PlacementTest";
import GrammarPractice from "./components/GrammarPractice";
import ProgressReport from "./components/ProgressReport";
import VocabularyPractice from "./components/VocabularyPractice";
import Lesson from "./components/Lesson";
import GrammarLessons from "./components/GrammarLessons";
import GrammarQuiz from "./components/GrammarQuiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import UpdateLevel from "./components/UpdateLevel";

const App = () => {
  return (
    <UserProvider> {/* Bọc toàn bộ app trong UserProvider */}
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/lesson/:level/:lessonId" element={<Lesson />} />
            <Route path="/learning-path/grammar" element={<GrammarLessons />} />
            <Route path="/placement-test" element={<PlacementTest />} />
            <Route path="/grammar-practice" element={<GrammarPractice />} />
            <Route path="/progress-report" element={<ProgressReport />} />
            <Route path="/vocabulary-practice" element={<VocabularyPractice />} />
            <Route path="/update-level" element={<UpdateLevel />} />
            <Route path="/quiz" element={<GrammarQuiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
// Compare this snippet from src/pages/Register.jsx: