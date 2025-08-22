// src/pages/GalleryPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GalleryPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const projectsQuery = query(
          collection(db, 'projects'),
          orderBy('createdAt', 'desc')
        );
        
        const projectSnapshot = await getDocs(projectsQuery);
        const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching all projects for gallery: ", error);
      }
      setLoading(false);
    };

    fetchAllProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-slate-900 pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-extrabold text-slate-800 dark:text-white">Community Gallery</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">A showcase of every creation from our talented community.</p>
          </motion.div>

          {loading ? (
            <p className="text-center text-slate-500">Loading creations...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="overflow-hidden rounded-lg shadow-lg group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={`/project/${project.id}`}>
                    <div className="relative aspect-square">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                        <p className="text-white text-center text-sm font-bold">{project.title}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage;
