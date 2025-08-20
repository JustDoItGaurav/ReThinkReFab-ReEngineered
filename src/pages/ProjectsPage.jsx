// src/pages/ProjectsPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FiSearch, FiTrendingUp, FiClock } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setLoading(true);
    
    const projectsQuery = query(
      collection(db, 'projects'), 
      orderBy(sortBy === 'newest' ? 'createdAt' : 'likeCount', 'desc')
    );

    const unsubscribe = onSnapshot(projectsQuery, (querySnapshot) => {
      const projectList = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setProjects(projectList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects in real-time: ", error);
      setLoading(false);
    });

    return () => unsubscribe();

  }, [sortBy]);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeCategory !== 'All') {
      result = result.filter(project => project.category === activeCategory);
    }

    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      result = result.filter(project => {
        const titleMatch = project.title.toLowerCase().includes(lowercasedSearchTerm);
        const materialsMatch = project.materials && Array.isArray(project.materials) &&
          project.materials.some(material => 
            material.toLowerCase().includes(lowercasedSearchTerm)
          );
        return titleMatch || materialsMatch;
      });
    }

    return result;
  }, [searchTerm, activeCategory, projects]);

  const categories = useMemo(() => {
    const allCategories = projects.map(p => p.category).filter(Boolean);
    return ['All', ...new Set(allCategories)];
  }, [projects]);

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
            <h1 className="text-5xl font-extrabold text-slate-800 dark:text-white">Explore All Projects</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">Search by title or materials to find your next creation.</p>
          </motion.div>

          <div className="mb-8 flex justify-center items-center gap-4">
            <span className="text-sm font-semibold text-slate-500">Sort by:</span>
            <button onClick={() => setSortBy('popular')} className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${sortBy === 'popular' ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
              <FiTrendingUp /> Popular
            </button>
            <button onClick={() => setSortBy('newest')} className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${sortBy === 'newest' ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
              <FiClock /> Newest
            </button>
          </div>

          <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <input
                type="text"
                placeholder="Search for 't-shirt', 'bottle', 'wood'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {loading ? (
            <p className="text-center col-span-full text-slate-500">Loading projects...</p>
          ) : (
            <motion.div 
              layout 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <p className="text-center col-span-full text-slate-500 mt-8">No projects found. Try a different search or filter!</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectsPage;
