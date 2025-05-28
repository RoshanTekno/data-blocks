import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../context/FormContext';
import FormBuilder from '../components/FormBuilder/FormBuilder';

const BuilderPage = () => {
  const { id } = useParams();
  const { loadFormFromStorage, initializeNewForm } = useForm();

  useEffect(() => {
    if (id) {
      loadFormFromStorage(id);
    } else {
      initializeNewForm();
    }
  }, [id, loadFormFromStorage, initializeNewForm]);

  return <FormBuilder />;
};

export default BuilderPage;
