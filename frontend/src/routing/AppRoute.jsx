import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/header'; // Default Header
import LoggedInHeader from '../components/LoggedInHeader'; // Logged-in Header
import Index from '../pages/sections/Index';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/auth/Dashboard';
import Project from '../pages/auth/Project';
import ProjectsList from '../pages/auth/ProjectsList';
import NoHeaderLayout from '../components/NoHeaderLayout';
import Career from '../pages/auth/Career';
import CareersList from '../pages/CareerList';
import EditProject from '../pages/auth/EditProject';
import UnProjectsList from '../pages/ProjectList';
import Contact from '../pages/Contact';

const AppRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  const DefaultLayout = ({ children }) => (
    <>
      <Header />
      {children}
    </>
  );

  const LoggedInLayout = ({ children }) => (
    <>
      <LoggedInHeader />
      {children}
    </>
  );

  const NoHeaderLayout = ({ children }) => (
    <>
      {children}
    </>
  );

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/admin"
        element={
          <NoHeaderLayout>
            <Login />
          </NoHeaderLayout>
        }
      />
      <Route
        path="/register"
        element={
          <NoHeaderLayout>
            <Register />
          </NoHeaderLayout>
        }
      />
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Index />
          </DefaultLayout>
        }
      />
      <Route
        path="/project/list"
        element={
          <DefaultLayout>
            <UnProjectsList />
          </DefaultLayout>
        }
      />
      <Route
        path="/Contact"
        element={
          <DefaultLayout>
            <Contact />
          </DefaultLayout>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <LoggedInLayout>
              <Dashboard />
            </LoggedInLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/project"
        element={
          <PrivateRoute>
            <LoggedInLayout>
              <Project />
            </LoggedInLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/project/list"
        element={
          <PrivateRoute>
            <LoggedInLayout>
              <ProjectsList />
            </LoggedInLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/career"
        element={
          <PrivateRoute>
            <LoggedInLayout>
              <Career />
            </LoggedInLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/career/list"
        element={
          <PrivateRoute>
            <LoggedInLayout>
              <CareersList />
            </LoggedInLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/project/list/edit/:id"
        element={
          <PrivateRoute>
            <LoggedInLayout>
              <EditProject />
            </LoggedInLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoute;
