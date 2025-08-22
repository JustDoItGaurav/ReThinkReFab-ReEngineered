// src/components/FeaturedProjects.jsx
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'; // 1. Import 'limit'
import { Link } from 'react-router-dom'; // 2. Import Link for the button
import ProjectCard from './ProjectCard';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // 3. Update the query to get only the 3 newest projects
        const projectsQuery = query(
          collection(db, 'projects'), 
          orderBy('createdAt', 'desc'), 
          limit(3)
        );
        
        const projectSnapshot = await getDocs(projectsQuery);
        const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching featured projects: ", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Featured DIY Projects</h2>
        
        {loading ? (
          <p className="text-center text-slate-500">Loading projects...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* 4. Add the "Explore More" button below the grid */}
        <div className="text-center mt-16">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore More Projects <FiArrowRight />
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedProjects;
