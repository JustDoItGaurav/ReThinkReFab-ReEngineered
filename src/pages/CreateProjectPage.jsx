// src/pages/CreateProjectPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import Navbar from '../components/Navbar';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';

// The constants now read securely from your .env file or Vercel environment variables.
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CreateProjectPage = () => {
  // ... the rest of your component code remains exactly the same
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [materials, setMaterials] = useState('');
  const [steps, setSteps] = useState(['']);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };
  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
      const data = await response.json();
      const imageUrl = data.secure_url;

      if (!imageUrl) throw new Error("Image upload failed.");

      const cleanTitle = title.trim().replace(/"/g, '');
      const cleanDescription = description.trim().replace(/"/g, '');
      const cleanCategory = category.trim().replace(/"/g, '');
      const cleanMaterials = materials.split(',').map(item => item.trim().replace(/"/g, '')).filter(Boolean);
      const cleanSteps = steps.map(step => step.trim().replace(/"/g, '')).filter(Boolean);

      await addDoc(collection(db, 'projects'), {
        title: cleanTitle,
        description: cleanDescription,
        category: cleanCategory,
        materials: cleanMaterials,
        steps: cleanSteps,
        imageUrl: imageUrl,
        authorId: auth.currentUser.uid,
        authorEmail: auth.currentUser.email,
        createdAt: serverTimestamp(),
        likes: [],
        likeCount: 0
      });

      setLoading(false);
      navigate('/projects');

    } catch (err) {
      setError("Failed to create project. Please try again.");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 pt-24 pb-12">
        <div className="max-w-2xl w-full bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-6">Create a New Project</h2>
          {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:outline-none" required />
              <textarea placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:outline-none h-32" required />
              <input type="text" placeholder="Category (e.g., Decor, Gardening)" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:outline-none" required />
              <input type="text" placeholder="Materials (comma separated)" value={materials} onChange={(e) => setMaterials(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:outline-none" required />
              
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-2">Project Steps</label>
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <textarea
                      placeholder={`Step ${index + 1}`}
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:outline-none"
                      rows="2"
                      required
                    />
                    {steps.length > 1 && (
                      <button type="button" onClick={() => removeStep(index)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors">
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addStep} className="mt-2 flex items-center gap-2 text-green-500 font-semibold hover:text-green-600">
                  <FiPlusCircle /> Add Step
                </button>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-2">Project Image</label>
                <input type="file" onChange={handleImageChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-400">
              {loading ? 'Submitting...' : 'Submit Project'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProjectPage;
