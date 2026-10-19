import { BrowserRouter, Routes, Route, Navigate , Outlet } from "react-router-dom";

import { getSession , getDashboardPath} from "./auth/Session";
import Login from './pages/Login';
import LogoutButton from "./pages/Logout";

import Dashboard from './pages/Dashboard';
import Navbar from "./components/navbar";
import Drives from "./pages/Drives";
import DriveDetails from "./components/drives/DriveDetails";
import Profile from "./pages/Profile";
import ApplyDrive from "./pages/Apply";
import MyApplications from "./pages/MyApplications";
import ApplicationSuccess from "./components/drives/SuccessPage";
import ApplicationDetails from "./components/Application/ApplicationDetails";
import Companies from "./pages/Companies";
import AboutTPO from "./pages/AboutTpo";
import Resources from "./pages/Resources";

import AdminLayout from "./admin/layouts/Layouts";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminDrives from "./admin/pages/Drives";
import CreateJobApplication from "./admin/pages/CreateJobApplication";
import AdminApplications from "./admin/pages/Applications";
import AdminDriveApplications from "./admin/components/adminApplications/AdminDriveApplications";
import AdminStudents from "./admin/pages/Students";
import AdminStudentPlacementRecord from "./admin/components/students/StudentPlacementRecord";


  function EntryRedirect() {
  const user = getSession();

  return (
    <Navigate
      to={user ? getDashboardPath(user.role) : "/login"}
      replace
    />
  );
}

function LoginRoute() {
  const user = getSession();

  return user
    ? <Navigate to={getDashboardPath(user.role)} replace />
    : <Login />;
}

function RequireRole({ role }) {
  const user = getSession();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <Outlet />;
}

function StudentLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<EntryRedirect />} />
      <Route path="/login" element={<LoginRoute />} />

      <Route element={<RequireRole role="Student" />}>
        <Route element={<StudentLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/drives" element={<Drives />} />
          <Route path="/drives/:id" element={<DriveDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/drives/:driveId/apply"
            element={<ApplyDrive />}
          />
          <Route path="/applications" element={<MyApplications />} />
          <Route
            path="/drives/:id/apply/success"
            element={<ApplicationSuccess />}
          />
          <Route
            path="/applications/:id"
            element={<ApplicationDetails />}
          />
          <Route path="/companies" element={<Companies />} />
          <Route path="/about" element={<AboutTPO />} />
          <Route path="/resources" element={<Resources />} />
        </Route>
      </Route>

      <Route element={<RequireRole role="Admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="drives" element={<AdminDrives />} />
          <Route
            path="drives/create"
            element={<CreateJobApplication />}
          />
          <Route path="applications" element={<AdminApplications />} />
          <Route
            path="applications/:driveId"
            element={<AdminDriveApplications />}
          />
          <Route path="students" element={<AdminStudents />} />
          <Route
            path="students/:studentId"
            element={<AdminStudentPlacementRecord />}
          />
        </Route>
      </Route>

      <Route path="*" element={<p>Page not found.</p>} />
    </Routes>
  );
} 


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App
