import React, { useEffect, useState } from 'react';
import { useForm } from '../context/FormContext';

const Home = () => {
  const { listForms, loadForm, deleteForm, newForm } = useForm();
  const [forms, setForms] = useState([]);

  const refresh = () => {
    setForms(listForms());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleEdit = (id) => {
    loadForm(id);
    window.location.hash = 'builder';
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this form?')) {
      deleteForm(id);
      refresh();
    }
  };

  const handleNew = () => {
    newForm();
    window.location.hash = 'builder';
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Saved Forms</h1>
      {forms.length === 0 ? (
        <p className="text-gray-500">No forms saved.</p>
      ) : (
        <ul className="space-y-2">
          {forms.map((form) => (
            <li key={form.id} className="border p-3 rounded flex justify-between items-center">
              <span>{form.title}</span>
              <div className="space-x-2">
                <button className="text-primary text-sm" onClick={() => handleEdit(form.id)}>Edit</button>
                <button className="text-error text-sm" onClick={() => handleDelete(form.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleNew} className="px-4 py-2 bg-primary text-white rounded">
        New Form
      </button>
    </div>
  );
};

export default Home;
