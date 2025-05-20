
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import CreateWish from "@/components/CreateWish";
import BirthdayWish from "@/components/BirthdayWish";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
        <Routes>
          <Route path="/" element={<CreateWish />} />
          <Route path="/wish/:name" element={<BirthdayWish />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
