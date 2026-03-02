import { Routes, Route } from "react-router-dom";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import ProfilePage from "./pages/Profile";
import AppHeader from "./components/custom/AppHeader";
import EditProfileIntegratedPage from "./pages/EditProfileIntegrated";
import DashboardPage from "./pages/Dashboard";
import ApplicationPage from "./pages/Applications";
import ReminderPage from "./pages/Reminders";
import EditProfileIntegratedFileUPloadPage from "./pages/EditProfileIntgratedFileUpload";



function App() {
  return (
    <>

    <AppHeader/>

    <div className="container mx-auto p-6">

      {/*<nav>
        <Link to="/">View Jobs</Link> | 
        <Link to="/add">Add Job</Link>
      </nav>*/}

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationPage />} />
        <Route path="/reminders" element={<ReminderPage />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfileIntegratedPage />} />
        <Route path="/editprofileUpload" element={<EditProfileIntegratedFileUPloadPage />} />
      </Routes>
</div>
    </>
  );
}

export default App;