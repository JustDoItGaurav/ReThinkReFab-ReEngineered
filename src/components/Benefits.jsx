// src/components/Benefits.jsx
import { motion } from 'framer-motion';
import { FaLeaf, FaDollarSign, FaLightbulb } from 'react-icons/fa';

const benefits = [
  { icon: <FaLeaf size={40} />, title: "Eco-Friendly", text: "Reduce waste and your carbon footprint by giving items a second life." },
  { icon: <FaDollarSign size={40} />, title: "Cost Saving", text: "Save money by creating what you need from things you already own." },
  { icon: <FaLightbulb size={40} />, title: "Creative Fulfillment", text: "Spark your imagination and develop new skills with hands-on projects." }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Why ReFab?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-green-500 dark:text-green-400 mb-4 inline-block">{benefit.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;