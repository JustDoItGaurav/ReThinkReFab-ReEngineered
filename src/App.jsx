// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryPage from './pages/GalleryPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectDetailPage from './pages/ProjectDetailPage';
import UserProfilePage from './pages/UserProfilePage'; // 1. Import the new page

function App() {
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} /> {/* 2. Add the new route */}
          <Route 
            path="/create-project" 
            element={
              <ProtectedRoute>
                <CreateProjectPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
