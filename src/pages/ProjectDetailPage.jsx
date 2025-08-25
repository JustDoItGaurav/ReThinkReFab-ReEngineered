// src/pages/ProjectDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';
import { FiTag, FiTool, FiList, FiUser } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      setError('');
      try {
        const projectRef = doc(db, 'projects', projectId);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          const projectData = { id: projectSnap.id, ...projectSnap.data() };
          setProject(projectData);

          if (projectData.category) {
            const similarProjectsQuery = query(collection(db, 'projects'), where('category', '==', projectData.category), limit(4));
            const similarProjectsSnap = await getDocs(similarProjectsQuery);
            const similarProjectsList = similarProjectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(p => p.id !== projectId);
            setSimilarProjects(similarProjectsList.slice(0, 3));
          }
        } else {
          setError('Project not found.');
        }
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError('Failed to load project data.');
      }
      setLoading(false);
    };

    window.scrollTo(0, 0);
    fetchProjectData();
  }, [projectId]);

  // Loading and Error states
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] pt-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-xl text-slate-600 dark:text-slate-400">Loading Project...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] pt-24">
          <div className="text-center">
            <p className="text-xl text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* --- NEW LAYOUT: ARTICLE STYLE --- */}
            <section className="space-y-8">
                {/* Left-aligned Title Block */}
                <div className="max-w-4xl">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                      {project.title}
                    </h1>
                    <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400">
                        {project.authorEmail && (
                            <div className="flex items-center gap-2">
                              <FiUser />
                              <span>By {project.authorEmail.split('@')[0]}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FiTag />
                          <span>{project.category}</span>
                        </div>
                    </div>
                </div>

                {/* Medium-sized Image Container */}
                <div className="max-w-4xl">
                  <div className="relative overflow-hidden rounded-xl shadow-2xl bg-slate-100 dark:bg-slate-800 aspect-video">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="max-w-4xl prose prose-lg dark:prose-invert">
                    <p>
                      {project.description}
                    </p>
                </div>
            </section>

            {/* --- NEW LAYOUT: SIDE-BY-SIDE MATERIALS & INSTRUCTIONS --- */}
            <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Materials Section */}
              {project.materials && project.materials.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <FiTool className="text-green-500" />
                    Materials
                  </h2>
                  <ul className="space-y-3">
                    {project.materials.map((material, index) => (
                      <li key={index} className="flex items-start gap-3 text-lg text-slate-600 dark:text-slate-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></span>
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions Section */}
              {project.steps && project.steps.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <FiList className="text-green-500" />
                    Instructions
                  </h2>
                  <div className="space-y-8">
                    {project.steps.map((step, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">{step}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Similar Projects Section (remains the same) */}
            {similarProjects.length > 0 && (
              <section className="pt-12 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Similar Projects</h2>
                  <p className="text-slate-600 dark:text-slate-400">You might also be interested in these projects</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {similarProjects.map((similarProject, index) => (
                    <motion.div key={similarProject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                      <ProjectCard project={similarProject} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
