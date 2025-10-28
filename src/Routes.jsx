import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MoodJournal from './pages/mood-journal';
import SettingsAndProfile from './pages/settings-and-profile';
import Dashboard from './pages/dashboard';
import LoginAndSignup from './pages/login-and-signup';
import AIChatCompanion from './pages/ai-chat-companion/Index.jsx';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginAndSignup />} />
        <Route path="/mood-journal" element={<MoodJournal />} />
        <Route path="/settings-and-profile" element={<SettingsAndProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login-and-signup" element={<LoginAndSignup />} />
        <Route path="/ai-chat-companion" element={<AIChatCompanion />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
