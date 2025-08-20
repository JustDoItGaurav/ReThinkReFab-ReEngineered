// src/components/ProjectCard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton'; // 1. Import the new component

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group h-full flex flex-col"
      layout
    >
      <Link to={`/project/${project.id}`} className="flex flex-col flex-grow">
        <div className="relative w-full aspect-video bg-slate-200 dark:bg-slate-700">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-3">{project.description}</p>
        </div>
      </Link>
      
      {/* 2. Add the LikeButton at the bottom of the card */}
      <div className="px-6 pb-4 flex justify-between items-center">
        <span className="text-xs text-slate-400">By {project.authorEmail.split('@')[0]}</span>
        <LikeButton project={project} />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
