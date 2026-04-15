import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Schedule from './pages/Schedule.jsx';
import Nutrition from './pages/Nutrition.jsx';
import Ratings from './pages/Ratings.jsx';
import Profile from './pages/Profile.jsx';
import NavBar from './components/NavBar.jsx';
import { supabase } from './utils/supabaseClient.js';

export default function App() {
  const location = useLocation();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = supabase.auth.session;
    setSession(currentSession);
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <main className="flex-1 overflow-y-auto p-4 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/nutrition" element={<Nutrition session={session} />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/profile" element={<Profile session={session} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* Render bottom navigation unless on certain pages like admin panel (not yet implemented) */}
      {location.pathname !== '/admin' && <NavBar />}
    </div>
  );
}