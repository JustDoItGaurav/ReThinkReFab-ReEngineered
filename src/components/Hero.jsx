// src/components/Hero.jsx
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white">
      {/* Background Image/Video */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://images.unsplash.com/photo-1593113646773-463c68a9a84c?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4"
        >
          <span className="text-green-400">ReThink.</span> ReFab. <span className="text-green-400">Reimagine.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-8"
        >
          Unleash your creativity and build a sustainable future. Discover innovative DIY projects by repurposing everyday household items.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a href="#projects" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Creating
          </a>
          <a href="#" className="border-2 border-slate-300 hover:bg-white/20 text-slate-200 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Browse Ideas
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;