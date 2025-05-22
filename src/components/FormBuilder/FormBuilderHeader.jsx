import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import { toast } from 'react-toastify';
import ComponentPreview from '../FormComponents/ComponentPreview';


const FormBuilderHeader = () => {
  const { 
    formState, 
    updateFormMetadata, 
    exportFormSchema, 
    importFormSchema,
    undo,
    redo,
    canUndo,
    canRedo
  } = useForm();
  
  const [title, setTitle] = useState(formState.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showJson, setShowJson] = useState(false); // <-- Add this line

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Save title when blur or Enter is pressed
  const handleTitleSave = () => {
    updateFormMetadata({ title });
    setIsEditingTitle(false);
  };

  // Handle key press in title input
  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTitle(formState.title); // Reset to original
      setIsEditingTitle(false);
    }
  };

  // Handle export button click
  const handleExport = () => {
    const jsonData = exportFormSchema();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formState.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Form exported successfully');
  };

  // Handle import button click
  const toggleImportModal = () => {
    setIsImportModalOpen(!isImportModalOpen);
    if (!isImportModalOpen) {
      setImportText('');
    }
  };

  // Handle import submit
  const handleImport = () => {
    if (importText.trim() === '') {
      toast.error('Please enter JSON data to import');
      return;
    }
    
    const success = importFormSchema(importText);
    if (success) {
      setIsImportModalOpen(false);
      setImportText('');
    }
  };

  // Handle preview button click
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="text-primary text-xl font-semibold mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h1 className="text-lg font-medium text-gray-800">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
                className="border border-primary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-light"
                autoFocus
              />
            ) : (
              <span 
                onClick={() => setIsEditingTitle(true)}
                className="cursor-pointer hover:text-primary transition-colors"
              >
                {formState.title}
              </span>
            )}
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={undo} 
          disabled={!canUndo}
          className={`p-2 rounded ${canUndo ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
          title="Undo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6"></path>
            <path d="M21 17a9 9 0 0 0-9-9H3"></path>
          </svg>
        </button>
        
        <button 
          onClick={redo} 
          disabled={!canRedo}
          className={`p-2 rounded ${canRedo ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
          title="Redo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7v6h-6"></path>
            <path d="M3 17a9 9 0 0 1 9-9h9"></path>
          </svg>
        </button>
        
        <div className="h-6 border-l border-gray-300 mx-1"></div>
        
        <button 
          onClick={handlePreview}
          className="p-2 rounded hover:bg-gray-100 text-gray-700"
          title="Preview Form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
        
        <button 
          onClick={toggleImportModal}
          className="p-2 rounded hover:bg-gray-100 text-gray-700"
          title="Import Form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </button>
        
        <button 
          onClick={handleExport}
          className="p-2 rounded hover:bg-gray-100 text-gray-700"
          title="Export Form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>
        
        <button 
          className="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
        >
          Save Form
        </button>
      </div>
      
      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Import Form</h2>
            <p className="text-gray-600 mb-4">Paste your JSON form schema below:</p>
            
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full h-40 p-2 border border-gray-300 rounded-md mb-4 font-mono text-sm"
              placeholder='{"title": "My Form", "components": [...], ...}'
            ></textarea>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={toggleImportModal}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleImport}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fade-in relative">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-error"
              title="Close Preview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Form Preview</h2>
              <button
                onClick={() => setShowJson((v) => !v)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                {showJson ? 'Show Form' : 'Show JSON'}
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {showJson ? (
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
                  {JSON.stringify(formState.components, null, 2)}
                </pre>
              ) : (
                formState.components.map((component, idx) => (
                  <div key={component.id} className="mb-4">
                    <ComponentPreview component={component} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default FormBuilderHeader;