// src/components/CommunityGallery.jsx
import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1586368971813-79199d7fc214?w=500',
  'https://images.unsplash.com/photo-1542497611-33758a691295?w=500',
  'https://images.unsplash.com/photo-1616401784845-180844d18602?w=500',
  'https://images.unsplash.com/photo-1579541591837-21a2375a0f18?w=500',
  'https://images.unsplash.com/photo-1596701127173-207e7a753443?w=500',
  'https://images.unsplash.com/photo-1516944351421-93e1c3a64735?w=500',
];

const CommunityGallery = () => {
  return (
    <section id="gallery" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Community Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((src, index) => (
            <motion.div 
              key={index} 
              className="overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={src} alt={`Community submission ${index + 1}`} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityGallery;