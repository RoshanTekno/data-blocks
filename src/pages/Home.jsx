import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedForms') || '[]');
    setForms(saved);
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Saved Forms</h1>
      {forms.length === 0 ? (
        <p className="text-gray-600">No saved forms.</p>
      ) : (
        <ul className="space-y-2">
          {forms.map(form => (
            <li key={form.id} className="border p-2 rounded flex justify-between items-center">
              <span>{form.title}</span>
              <Link to={`/builder/${form.id}`} className="text-primary underline text-sm">Edit</Link>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <Link to="/builder" className="px-4 py-2 bg-primary text-white rounded-md">Create New Form</Link>
      </div>
    </div>
  );
};

export default Home;
