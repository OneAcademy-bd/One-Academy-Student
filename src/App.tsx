import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ExamsList from "./pages/ExamsList";
import ExamOnsite from "./pages/ExamOnsite";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EvaluationVisualizer from "./pages/EvaluationVisualizer";
import Logout from "./pages/Logout";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login/" element={<Login />} />
      <Route path="logout/" element={<Logout />} />
      <Route path="register/" element={<Register />} />
      <Route path="exams/" element={<ExamsList />} />
      <Route path="exams/:examId/" element={<ExamOnsite />} />
      <Route path="exams/:examId/evaluation/" element={<EvaluationVisualizer />} />
      <Route path="dashboard/" element={<Dashboard />} />
    </Routes>
  )
}
