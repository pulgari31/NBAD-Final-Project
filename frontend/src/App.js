import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import Menu from "./Menu/Menu";
import DashboardPage from "./DashboardPage/DashboardPage";
import SummaryPage from "./SummaryPage/SummaryPage";
import ReportsPage from "./ReportsPage/ReportsPage";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
