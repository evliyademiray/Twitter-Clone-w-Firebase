import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import { auth } from "./firebase/config";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  console.log("Mevcut Kullanıcı", auth.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        
        {/* Todo> Bu route'a sadece oturumu açık kullanıcılar girebilsin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<FeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
