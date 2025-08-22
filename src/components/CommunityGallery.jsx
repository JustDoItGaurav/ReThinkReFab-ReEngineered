// src/components/CommunityGallery.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

const CommunityGallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      setLoading(true);
      try {
        // Query to get the 8 most recently created projects
        const projectsQuery = query(
          collection(db, 'projects'),
          orderBy('createdAt', 'desc'),
          limit(8)
        );
        
        const projectSnapshot = await getDocs(projectsQuery);
        const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching gallery projects: ", error);
      }
      setLoading(false);
    };

    fetchRecentProjects();
  }, []);

  return (
    <section id="gallery" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Community Gallery</h2>
        
        {loading ? (
          <p className="text-center text-slate-500">Loading latest creations...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="overflow-hidden rounded-lg shadow-lg group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Each image is now a link to its project detail page */}
                <Link to={`/project/${project.id}`}>
                  <div className="relative aspect-square">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Add a subtle overlay on hover */}
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
    </section>
  );
};

export default CommunityGallery;
