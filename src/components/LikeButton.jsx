// src/components/LikeButton.jsx
import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { FiArrowUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const LikeButton = ({ project }) => {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(project.likeCount || 0);

  // Check if the current user has already liked this project
  useEffect(() => {
    if (currentUser && project.likes && project.likes.includes(currentUser.uid)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [currentUser, project.likes]);

  const handleLike = async (e) => {
    // Stop the click from navigating to the project page if on a card
    e.preventDefault(); 
    e.stopPropagation();

    if (!currentUser) {
      alert("Please log in to upvote projects!");
      return;
    }

    const projectRef = doc(db, 'projects', project.id);

    if (isLiked) {
      // User is unliking the project
      await updateDoc(projectRef, {
        likes: arrayRemove(currentUser.uid),
        likeCount: likeCount - 1
      });
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      // User is liking the project
      await updateDoc(projectRef, {
        likes: arrayUnion(currentUser.uid),
        likeCount: likeCount + 1
      });
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  return (
    <motion.button
      onClick={handleLike}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold transition-colors border ${
        isLiked
          ? 'bg-green-500 text-white border-green-500'
          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600'
      }`}
    >
      <FiArrowUp className={`transition-transform ${isLiked ? 'scale-125' : ''}`} />
      <span>{likeCount}</span>
    </motion.button>
  );
};

export default LikeButton;
