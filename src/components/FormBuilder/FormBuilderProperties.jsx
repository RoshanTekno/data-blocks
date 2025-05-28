import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import { motion } from 'framer-motion';
import BasicSettings from '../PropertyPanels/BasicSettings';
import ValidationSettings from '../PropertyPanels/ValidationSettings';
import DisplaySettings from '../PropertyPanels/DisplaySettings';
import ApiSettings from '../PropertyPanels/ApiSettings';
import ConditionalSettings from '../PropertyPanels/ConditionalSettings';

// Tab list for property panel sections
const PROPERTY_TABS = [
  { id: 'basic', label: 'Basic', icon: 'settings' },
  { id: 'validation', label: 'Validation', icon: 'shield' },
  { id: 'display', label: 'Display', icon: 'eye' },
  { id: 'api', label: 'API', icon: 'code' },
  { id: 'conditional', label: 'Conditional', icon: 'filter' },
];

// Icons for the tabs
const TabIcon = ({ type }) => {
  const icons = {
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2H2v10h10V2zM22 2h-10v10h10V2zM12 12H2v10h10V12zM22 12h-10v10h10V12z"></path>
      </svg>
    ),
    shield: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    eye: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    code: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    filter: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    ),
  };

  return icons[type] || null;
};

const FormBuilderProperties = () => {
  const { selectedComponent, setSelectedComponent, removeComponent } = useForm();
  const [activeTab, setActiveTab] = useState('basic');

  // If no component is selected, show empty state
  if (!selectedComponent) {
    return (
      <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto overflow-x-hidden h-full hidden md:block">
        <div className="p-6 h-full flex items-center justify-center text-center">
          <div className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l-4-4m4 4l4-4" />
            </svg>
            <p className="text-sm">
              Select a component from the canvas to configure its properties.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto overflow-x-hidden h-full hidden md:block">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <span className="mr-2">{selectedComponent.label || 'Component Properties'}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-normal">
              {selectedComponent.type}
            </span>
          </h3>
          <button 
            onClick={() => removeComponent(selectedComponent.id)}
            className="text-gray-400 hover:text-error focus:outline-none transition-colors"
            title="Remove component"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
          {PROPERTY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center p-2 text-xs font-medium rounded-md flex-1 ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              } transition-colors focus:outline-none`}
            >
              <span className="mr-1.5">
                <TabIcon type={tab.icon} />
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'basic' && <BasicSettings component={selectedComponent} />}
          {activeTab === 'validation' && <ValidationSettings component={selectedComponent} />}
          {activeTab === 'display' && <DisplaySettings component={selectedComponent} />}
          {activeTab === 'api' && <ApiSettings component={selectedComponent} />}
          {activeTab === 'conditional' && <ConditionalSettings component={selectedComponent} />}
        </motion.div>
      </div>
    </div>
  );
};

export default FormBuilderProperties;