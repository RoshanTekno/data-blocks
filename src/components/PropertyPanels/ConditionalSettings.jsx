import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';

const ConditionalSettings = ({ component }) => {
  const { updateComponent, formState } = useForm();
  
  // Initialize conditional object if it doesn't exist
  const conditional = component.conditional || {};
  
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [jsonValue, setJsonValue] = useState(
    JSON.stringify(conditional, null, 2)
  );
  const [jsonError, setJsonError] = useState(null);
  
  const handleConditionalChange = (field, value) => {
    const newConditional = { ...conditional, [field]: value };
    updateComponent(component.id, { conditional: newConditional });
  };
  
  const applyJsonChanges = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      updateComponent(component.id, { conditional: parsed });
      setJsonError(null);
      setShowJsonEditor(false);
    } catch (error) {
      setJsonError('Invalid JSON: ' + error.message);
    }
  };
  
  // Get all available form components as options
  const availableComponents = formState.components
    .filter(comp => comp.id !== component.id) // Exclude the current component
    .map(comp => ({
      label: comp.label || comp.key || comp.id,
      value: comp.key
    }));

  return (
    <div className="space-y-4">
      {showJsonEditor ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              JSON Editor
            </label>
            <button
              type="button"
              onClick={() => setShowJsonEditor(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Switch to Form
            </button>
          </div>
          
          <textarea
            value={jsonValue}
            onChange={(e) => setJsonValue(e.target.value)}
            className={`w-full p-2 border ${
              jsonError ? 'border-error' : 'border-gray-300'
            } rounded-md focus:ring-primary focus:border-primary text-sm font-mono`}
            rows="10"
          ></textarea>
          
          {jsonError && (
            <p className="text-xs text-error mt-1">{jsonError}</p>
          )}
          
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={applyJsonChanges}
              className="px-3 py-1 bg-primary text-white rounded-md text-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Conditional Settings
            </label>
            <button
              type="button"
              onClick={() => {
                setJsonValue(JSON.stringify(conditional, null, 2));
                setShowJsonEditor(true);
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              JSON Editor
            </button>
          </div>
          
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={conditional.show !== undefined ? conditional.show : true}
                onChange={(e) => handleConditionalChange('show', e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                {conditional.show !== undefined && !conditional.show ? 'Hide' : 'Show'} when the following is true
              </span>
            </label>
          </div>
          
          <div>
            <label htmlFor="when" className="block text-sm font-medium text-gray-700 mb-1">
              When the component:
            </label>
            <select
              id="when"
              value={conditional.when || ''}
              onChange={(e) => handleConditionalChange('when', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            >
              <option value="">Select a component</option>
              {availableComponents.map((comp) => (
                <option key={comp.value} value={comp.value}>
                  {comp.label}
                </option>
              ))}
            </select>
          </div>
          
          {conditional.when && (
            <>
              <div>
                <label htmlFor="operator" className="block text-sm font-medium text-gray-700 mb-1">
                  Has the operator:
                </label>
                <select
                  id="operator"
                  value={conditional.operator || 'eq'}
                  onChange={(e) => handleConditionalChange('operator', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                >
                  <option value="eq">Equals (=)</option>
                  <option value="neq">Not Equals (!=)</option>
                  <option value="lt">Less Than (&lt;)</option>
                  <option value="lte">Less Than or Equal (&lt;=)</option>
                  <option value="gt">Greater Than (&gt;)</option>
                  <option value="gte">Greater Than or Equal (&gt;=)</option>
                  <option value="contains">Contains</option>
                  <option value="startsWith">Starts With</option>
                  <option value="endsWith">Ends With</option>
                  <option value="regex">Regular Expression</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                  With the value:
                </label>
                <input
                  type="text"
                  id="value"
                  value={conditional.value !== undefined ? conditional.value : ''}
                  onChange={(e) => handleConditionalChange('value', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                />
              </div>
            </>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Advanced Logic
            </label>
            
            <div>
              <label htmlFor="customLogic" className="block text-sm font-medium text-gray-700 mb-1">
                Custom Logic
              </label>
              <textarea
                id="customLogic"
                value={conditional.json || ''}
                onChange={(e) => handleConditionalChange('json', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm font-mono"
                rows="3"
                placeholder='// Example: show = data.fieldA === "yes" && data.fieldB > 10;'
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Write custom JavaScript to determine when to show this component. Use the "show" variable.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConditionalSettings;