import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Home from './pages/Home';
import BuilderPage from './pages/BuilderPage';

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/builder/:id" element={<BuilderPage />} />
      </Routes>
    </FormProvider>
  );
}

export default App;