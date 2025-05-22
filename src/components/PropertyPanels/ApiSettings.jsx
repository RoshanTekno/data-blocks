import React from 'react';
import { useForm } from '../../context/FormContext';

const ApiSettings = ({ component }) => {
  const { updateComponent } = useForm();
  
  // Initialize API settings if they don't exist
  const api = component.api || {};
  
  const handleApiChange = (field, value) => {
    const newApi = { ...api, [field]: value };
    updateComponent(component.id, { api: newApi });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">
          Property Name
        </label>
        <input
          type="text"
          id="property"
          value={component.key || ''}
          onChange={(e) => updateComponent(component.id, { key: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm font-mono"
        />
        <p className="text-xs text-gray-500 mt-1">
          The name of the property in the API payload.
        </p>
      </div>

      {['select', 'radio', 'selectboxes'].includes(component.type) && (
        <div>
          <label htmlFor="dataSrc" className="block text-sm font-medium text-gray-700 mb-1">
            Data Source Type
          </label>
          <select
            id="dataSrc"
            value={component.dataSrc || 'values'}
            onChange={(e) => updateComponent(component.id, { dataSrc: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          >
            <option value="values">Values</option>
            <option value="url">URL</option>
            <option value="resource">Resource</option>
            <option value="custom">Custom</option>
          </select>
          
          {component.dataSrc === 'url' && (
            <div className="mt-3">
              <label htmlFor="dataUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Data URL
              </label>
              <input
                type="text"
                id="dataUrl"
                value={component.data?.url || ''}
                onChange={(e) => {
                  const newData = { ...component.data, url: e.target.value };
                  updateComponent(component.id, { data: newData });
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                placeholder="https://api.example.com/data"
              />
              <p className="text-xs text-gray-500 mt-1">
                A URL that returns a JSON array to use as the data source.
              </p>
            </div>
          )}
          
          {component.dataSrc === 'resource' && (
            <div className="mt-3">
              <label htmlFor="resource" className="block text-sm font-medium text-gray-700 mb-1">
                Resource
              </label>
              <input
                type="text"
                id="resource"
                value={component.data?.resource || ''}
                onChange={(e) => {
                  const newData = { ...component.data, resource: e.target.value };
                  updateComponent(component.id, { data: newData });
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                The resource to load select data from.
              </p>
            </div>
          )}
          
          {component.dataSrc === 'custom' && (
            <div className="mt-3">
              <label htmlFor="custom" className="block text-sm font-medium text-gray-700 mb-1">
                Custom JS
              </label>
              <textarea
                id="custom"
                value={component.data?.custom || ''}
                onChange={(e) => {
                  const newData = { ...component.data, custom: e.target.value };
                  updateComponent(component.id, { data: newData });
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm font-mono"
                rows="4"
                placeholder="// Example: return items.map(item => {&#10;  return {&#10;    label: item.name,&#10;    value: item.id&#10;  };&#10;});"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Write custom JavaScript to return the data source array.
              </p>
            </div>
          )}
        </div>
      )}

      <div>
        <label htmlFor="defaultValue" className="block text-sm font-medium text-gray-700 mb-1">
          Default Value
        </label>
        {['textfield', 'textarea', 'email', 'phoneNumber', 'number', 'select', 'radio', 'datetime'].includes(component.type) ? (
          <input
            type="text"
            id="defaultValue"
            value={component.defaultValue || ''}
            onChange={(e) => updateComponent(component.id, { defaultValue: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          />
        ) : component.type === 'checkbox' ? (
          <div className="mt-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={component.defaultValue || false}
                onChange={(e) => updateComponent(component.id, { defaultValue: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Checked by default</span>
            </label>
          </div>
        ) : component.type === 'selectboxes' ? (
          <div className="mt-1 space-y-2">
            {(component.values || []).map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={component.defaultValue?.[option.value] || false}
                  onChange={(e) => {
                    const newDefaultValue = { ...(component.defaultValue || {}) };
                    newDefaultValue[option.value] = e.target.checked;
                    updateComponent(component.id, { defaultValue: newDefaultValue });
                  }}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 p-2 bg-gray-50 rounded-md">
            Default value not applicable for this component type.
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          The default value for this field when the form is loaded.
        </p>
      </div>

      {(component.type === 'textfield' || component.type === 'textarea' || component.type === 'number') && (
        <div>
          <label htmlFor="calculateValue" className="block text-sm font-medium text-gray-700 mb-1">
            Calculated Value
          </label>
          <textarea
            id="calculateValue"
            value={component.calculateValue || ''}
            onChange={(e) => updateComponent(component.id, { calculateValue: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm font-mono"
            rows="3"
            placeholder="// Example: value = data.field1 + data.field2;&#10;// return calculated value&#10;value = 'calculated';"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Write JavaScript code to calculate the value based on other fields.
          </p>
        </div>
      )}

      <div>
        <label htmlFor="clearOnHide" className="flex items-center">
          <input
            type="checkbox"
            id="clearOnHide"
            checked={component.clearOnHide !== false} // Default to true
            onChange={(e) => updateComponent(component.id, { clearOnHide: e.target.checked })}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Clear Value When Hidden</span>
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          When this component is hidden, clear the value.
        </p>
      </div>

      <div>
        <label htmlFor="persistent" className="flex items-center">
          <input
            type="checkbox"
            id="persistent"
            checked={component.persistent !== false} // Default to true
            onChange={(e) => updateComponent(component.id, { persistent: e.target.checked })}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Save to Database</span>
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          Whether to include this field in the API submission.
        </p>
      </div>

      <div>
        <label htmlFor="protected" className="flex items-center">
          <input
            type="checkbox"
            id="protected"
            checked={component.protected || false}
            onChange={(e) => updateComponent(component.id, { protected: e.target.checked })}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Protected</span>
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          Protect this field from being changed by API updates.
        </p>
      </div>
    </div>
  );
};

export default ApiSettings;