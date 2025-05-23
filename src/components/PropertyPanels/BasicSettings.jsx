import React from 'react';
import { useForm } from '../../context/FormContext';

const BasicSettings = ({ component }) => {
  const { updateComponent } = useForm();
  
  const handleChange = (field, value) => {
    updateComponent(component.id, { [field]: value });
  };
  
  const handleKeyChange = (e) => {
    const value = e.target.value
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9_]/g, ''); // Remove special characters except underscores    
    handleChange('key', value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">
          Label
        </label>
        <input
          type="text"
          id="label"
          value={component.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
        />
      </div>

      <div>
        <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
          Property Name (API Key)
        </label>
        <input
          type="text"
          id="key"
          value={component.key || ''}
          onChange={handleKeyChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm font-mono"
        />
        <p className="text-xs text-gray-500 mt-1">
          The name of this field in the API endpoint.
        </p>
      </div>

      {(component.type === 'textfield' || component.type === 'textarea' || 
        component.type === 'email' || component.type === 'phoneNumber' || 
        component.type === 'number') && (
        <div>
          <label htmlFor="placeholder" className="block text-sm font-medium text-gray-700 mb-1">
            Placeholder
          </label>
          <input
            type="text"
            id="placeholder"
            value={component.placeholder || ''}
            onChange={(e) => handleChange('placeholder', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          />
        </div>
      )}

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={component.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          rows="2"
        ></textarea>
      </div>

      {component.type === 'textarea' && (
        <div>
          <label htmlFor="rows" className="block text-sm font-medium text-gray-700 mb-1">
            Rows
          </label>
          <input
            type="number"
            id="rows"
            value={component.rows || 3}
            onChange={(e) => handleChange('rows', parseInt(e.target.value))}
            min="1"
            max="20"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          />
        </div>
      )}

      {component.type === 'content' && (
        <div>
          <label htmlFor="html" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="html"
            value={component.html || ''}
            onChange={(e) => handleChange('html', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm font-mono"
            rows="4"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Enter HTML content. Be careful with script tags.
          </p>
        </div>
      )}

      {component.type === 'panel' && (
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Panel Title
          </label>
          <input
            type="text"
            id="title"
            value={component.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          />
        </div>
      )}

      {(component.type === 'selectboxes' || component.type === 'radio') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          
          <div className="space-y-2">
            {(component.values || []).map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option.label || ''}
                  onChange={(e) => {
                    const newValues = [...(component.values || [])];
                    newValues[index] = { ...newValues[index], label: e.target.value };
                    handleChange('values', newValues);
                  }}
                  placeholder="Label"
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="text"
                  value={option.value || ''}
                  onChange={(e) => {
                    const newValues = [...(component.values || [])];
                    newValues[index] = { ...newValues[index], value: e.target.value };
                    handleChange('values', newValues);
                  }}
                  placeholder="Value"
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newValues = [...(component.values || [])];
                    newValues.splice(index, 1);
                    handleChange('values', newValues);
                  }}
                  className="p-2 text-gray-400 hover:text-error focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={() => {
              const newValues = [...(component.values || [])];
              newValues.push({ label: '', value: '' });
              handleChange('values', newValues);
            }}
            className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md focus:outline-none"
          >
            Add Option
          </button>
        </div>
      )}

      {component.type === 'select' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          
          <div className="space-y-2">
            {(component.data?.values || []).map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option.label || ''}
                  onChange={(e) => {
                    const newData = {
                      ...component.data,
                      values: [...(component.data?.values || [])],
                    };
                    newData.values[index] = { ...newData.values[index], label: e.target.value };
                    handleChange('data', newData);
                  }}
                  placeholder="Label"
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="text"
                  value={option.value || ''}
                  onChange={(e) => {
                    const newData = {
                      ...component.data,
                      values: [...(component.data?.values || [])],
                    };
                    newData.values[index] = { ...newData.values[index], value: e.target.value };
                    handleChange('data', newData);
                  }}
                  placeholder="Value"
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newData = {
                      ...component.data,
                      values: [...(component.data?.values || [])],
                    };
                    newData.values.splice(index, 1);
                    handleChange('data', newData);
                  }}
                  className="p-2 text-gray-400 hover:text-error focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={() => {
              const newData = {
                ...component.data,
                values: [...(component.data?.values || [])],
              };
              newData.values.push({ label: '', value: '' });
              handleChange('data', newData);
            }}
            className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md focus:outline-none"
          >
            Add Option
          </button>
          
          <div className="mt-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={component.multiple || false}
                onChange={(e) => handleChange('multiple', e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Allow Multiple</span>
            </label>
          </div>
        </div>
      )}

      {(component.type === 'select' || component.type === 'selectboxes' || component.type === 'radio') && (
        <div className="mt-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={component.inline || false}
              onChange={(e) => handleChange('inline', e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Inline Layout</span>
          </label>
        </div>
      )}

      <div className="mt-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={component.required || false}
            onChange={(e) => handleChange('required', e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Required</span>
        </label>
      </div>

      {component.type === 'tabs' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tabs
          </label>
          <div className="space-y-2">
            {(component.tabs || []).map((tab, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tab.label || ''}
                  onChange={e => {
                    const newTabs = [...(component.tabs || [])];
                    newTabs[idx] = { ...newTabs[idx], label: e.target.value };
                    handleChange('tabs', newTabs);
                  }}
                  placeholder={`Tab ${idx + 1} Label`}
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newTabs = [...(component.tabs || [])];
                    newTabs.splice(idx, 1);
                    handleChange('tabs', newTabs);
                  }}
                  className="p-2 text-gray-400 hover:text-error focus:outline-none"
                  title="Remove Tab"
                  disabled={(component.tabs || []).length <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const newTabs = [...(component.tabs || [])];
              newTabs.push({ label: `Tab ${newTabs.length + 1}`, components: [] });
              handleChange('tabs', newTabs);
            }}
            className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md focus:outline-none"
          >
            Add Tab
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Edit tab labels and add/remove tabs. Fields for each tab can be managed in the form canvas.
          </p>
        </div>
      )}
    </div>
  );
};

export default BasicSettings;