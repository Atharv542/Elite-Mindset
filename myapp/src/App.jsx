import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkshopDetail from "./pages/WorkshopDetail";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshop/:id" element={<WorkshopDetail />} />
      </Routes>
    </BrowserRouter>
  );
}