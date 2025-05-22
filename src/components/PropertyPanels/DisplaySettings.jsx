import React from 'react';
import { useForm } from '../../context/FormContext';

const DisplaySettings = ({ component }) => {
  const { updateComponent } = useForm();
  
  // Initialize display object if it doesn't exist
  const display = component.display || {};
  
  const handleDisplayChange = (field, value) => {
    const newDisplay = { ...display, [field]: value };
    updateComponent(component.id, { display: newDisplay });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="labelPosition" className="block text-sm font-medium text-gray-700 mb-1">
          Label Position
        </label>
        <select
          id="labelPosition"
          value={display.labelPosition || 'top'}
          onChange={(e) => handleDisplayChange('labelPosition', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
        >
          <option value="top">Top</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="bottom">Bottom</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      <div>
        <label htmlFor="labelWidth" className="block text-sm font-medium text-gray-700 mb-1">
          Label Width
        </label>
        <div className="flex items-center">
          <input
            type="number"
            id="labelWidth"
            value={display.labelWidth || 30}
            onChange={(e) => handleDisplayChange('labelWidth', parseInt(e.target.value))}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary text-sm"
          />
          <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-600">
            %
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Only applicable when label position is left or right.
        </p>
      </div>

      <div>
        <label htmlFor="labelMargin" className="block text-sm font-medium text-gray-700 mb-1">
          Label Margin
        </label>
        <div className="flex items-center">
          <input
            type="number"
            id="labelMargin"
            value={display.labelMargin || 3}
            onChange={(e) => handleDisplayChange('labelMargin', parseInt(e.target.value))}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary text-sm"
          />
          <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-600">
            px
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="tooltip" className="block text-sm font-medium text-gray-700 mb-1">
          Tooltip Text
        </label>
        <input
          type="text"
          id="tooltip"
          value={display.tooltip || ''}
          onChange={(e) => handleDisplayChange('tooltip', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          The tooltip text to display when hovering over the component.
        </p>
      </div>

      <div>
        <label htmlFor="customClass" className="block text-sm font-medium text-gray-700 mb-1">
          CSS Class
        </label>
        <input
          type="text"
          id="customClass"
          value={display.className || ''}
          onChange={(e) => handleDisplayChange('className', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          placeholder="e.g. my-custom-class"
        />
        <p className="text-xs text-gray-500 mt-1">
          Custom CSS class names to add to this component.
        </p>
      </div>
      
      {component.type === 'panel' && (
        <>
          <div className="pt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={component.collapsible || false}
                onChange={(e) => updateComponent(component.id, { collapsible: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Collapsible</span>
            </label>
          </div>
          
          {component.collapsible && (
            <div className="pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={component.collapsed || false}
                  onChange={(e) => updateComponent(component.id, { collapsed: e.target.checked })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Initially Collapsed</span>
              </label>
            </div>
          )}
        </>
      )}
      
      {component.type === 'button' && (
        <>
          <div>
            <label htmlFor="buttonTheme" className="block text-sm font-medium text-gray-700 mb-1">
              Button Theme
            </label>
            <select
              id="buttonTheme"
              value={component.theme || 'primary'}
              onChange={(e) => updateComponent(component.id, { theme: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="buttonSize" className="block text-sm font-medium text-gray-700 mb-1">
              Button Size
            </label>
            <select
              id="buttonSize"
              value={component.size || 'md'}
              onChange={(e) => updateComponent(component.id, { size: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
          
          <div className="pt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={component.block || false}
                onChange={(e) => updateComponent(component.id, { block: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Block Button (Full Width)</span>
            </label>
          </div>
          
          <div className="pt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={component.disableOnInvalid || false}
                onChange={(e) => updateComponent(component.id, { disableOnInvalid: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Disable when form is invalid</span>
            </label>
          </div>
        </>
      )}
      
      {component.type === 'columns' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Column Widths
          </label>
          
          <div className="space-y-2">
            {(component.columns || []).map((column, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 w-24">Column {index + 1}</span>
                <div className="flex items-center flex-1">
                  <input
                    type="number"
                    value={column.width || 6}
                    onChange={(e) => {
                      const newColumns = [...(component.columns || [])];
                      newColumns[index] = { ...newColumns[index], width: parseInt(e.target.value) };
                      updateComponent(component.id, { columns: newColumns });
                    }}
                    min="1"
                    max="12"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                  <span className="ml-2 text-sm text-gray-500">/12</span>
                </div>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={() => {
              const newColumns = [...(component.columns || [])];
              newColumns.push({ components: [], width: 6 });
              updateComponent(component.id, { columns: newColumns });
            }}
            className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md focus:outline-none"
          >
            Add Column
          </button>
          
          {component.columns && component.columns.length > 1 && (
            <button
              type="button"
              onClick={() => {
                const newColumns = [...(component.columns || [])];
                newColumns.pop();
                updateComponent(component.id, { columns: newColumns });
              }}
              className="mt-2 ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md focus:outline-none"
            >
              Remove Column
            </button>
          )}
        </div>
      )}

      <div className="pt-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={display.hidden || false}
            onChange={(e) => handleDisplayChange('hidden', e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Hidden</span>
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          Hide this component from the form.
        </p>
      </div>
    </div>
  );
};

export default DisplaySettings;