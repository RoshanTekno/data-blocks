import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ComponentPreview = ({ component, isSelected = false }) => {
  // Add state for active tab (for tabs component)
  const [activeTab, setActiveTab] = useState(0);

  // Renders the appropriate input preview based on component type
  const renderComponentPreview = () => {
    switch (component.type) {
      case 'textfield':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <input
              type={component.inputType || 'text'}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder={component.placeholder}
              disabled
            />
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'textarea':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              rows={component.rows || 3}
              placeholder={component.placeholder}
              disabled
            ></textarea>
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'number':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder={component.placeholder}
              disabled
            />
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                disabled
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">{component.label}</label>
              {component.description && (
                <p className="text-gray-500">{component.description}</p>
              )}
            </div>
          </div>
        );
      
      case 'selectboxes':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <div className={`space-y-2 ${component.inline ? 'flex flex-wrap gap-4' : ''}`}>
              {component.values?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled
                  />
                  <label className="ml-2 block text-sm text-gray-700">{option.label}</label>
                </div>
              ))}
            </div>
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'select':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              disabled
            >
              <option value="">{component.placeholder || 'Select...'}</option>
              {component.data?.values?.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'radio':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <div className={`space-y-2 ${component.inline ? 'flex flex-wrap gap-4' : ''}`}>
              {component.values?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    disabled
                  />
                  <label className="ml-2 block text-sm text-gray-700">{option.label}</label>
                </div>
              ))}
            </div>
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'email':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder={component.placeholder}
              disabled
            />
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'phoneNumber':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder={component.placeholder}
              disabled
            />
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'datetime':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              disabled
            />
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'address':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={component.components?.address1?.placeholder || 'Address Line 1'}
                disabled
              />
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={component.components?.address2?.placeholder || 'Address Line 2'}
                disabled
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={component.components?.city?.placeholder || 'City'}
                  disabled
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={component.components?.state?.placeholder || 'State'}
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={component.components?.zip?.placeholder || 'Zip Code'}
                  disabled
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={component.components?.country?.placeholder || 'Country'}
                  disabled
                />
              </div>
            </div>
            {component.description && (
              <div className="text-xs text-gray-500 mt-1">{component.description}</div>
            )}
          </div>
        );
      
      case 'content':
        return (
          <div className="p-2 border border-transparent">
            <div dangerouslySetInnerHTML={{ __html: component.html || '<p>Content goes here</p>' }}></div>
          </div>
        );
      
      case 'button':
        return (
          <div className="py-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-md font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
              disabled
            >
              {component.label}
            </button>
          </div>
        );
      
      case 'panel':
        return (
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-50 p-3 border-b border-gray-300">
              <h3 className="text-sm font-medium">{component.title || 'Panel'}</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">Panel content goes here</p>
            </div>
          </div>
        );
      
      case 'columns':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <div className="flex flex-wrap -mx-2">
              {component.columns?.map((column, index) => (
                <div key={index} className={`px-2 w-1/${component.columns.length}`}>
                  <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 flex items-center justify-center">
                    <span className="text-sm text-gray-500">Column {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'tabs':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label || 'Tabs'}</label>
            <div className="border border-gray-200 rounded-md">
              <div className="flex border-b border-gray-200 bg-gray-50">
                {(component.tabs || []).map((tab, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`px-4 py-2 text-sm font-medium border-r last:border-r-0 focus:outline-none ${
                      idx === activeTab
                        ? 'text-primary border-b-2 border-primary bg-white'
                        : 'text-gray-700'
                    }`}
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab.label || `Tab ${idx + 1}`}
                  </button>
                ))}
              </div>
              <div className="p-4">
                {component.tabs && component.tabs.length > 0 && component.tabs[activeTab] ? (
                  (component.tabs[activeTab].components || []).length > 0 ? (
                    <div className="space-y-2">
                      {(component.tabs[activeTab].components || []).map((child, i) => (
                        <div key={i} className="border border-gray-100 rounded p-2 bg-gray-50">
                          <span className="text-xs text-gray-700">{child.label || child.type}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No fields in this tab</p>
                  )
                ) : (
                  <p className="text-sm text-gray-400">No tabs configured</p>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{component.label}</label>
            <div className="w-full p-2 border border-gray-300 rounded-md">
              Unknown component type: {component.type}
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      className={`p-4 rounded-md ${isSelected ? 'bg-blue-50' : 'bg-white'}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
    >
      {renderComponentPreview()}
    </motion.div>
  );
};

export default ComponentPreview;