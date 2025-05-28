import React, { useEffect, useState } from 'react';
import FormBuilder from './components/FormBuilder/FormBuilder';
import Home from './pages/Home';
import { FormProvider } from './context/FormContext';

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || 'home');

  useEffect(() => {
    const handler = () => setRoute(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <FormProvider>
      <div className="app-container h-screen flex flex-col">
        {route === 'builder' ? <FormBuilder /> : <Home />}
      </div>
    </FormProvider>
  );
}

export default App;