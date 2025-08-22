// src/pages/UserProfilePage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';
import { FiUser, FiGrid } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

const UserProfilePage = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        let finalProfileData = null;

        // 1. Fetch all projects created by this user first.
        // REMOVED the orderBy clause to prevent the need for a custom index.
        const projectsQuery = query(
          collection(db, 'projects'),
          where('authorId', '==', userId)
        );
        const projectsSnap = await getDocs(projectsQuery);
        // Sort the projects manually after fetching
        const projectsList = projectsSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
        
        setUserProjects(projectsList);

        // 2. Now, determine the user profile.
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // If a real profile document exists, use it.
          finalProfileData = userSnap.data();
        } else if (projectsList.length > 0 && projectsList[0].authorEmail) {
          // If no profile doc, but the user has projects, create a fallback profile.
          const authorEmail = projectsList[0].authorEmail;
          finalProfileData = {
            email: authorEmail,
            username: authorEmail.split('@')[0],
          };
        }
        
        if (finalProfileData) {
            setUserProfile(finalProfileData);
        } else {
            // This case happens if a user ID exists but has no profile doc and no projects.
            setError('User has not created any projects yet.');
        }

      } catch (err) {
        console.error("Error fetching user data:", err);
        setError('Failed to load user profile. Please check the console for details.');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
          <p className="text-xl animate-pulse">Loading Profile...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
          <p className="text-xl text-red-500">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  // This check prevents the page from trying to render with incomplete data.
  if (!userProfile) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-900 pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Profile Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <FiUser className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">{userProfile.username}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">{userProfile.email}</p>
          </motion.div>

          {/* User's Projects Grid */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
              <FiGrid /> Projects by {userProfile.username}
            </h2>
            {userProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg">
                <p className="text-slate-500">{userProfile.username} hasn't created any projects yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
