import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for better performance
const Homepage = React.lazy(() => import('./pages/Homepage/Homepage'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const ChooseYourStylist = React.lazy(() => import('./pages/ChooseYourStylist/ChooseYourStylist'));
const BookDateTime = React.lazy(() => import('./pages/BookDateTime/BookDateTime'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp/SignUp'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="glass-panel-strong p-8 rounded-2xl">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
      <p className="mt-4 text-foreground font-cta">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/choose-your-stylist" element={<ChooseYourStylist />} />
            <Route path="/book-date-time" element={<BookDateTime />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
