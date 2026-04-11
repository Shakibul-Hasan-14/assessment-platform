import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import ExamScreen from "../pages/candidate/ExamScreen";
import BasicInfo from "../pages/employer/manage-test/BasicInfo.jsx";
import EmployerDashboard from "../pages/employer/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";
import QuestionBuilder from "../pages/employer/manage-test/QuestionBuilder.jsx";

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
        path="/employer/manage-test/basic-info"
        element={
          <ProtectedRoute allowedRole="employer">
            <Layout pageTitle="Manage Online Test">
              <BasicInfo />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/manage-test/questions"
        element={
          <ProtectedRoute allowedRole="employer">
            <Layout pageTitle="Manage Online Test">
              <QuestionBuilder />
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
            <Layout pageTitle="Exam Screen">
              <ExamScreen />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
