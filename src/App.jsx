// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/not-found.jsx";

function App() {
  return (
    <Router>
      <TooltipProvider>
        <Toaster />
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback for 404 */}
        </Routes>
      </TooltipProvider>
    </Router>
  );
}

export default App;
