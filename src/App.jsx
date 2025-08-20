// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectDetailPage from './pages/ProjectDetailPage'; // 1. Import the new page

function App() {
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* 2. Add the new dynamic route */}
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />

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
