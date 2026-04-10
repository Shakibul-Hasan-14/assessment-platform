import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import ExamScreen from "../pages/candidate/ExamScreen";
import BasicInfo from "../pages/employer/BasicInfo.jsx";
import EmployerDashboard from "../pages/employer/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";
import ManageOnlineTest from "../pages/employer/QuestionBuilder.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute allowedRole="employer">
            <Layout pageTitle="Dashboard">
              <EmployerDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/basic-info"
        element={
          <ProtectedRoute allowedRole="employer">
            <Layout>
              <BasicInfo />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/manage-test"
        element={
          <ProtectedRoute allowedRole="employer">
            <Layout>
              <ManageOnlineTest />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRole="candidate">
            <Layout pageTitle="Dashboard">
              <CandidateDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/exam"
        element={
          <ProtectedRoute allowedRole="candidate">
            <Layout>
              <ExamScreen />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
