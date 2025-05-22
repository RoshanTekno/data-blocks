import React from 'react';
import { DndContext } from '@dnd-kit/core';
import FormBuilder from './components/FormBuilder/FormBuilder';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <FormProvider>
      <div className="app-container h-screen flex flex-col">
        <FormBuilder />
      </div>
    </FormProvider>
  );
}

export default App;