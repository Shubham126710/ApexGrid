import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import SplashScreen from './components/layout/SplashScreen';
import Teams from './pages/Teams';
import Races from './pages/Races';
import Components from './pages/Components';
import Logistics from './pages/Logistics';
import Expenses from './pages/Expenses';
import Database from './pages/Database';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="database" element={<Database />} />
          <Route path="teams" element={<Teams />} />
          <Route path="races" element={<Races />} />
          <Route path="components" element={<Components />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
