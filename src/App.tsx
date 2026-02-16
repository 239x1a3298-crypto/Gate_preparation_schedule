import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './components/Auth/Login';
import Dashboard from './pages/Dashboard';
import Syllabus from './pages/Syllabus';
import Schedule from './pages/Schedule';
import Tracker from './pages/Tracker';
import MockTests from './pages/MockTest';
import CodingDashboard from './pages/CodingDashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  console.log('App component rendering');
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="coding" element={<CodingDashboard />} />
          <Route path="mock-tests" element={<MockTests />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
